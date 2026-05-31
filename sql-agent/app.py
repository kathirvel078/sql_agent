import logging
from fastapi import FastAPI
from api.routes import router
from fastapi.middleware.cors import CORSMiddleware

# Configure logging for the application
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# Initialize FastAPI app
app = FastAPI(
    title="SQL Agent API",
    description="An API that uses a LangChain SQL Agent with Ollama to answer questions about a MySQL database.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include the API router endpoints
app.include_router(router)

@app.get("/")
def read_root():
    """Root endpoint to check if the API is running."""
    return {"message": "Welcome to the SQL Agent API. Use POST /ask to ask questions."}

if __name__ == "__main__":
    import uvicorn
    # This allows running the app directly with python app.py
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)