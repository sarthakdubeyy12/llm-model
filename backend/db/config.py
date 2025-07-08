# db/config.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")  # Add this to your .env
client = MongoClient(MONGO_URI)
db = client["pipeline_app"]
pipeline_collection = db["pipelines"]