import logging

from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain_community.agent_toolkits import SQLDatabaseToolkit

from database.db import get_db
from config.settings import OLLAMA_MODEL, OLLAMA_BASE_URL

logger = logging.getLogger(__name__)

def get_sql_agent():
    try:
        # Database connection
        db = get_db()

        # Ollama LLM
        llm = ChatOllama(
            model=OLLAMA_MODEL,
            base_url=OLLAMA_BASE_URL,
            temperature=0
        )
        # SQL Toolkit
        toolkit = SQLDatabaseToolkit(
            db=db,
            llm=llm
        )

        tools = toolkit.get_tools()

        # Agent
        agent = create_agent(
            model=llm,
            tools=tools,
            system_prompt="""
               You are an expert SQL assistant.

               Rules:
               1. Inspect schema before querying.
               2. Generate valid SQL.
               3. Execute SQL using available tools.
               4. Return concise answers.
               5. If query fails, fix it and retry.
               """
        )
        logger.info("SQL Agent initialized successfully")

        return agent

    except Exception as e:
        logger.exception("Failed to initialize SQL Agent")
    raise