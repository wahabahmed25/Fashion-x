import os
from dotenv import load_dotenv

load_dotenv()


#loads deepseek api key
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
