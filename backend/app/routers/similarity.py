from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.services.clip_services import find_similar_images

router = APIRouter()

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/find-similar")
async def find_similar(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = find_similar_images(file_path, top_k=5)

    return {"similar_images": results}
