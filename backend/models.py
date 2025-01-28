from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String , nullable=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    img = Column(String,nullable=True)
