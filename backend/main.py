from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks, File, UploadFile
from starlette.requests import Request
from sqlalchemy import inspect
from sqlalchemy.orm import Session
from models import User, Base, Resume
from database import engine, get_db
from auth import verify_clerk_token, get_current_user
from fastapi.middleware.cors import CORSMiddleware
from schemas import UserCreate, TextOptimizationRequest
from dotenv import load_dotenv
from core.config import settings
from fastapi.responses import RedirectResponse
import json
from typing import List
from schemas import ResumeSchema
from scraper import scrape_linkedin_job_description
from parser import extract_text_from_pdf
from fastapi.responses import JSONResponse
import re
import uuid
import openai
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
    allow_origins=["*"],  # Allow these origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


client = OpenAI(api_key=settings.OPENAI_API_KEY)

groq_client = None
if settings.GROQ_API_KEY:
    groq_client = OpenAI(
        api_key=settings.GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1"
    )

def call_llm_with_fallback(messages, openai_model, groq_model, temperature=None):
    kwargs = {"model": openai_model, "messages": messages}
    if temperature is not None:
        kwargs["temperature"] = temperature
        
    try:
        return client.chat.completions.create(**kwargs)
    except openai.RateLimitError as e:
        if groq_client and ("quota" in str(e).lower() or "rate" in str(e).lower() or "insufficient" in str(e).lower()):
            print(f"OpenAI limit/quota reached. Falling back to Groq using {groq_model}...")
            kwargs["model"] = groq_model
            return groq_client.chat.completions.create(**kwargs)
        raise e


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
            response = call_llm_with_fallback(
                messages=messages,
                openai_model="gpt-3.5-turbo",
                groq_model="llama-3.1-8b-instant"
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
            response = call_llm_with_fallback(
                messages=messages,
                openai_model="gpt-3.5-turbo",
                groq_model="llama-3.1-8b-instant"
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
    
    try:
        resume_response = call_llm_with_fallback(
            messages=[{"role": "user", "content": resume_prompt}],
            openai_model="gpt-4o",
            groq_model="llama-3.3-70b-versatile",
            temperature=0.2
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Error: {str(e)}")

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
    
    try:
        tailor_response = call_llm_with_fallback(
            messages=[
                {"role": "system", "content": "You are an AI that tailors resumes in JSON format to match job descriptions."},
                {"role": "user", "content": tailor_prompt},
                {"role": "user", "content": "Tailor the resume to better fit the job role."},
                {"role": "user", "content": "Make the project descriptions more relevant to the job, professional,crisp,descriptive and improve all the description points."},
                {"role": "user", "content": "Make the work experience more relevant to the job, professional,crisp,descriptive and improve all the description points."},
            ],
            openai_model="gpt-4o",
            groq_model="llama-3.3-70b-versatile",
            temperature=0.4
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Error: {str(e)}")

    print("tailored_resume", tailor_response.choices[0].message.content)

    tailored_resume = tailor_response.choices[0].message.content

    tailored_resume = tailored_resume.strip('`\n')

    if tailored_resume.startswith('json'):
        tailored_resume = tailored_resume[4:]
    
    tailored_resume = json.loads(tailored_resume)
    
    return {"tailored_resume": tailored_resume}

@app.post("/upload-resume", response_model=dict)
async def create_pdf_document(
    json_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    print("parsing resume")
    pdf_document = Resume(
        json_data = json_data,
        user_id = current_user.id
    )

    db.add(pdf_document)
    db.commit()
    db.refresh(pdf_document)

    return {"id": pdf_document.id, "json_data": pdf_document.json_data}

@app.get("/get-all-resumes", response_model=list[ResumeSchema])
async def get_all_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resumes = db.query(Resume).filter(Resume.user_id == current_user.id).all()
    return resumes