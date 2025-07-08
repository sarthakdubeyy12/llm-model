from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
from passlib.hash import bcrypt

load_dotenv()

# === Mongo Setup ===
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["pipeline_db"]
pipeline_collection = db["pipelines"]
user_collection = db["users"]

# === Pipeline Functions ===
def save_pipeline(name, nodes, edges, user_id):
    try:
        pipeline = {
            "name": name,
            "nodes": [n.dict() for n in nodes],
            "edges": [e.dict() for e in edges],
            "user_id": user_id
        }
        result = pipeline_collection.insert_one(pipeline)
        return str(result.inserted_id)
    except Exception as e:
        print("❌ Error saving pipeline:", e)
        return None

def get_pipeline_by_id(pipeline_id):
    try:
        pipeline = pipeline_collection.find_one({"_id": ObjectId(pipeline_id)})
        if pipeline:
            pipeline["_id"] = str(pipeline["_id"])
            return pipeline
    except Exception as e:
        print("❌ Error fetching pipeline:", e)
    return None

def get_pipelines_by_user(user_id):
    try:
        pipelines = pipeline_collection.find({"user_id": user_id})
        result = []
        for p in pipelines:
            p["_id"] = str(p["_id"])
            result.append(p)
        return result
    except Exception as e:
        print("❌ Error fetching user pipelines:", e)
        return []

# === User Auth Functions ===
def create_user(email: str, password: str):
    if user_collection.find_one({"email": email}):
        return None  # User already exists
    hashed_password = bcrypt.hash(password)
    user = {"email": email, "password": hashed_password}
    result = user_collection.insert_one(user)
    return str(result.inserted_id)

def authenticate_user(email: str, password: str):
    user = user_collection.find_one({"email": email})
    if not user:
        return None
    if not bcrypt.verify(password, user["password"]):
        return None
    user["id"] = str(user["_id"])
    return user