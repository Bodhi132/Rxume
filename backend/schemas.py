from pydantic import BaseModel, EmailStr
from typing import List,Any

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TextOptimizationRequest(BaseModel):
    texts: List[str]

class ResumeSchema(BaseModel):
    id: str
    json_data: Any  # Use `Any` if `json_data` is a dictionary or nested JSON

    class Config:
        from_attributes = True