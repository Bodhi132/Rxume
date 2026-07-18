import urllib.request
import json
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from core.config import settings

security = HTTPBearer()

def get_jwks():
    with urllib.request.urlopen(settings.CLERK_JWKS_URL) as response:
        return json.loads(response.read().decode())

def verify_clerk_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        unverified_header = jwt.get_unverified_header(token)
        jwks = get_jwks()
        
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break
        
        if rsa_key:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=["RS256"],
                options={"verify_aud": False} # Clerk handles audiences internally or you can specify
            )
            return payload # Returns the decoded token containing 'sub' (User ID)
        else:
            raise HTTPException(status_code=401, detail="Invalid token header")
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication error: {str(e)}")

from sqlalchemy.orm import Session
from fastapi import Depends
from database import get_db
from models import User

def get_current_user(token_payload: dict = Depends(verify_clerk_token), db: Session = Depends(get_db)):
    user_id = token_payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID missing in token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        user = User(id=user_id)
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user