from fastapi import FastAPI

app = FastAPI()

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
