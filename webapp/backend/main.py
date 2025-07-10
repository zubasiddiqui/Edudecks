
from routers import auth_router  # Import the authentication router
from routers import ppt_router
from services import auth as auth_service
from models.auth import AuthResponse  # Assuming this is correctly defined
from fastapi import FastAPI, Query, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
import sys
from pathlib import Path
# from dotenv import load_dotenv

# Add the parent directory to the Python path
sys.path.append(str(Path(__file__).parent))


# Initialize FastAPI app
app = FastAPI(
    title="EDTECH for Students",
    description="API for EDTECH for Students",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Authentication Dependency ---
token_auth_scheme = HTTPBearer()


# Include the authentication router
app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
# Include the PPT generation router
app.include_router(ppt_router.router, prefix="/ppt", tags=["PPT Generation"])


# Routes


@app.get("/")
async def root():
    return {"status": "ok", "message": "Medical Lab Voice Bot API is running"}
