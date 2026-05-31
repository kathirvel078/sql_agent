import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents.sql_agent import get_sql_agent

logger = logging.getLogger(__name__)
router = APIRouter()

# Global variable to cache the agent executor to avoid re-initializing on every request
_agent = None

def get_agent():
    """Returns the SQL agent executor, initializing it if necessary."""
    global _agent
    if _agent is None:
        _agent = get_sql_agent()

    return _agent

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str

@router.post("/ask", response_model=AskResponse)
async def ask_question(request: AskRequest):
    try:
        logger.info(f"Received question: {request.question}")

        agent = get_agent()

        response = agent.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": request.question
                    }
                ]
            }
        )

        answer = response["messages"][-1].content

        return AskResponse(answer=answer)

    except Exception as e:
        logger.exception("Agent execution failed")
        raise HTTPException(status_code=500, detail=str(e))