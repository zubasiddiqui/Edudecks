from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
import subprocess
import os
from supabase import create_client, Client

router = APIRouter()


class PPTRequest(BaseModel):
    grade: int
    subject: str
    topic: str
    language: str
    pages: int


SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
BUCKET_NAME = "generated-ppt"
if SUPABASE_URL is None or SUPABASE_KEY is None:
    raise ValueError(
        "SUPABASE_URL and SUPABASE_KEY environment variables must be set.")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


@router.post("/generate-ppt")
async def generate_ppt(request: PPTRequest, background_tasks: BackgroundTasks):
    # Compose the command to run ed.py with the provided arguments
    filename = f"Class{request.grade}_{request.subject}_{request.topic}_presentation.pptx".replace(
        " ", "_")
    script_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), '../../../ppt/ed.py'))
    # You may want to adjust ed.py to accept CLI args or use a temp file for communication
    # For now, we assume it generates the file in the current directory
    try:
        # Run the script (blocking, for now)
        result = subprocess.run([
            'python', script_path
        ], input=f"{request.grade}\n{request.subject}\n{request.topic}\n{request.language}\n{request.pages}\n", text=True, capture_output=True, check=True)
        # Upload the file to Supabase Storage
        pptx_path = os.path.abspath(filename)
        with open(pptx_path, "rb") as f:
            storage_response = supabase.storage.from_(BUCKET_NAME).upload(filename, f, {
                "content-type": "application/vnd.openxmlformats-officedocument.presentationml.presentation"})
        # Get the public URL
        public_url = supabase.storage.from_(
            BUCKET_NAME).get_public_url(filename)
        return {"filename": filename, "public_url": public_url, "stdout": result.stdout}
    except subprocess.CalledProcessError as e:
        raise HTTPException(
            status_code=500, detail=f"PPT generation failed: {e.stderr}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
