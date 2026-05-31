from langchain_community.utilities import SQLDatabase

db = SQLDatabase.from_uri(
    "mysql+pymysql://root:root@localhost/company_db"
)

print(db.get_table_info())