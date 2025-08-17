from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
]

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
