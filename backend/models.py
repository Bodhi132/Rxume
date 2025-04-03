import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),  # Auto-generate string UUIDs
        unique=True,
        index=True,
    )
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    img = Column(String, nullable=True)

    # Use string reference for forward declaration
    resumes = relationship("Resume", back_populates="user")


class Resume(Base):
    __tablename__ = "resume"
    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),  # Auto-generate string UUIDs
        unique=True,
        index=True,
    )
    json_data = Column(JSONB)
    user_id = Column(String, ForeignKey("users.id"))

    # Use string reference for forward declaration
    user = relationship("User", back_populates="resumes")