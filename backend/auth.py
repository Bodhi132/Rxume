from datetime import datetime, timedelta
from jose import JWTError, jwt
from core.config import settings

def create_access_token(data:dict,expires_delta:timedelta=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else :
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode,settings.SECRET_KEY,algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token:str):
    try:
        payload = jwt.decode(token,settings.SECRET_KEY,algorithms=[settings.ALGORITHM])
        return payload if payload else None
    except JWTError:
        return None