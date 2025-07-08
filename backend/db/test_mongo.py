import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get the MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

try:
    # Create a MongoClient with a short timeout
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

    # Run a test command to verify connection
    client.admin.command("ping")
    print("✅ MongoDB connection successful!")
except Exception as e:
    print("❌ MongoDB connection failed:", e)