import logging
from langchain_community.utilities import SQLDatabase
from config.settings import DATABASE_URL

logger = logging.getLogger(__name__)

def get_db() -> SQLDatabase:
    """Initialize and return the LangChain SQLDatabase instance."""
    try:
        # LangChain's SQLDatabase automatically handles schema reflection
        db = SQLDatabase.from_uri(DATABASE_URL)
        logger.info("Successfully connected to the database.")
        return db
    except Exception as e:
        logger.error(f"Error connecting to database: {e}")
        raise e
