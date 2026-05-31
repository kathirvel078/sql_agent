# SQL Agent Project

This project provides an API to interact with a MySQL database using natural language. It utilizes LangChain, FastAPI, and a local Ollama model (`llama3.2`) to understand queries, generate SQL, execute it, and return concise answers.

## Architecture & Structure

```
sql-agent/
│
├── app.py                  # Entry point for the FastAPI application
├── agents/
│   └── sql_agent.py        # LangChain agent setup and logic
├── database/
│   └── db.py               # Database connection and utilities
├── config/
│   └── settings.py         # Environment variables configuration
├── api/
│   └── routes.py           # FastAPI endpoints
├── .env                    # Environment variables (credentials)
├── requirements.txt        # Project dependencies
└── README.md               # Project documentation
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**
   Update the `.env` file with your actual database credentials. Example:
   ```
   DATABASE_URL=mysql+pymysql://root:root@localhost/company_db
   OLLAMA_MODEL=llama3.2
   OLLAMA_BASE_URL=http://localhost:11434
   ```

3. **Ollama Setup**
   Ensure Ollama is running and you have the model pulled:
   ```bash
   ollama pull llama3.2
   ollama run llama3.2
   ```

## Running the API

Start the FastAPI development server:
```bash
uvicorn app:app --reload
```

## Testing the API

You can test the endpoint using `curl` or Postman.

```bash
curl -X POST http://127.0.0.1:8000/ask \
     -H "Content-Type: application/json" \
     -d '{"question": "How many employees are there?"}'
```

Expected output:
```json
{
  "answer": "There are X employees."
}
```
