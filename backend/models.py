import uuid
from sqlalchemy import Column, String, Integer, LargeBinary, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
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
    pdf_documents = relationship("PDFDocument", back_populates="user")


class PDFDocument(Base):
    __tablename__ = "pdf_documents"
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
    user = relationship("User", back_populates="pdf_documents")
