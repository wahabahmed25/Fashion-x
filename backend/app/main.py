from fastapi import FastAPI
from app.routers import stylist, similarity
from app.config import setup_cors
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

setup_cors(app)


app.mount("/dataset", StaticFiles(directory=os.path.join("dataset")), name="dataset")
UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.include_router(stylist.router)
app.include_router(similarity.router)


@app.get("/")
async def root():
    return {"message": "backend is running"}

@app.on_event("startup")
async def on_startup():
    print("Backend is Running...")


if __name__ == "__main__":
    print("backend is running...")
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
