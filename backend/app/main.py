from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import stylist
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(stylist.router)

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
