from fastapi import FastAPI, Depends, HTTPException, status , BackgroundTasks , File , UploadFile
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy import inspect
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import User, Base , Resume
from database import engine, get_db
from auth import create_access_token
from fastapi.middleware.cors import CORSMiddleware
from schemas import UserCreate, TextOptimizationRequest
from jose import jwt, JWTError
from dotenv import load_dotenv
from google.auth.transport import requests
from google.oauth2 import id_token
from core.config import settings
import httpx
from fastapi.responses import RedirectResponse
import json
from typing import List
from schemas import ResumeSchema
from scraper import scrape_linkedin_job_description
from parser import extract_text_from_pdf
from fastapi.responses import JSONResponse
import re
import uuid
from openai import OpenAI

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://rxume-7eyw.vercel.app"
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
        "scope": "email openid profile",
    },
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

    access_token = create_access_token(data={"sub": new_user.email})

    response = JSONResponse(content={"msg": "User registered and logged in successfully", "user_id": new_user.id,"access_token":access_token})

    return response


@app.post("/login")
def login(userData: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == userData.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    if not pwd_context.verify(userData.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password"
        )
    access_token = create_access_token(data={"sub": user.email})

    response = JSONResponse(content={"msg": "Login successful", "user_id": user.id,"access_token":access_token})

    return response



@app.get("/auth/login/google")
async def login_via_google(request: Request):
    redirect_uri = "http://localhost:8000/api/auth/callback/google"
    return await oauth.google.authorize_redirect(request, redirect_uri)


@app.get("/api/auth/callback/google")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        if not inspect(engine).has_table("users"):
            Base.metadata.create_all(bind=engine)

        # print(request)
        token = await oauth.google.authorize_access_token(request)
        # print("Token received:", token)
        if "id_token" not in token:
            raise HTTPException(
                status_code=401, detail="ID token missing in token response"
            )
        idinfo = id_token.verify_oauth2_token(
            token["id_token"], requests.Request(), settings.AUTH_GOOGLE_ID
        )
        print("ID info:", idinfo)
        user_data = User(
            id=idinfo["sub"],
            name=idinfo["name"],
            email=idinfo["email"],
            img=idinfo["picture"],
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

        access_token = create_access_token(data={"sub": str(user_data.id)})
        response = RedirectResponse(url="http://localhost:3000/resumeBuilder")
        response.set_cookie(key="access_token", value=access_token, httponly=True)
        response.set_cookie(key="user_id", value=str(user_data.id), httponly=True)
        return response
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# @app.get("/auth/login/github")
# async def github_login(request: Request):
#     return RedirectResponse(
#         f"https://github.com/login/oauth/authorize?client_id={settings.AUTH_GITHUB_CLIENT_ID}&status_code=302"
#     )


# @app.get("/api/auth/callback/github")
# async def github_code(code: str, db: Session = Depends(get_db)):
#     try:
#         if not inspect(engine).has_table("users"):
#             Base.metadata.create_all(bind=engine)

#         params = {
#             "client_id": settings.AUTH_GITHUB_CLIENT_ID,
#             "client_secret": settings.AUTH_GITHUB_CLIENT_SECRET,
#             "code": code,
#         }
#         headers = {"Accept": "application/json"}
#         async with httpx.AsyncClient() as client:
#             response = await client.post(
#                 url="https://github.com/login/oauth/access_token",
#                 params=params,
#                 headers=headers,
#             )
#             response_json = response.json()
#             print(response_json)
#             access_token = response_json["access_token"]
#             headers.update({"Authorization": f"token {access_token}"})

#             # Fetch user profile
#             response = await client.get(
#                 url="https://api.github.com/user", headers=headers
#             )
#             user_profile = response.json()
#             print(user_profile)

#             # Fetch user emails
#             response = await client.get(
#                 url="https://api.github.com/user/emails", headers=headers
#             )
#             emails = response.json()
#             print(emails)

#             primary_email = next(email["email"] for email in emails if email["primary"])

#             user_data = User(
#                 id=str(user_profile["id"]),
#                 name=user_profile["name"],
#                 email=primary_email,
#                 img=user_profile["avatar_url"],
#             )
#             user = db.query(User).filter(User.id == user_data.id).first()
#             if not user:
#                 db.add(user_data)
#                 db.commit()
#                 db.refresh(user_data)
#             else:
#                 user.name = user_data.name
#                 user.email = user_data.email
#                 user.img = user_data.img
#                 db.commit()
#                 db.refresh(user)

#             access_token = create_access_token(data={"sub": user_data.id})
#             response = RedirectResponse(url="http://localhost:3000/resumeBuilder")
#             response.set_cookie(key="access_token", value=access_token, httponly=True)
#             return response
#     except ValueError:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


client = OpenAI(api_key=settings.OPENAI_API_KEY)


@app.post("/work-experience-optimze")
async def text_optimize(request: TextOptimizationRequest):
    optimized_texts = []
    for text in request.texts:
        messages = [
            {
                "role": "system",
                "content": "You are an AI assistant that helps improve resume content. Make the texts professional and crisp.",
            },
            {
                "role": "user",
                "content": (
                    f"These are the work experiences that are in the resume and I want to improve them: \n{text}\n\n"
                ),
            },
            {
                "role": "user",
                "content": ("Reorder the points in a logical and impactful sequence."),
            },
        ]
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo", messages=messages
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
                "content": "You are an AI assistant that helps improve resume content. Make the texts professional and crisp.",
            },
            {
                "role": "user",
                "content": (
                    f"These are the project descriptions that I have created and these are in the resume and I want to improve them: \n{text}\n\n"
                ),
            },
            {
                "role": "user",
                "content": ("Reorder the points in a logical and impactful sequence."),
            },
        ]
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo", messages=messages
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

        optimized_text = response.choices[0].message.content.strip()
        optimized_texts.append(optimized_text)

    return {"optimized_texts": optimized_texts}


# @app.post("/linkedin-job-description")
# async def start_scraping(url: str):
#     try:
#         result = scrape_linkedin_job_description(url) 
#         return {"job_description": result}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
# @app.post("/resume-tailor")
# async def tailor_resume(file:UploadFile = File(...)):
#     pdf = await file.read()
#     try:
#         text = extract_text_from_pdf(pdf)
#         sections = extract_resume_sections(text)
#         return {"text": text}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/resume-tailor")
async def resume_tailor(job_url: str, file: UploadFile = File(...)):
    """Parses resume and tailors it to a job description."""
    
    # Read and extract text from the uploaded resume PDF
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)
    
    # OpenAI prompt to structure resume
    resume_prompt = f"""
    Extract and structure the following resume text into JSON format with these keys:
    - Personal_information (name, email, phone, github_link , linkedin_link , twitter_link, portfolio_link)
    - education
    - experience (company, role, duration, responsibilities, skills)
    - technical_skills (Frotend - (include all the languages , frameworks , libraries) , Backend - (include all the languages , frameworks , libraries), Devops, Databases, tools)
    - projects
    - links
    - achievements

    Personal Information , Education , Experience , Technical Skills , Projects , Links , Achievements should be an array that could be mapped
    
    Resume Text:
    {text}
    
    Output the structured resume in JSON format.
    """
    
    resume_response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": resume_prompt}],
        temperature=0.2
    )

    response_content = resume_response.choices[0].message.content.strip()

    # Try extracting JSON between backticks
    json_data = response_content.strip('`\n')

    if json_data.startswith('json'):
        resume_json = json_data[4:]

    # Parse JSON safely
    try:
        resume_json = json.loads(resume_json)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse OpenAI JSON response: {e}\nResponse: {resume_json}")
    
    print("Parsed Resume",resume_json)
    


    # Scrape the job description
    job_description = scrape_linkedin_job_description(job_url)

    print(job_description)

    # OpenAI prompt to tailor resume
    tailor_prompt = f"""
    Given the following resume JSON and job description, tailor the resume to better fit the job role.
    
    Resume JSON:
    {json.dumps(resume_json, indent=2)}
    
    Job Description:
    {job_description}
    
    Return the tailored resume in the same structured JSON format.
    """
    
    tailor_response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an AI that tailors resumes in JSON format to match job descriptions."},
            {"role": "user", "content": tailor_prompt},
            {"role": "user", "content": "Tailor the resume to better fit the job role."},
            {"role": "user", "content": "Make the project descriptions more relevant to the job, professional,crisp,descriptive and improve all the description points."},
            {"role": "user", "content": "Make the work experience more relevant to the job, professional,crisp,descriptive and improve all the description points."},
        ],
        temperature=0.4
    )

    print("tailored_resume", tailor_response.choices[0].message.content)

    tailored_resume = tailor_response.choices[0].message.content

    tailored_resume = tailored_resume.strip('`\n')

    if tailored_resume.startswith('json'):
        tailored_resume = tailored_resume[4:]
    
    tailored_resume = json.loads(tailored_resume)
    
    return {"tailored_resume": tailored_resume}

@app.post("/upload-resume",response_model=dict)
async def create_pdf_document(
    user_id: str,
    json_data: dict,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    pdf_document = Resume(
        json_data = json_data,
        user_id = user_id
    )

    db.add(pdf_document)
    db.commit()
    db.refresh(pdf_document)

    return {"id": pdf_document.id, "json_data": pdf_document.json_data}

@app.get('/get-all-resumes',response_model=list[ResumeSchema])
async def get_all_resumes(
    user_id: str,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    resumes = db.query(Resume).filter(Resume.user_id == user_id).all()

    return resumes