from fastapi import FastAPI , Depends , HTTPException , status
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy import inspect
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import User , Base
from database import engine , get_db
from auth import create_access_token
from fastapi.middleware.cors import CORSMiddleware
from schemas import UserCreate, TextOptimizationRequest
from jose import jwt ,JWTError
from dotenv import load_dotenv
from google.auth.transport import requests
from google.oauth2 import id_token
from core.config import settings
import httpx
from fastapi.responses import RedirectResponse
from openai import OpenAI

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.AUTH_GOOGLE_ID,
    client_secret=settings.AUTH_GOOGLE_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        'scope': 'email openid profile',
    }
)

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Ensure the users table exists
    if not inspect(engine).has_table("users"):
        Base.metadata.create_all(bind=engine)

    # Check if the user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password and create a new user
    hashed_password = pwd_context.hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    
    # Add the new user to the database
    db.add(new_user)
    db.commit()
    
    # Refresh the instance to get the updated state from the database
    db.refresh(new_user)
    
    return {"msg": "User registered successfully", "user_id": new_user.id}


@app.post("/token")
def login(userData:UserCreate, db:Session=Depends(get_db)):
    user = db.query(User).filter(User.email==userData.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    if not pwd_context.verify(userData.password,user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Incorrect password")
    access_token = create_access_token(data={"sub":user.email})
    return {"access_token":access_token,"token_type":"bearer"}

@app.get('/auth/login/google')
async def login_via_google(request: Request):
    redirect_uri = 'http://localhost:8000/api/auth/callback/google'
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/api/auth/callback/google')
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        if not inspect(engine).has_table("users"):
            Base.metadata.create_all(bind=engine)
        
        # print(request)
        token = await oauth.google.authorize_access_token(request)
        # print("Token received:", token)
        if 'id_token' not in token:
            raise HTTPException(status_code=401, detail="ID token missing in token response")
        idinfo = id_token.verify_oauth2_token(token['id_token'], requests.Request(), settings.AUTH_GOOGLE_ID)
        print("ID info:", idinfo)
        user_data = User(
            id=idinfo["sub"],
            name=idinfo["name"],
            email=idinfo["email"],
            img=idinfo["picture"]
        )
        user = db.query(User).filter(User.id == user_data.id).first()
        if not user:
            db.add(user_data)
            db.commit()
            db.refresh(user_data)
        else:
            user.name = user_data.name
            user.email = user_data.email
            user.img = user_data.img
            db.commit()
            db.refresh(user)
        
        access_token = create_access_token(data={"sub": user_data.id})
        response = RedirectResponse(url="http://localhost:3000/resumeBuilder")
        response.set_cookie(key="access_token", value=access_token, httponly=True)
        return response
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get('/auth/login/github')
async def github_login(request: Request):
    return RedirectResponse(f'https://github.com/login/oauth/authorize?client_id={settings.AUTH_GITHUB_CLIENT_ID}&status_code=302')

@app.get('/api/auth/callback/github')
async def github_code(code: str, db: Session = Depends(get_db)):
    try:
        if not inspect(engine).has_table("users"):
            Base.metadata.create_all(bind=engine)

        params = {
            'client_id': settings.AUTH_GITHUB_CLIENT_ID,
            'client_secret': settings.AUTH_GITHUB_CLIENT_SECRET,
            'code': code,
        }
        headers = {'Accept': 'application/json'}
        async with httpx.AsyncClient() as client:
            response = await client.post(url="https://github.com/login/oauth/access_token", params=params, headers=headers)
            response_json = response.json()
            print(response_json)
            access_token = response_json['access_token']
            headers.update({'Authorization': f'token {access_token}'})
            
            # Fetch user profile
            response = await client.get(url="https://api.github.com/user", headers=headers)
            user_profile = response.json()
            print(user_profile)
            
            # Fetch user emails
            response = await client.get(url="https://api.github.com/user/emails", headers=headers)
            emails = response.json()
            print(emails)


            primary_email = next(email['email'] for email in emails if email['primary'])
            
            user_data = User(
                id=str(user_profile["id"]),
                name=user_profile["name"],
                email=primary_email,
                img=user_profile["avatar_url"]
            )
            user = db.query(User).filter(User.id == user_data.id).first()
            if not user:
                db.add(user_data)
                db.commit()
                db.refresh(user_data)
            else:
                user.name = user_data.name
                user.email = user_data.email
                user.img = user_data.img
                db.commit()
                db.refresh(user)

            access_token = create_access_token(data={"sub": user_data.id})
            response = RedirectResponse(url="http://localhost:3000/resumeBuilder")
            response.set_cookie(key="access_token", value=access_token, httponly=True)
            return response
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

client = OpenAI(
    api_key = settings.OPENAI_API_KEY
)

@app.post("/work-experience-optimze")
async def text_optimize(request: TextOptimizationRequest):
    optimized_texts = []
    for text in request.texts:
        messages = [
            {
                "role": "system",
                "content": "You are an AI assistant that helps improve resume content. Make the texts professional and crisp."
            },
            {
                "role": "user",
                "content": (
                    f"These are the work experiences that are in the resume and I want to improve them: \n{text}\n\n"
                )
            },
            {
                "role": "user",
                "content": (
                    "Reorder the points in a logical and impactful sequence."
                )
            }
        ]
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
        optimized_text = response.choices[0].message.content.strip()
        optimized_texts.append(optimized_text)

    return {"optimized_texts": optimized_texts}


@app.post("/project-desc-optimze")
async def text_optimize(request: TextOptimizationRequest):
    optimized_texts = []
    for text in request.texts:
        messages = [
            {
                "role": "system",
                "content": "You are an AI assistant that helps improve resume content. Make the texts professional and crisp."
            },
            {
                "role": "user",
                "content": (
                    f"These are the project descriptions that I have created and these are in the resume and I want to improve them: \n{text}\n\n"
                )
            },
            {
                "role": "user",
                "content": (
                    "Reorder the points in a logical and impactful sequence."
                )
            },
        ]
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
        optimized_text = response.choices[0].message.content.strip()
        optimized_texts.append(optimized_text)

    return {"optimized_texts": optimized_texts}