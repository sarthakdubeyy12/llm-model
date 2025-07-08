from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from db.crud import save_pipeline, get_pipeline_by_id
import os
from dotenv import load_dotenv
import logging

# === Load .env ===
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# === Logging ===
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main")

# === FastAPI App ===
app = FastAPI()

# === Import auth routes ===
from auth.routes import router as auth_router
app.include_router(auth_router, prefix="/api/v1/auth")

# === CORS Middleware ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Import OpenRouter utility ===
from agents.utils import call_openrouter_llm

# === Pydantic Models ===
class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str
    targetHandle: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    name: str = "Untitled Pipeline"
    user_id: str

# === Node Connection Helper ===
def get_connected_nodes(node_id, edges, direction='out'):
    return [e["target"] if direction == "out" else e["source"] for e in edges if e["source" if direction == "out" else "target"] == node_id]

# === Run Pipeline ===
# === Run Pipeline ===
@app.post("/api/v1/pipelines/parse")
def run_pipeline(req: PipelineRequest):
    nodes = [n.dict() for n in req.nodes]
    edges = [e.dict() for e in req.edges]
    context = {}

    for node in nodes:
        node_type = node["type"]
        node_id = node["id"]
        data = node.get("data", {})

        logger.info(f"🔧 Processing node: {node_type} (ID: {node_id})")

        if node_type == "customInput":
            context[node_id] = data.get("value", "")

        elif node_type == "text":
            raw = data.get("input", "")
            print(f"🔍 TEXT NODE INSPECTION:")
            print(f"   Node ID: {node_id}")
            print(f"   Raw text input: '{raw}'")
            print(f"   Data object: {data}")
            print(f"   Context before processing: {context}")

            for key, value in context.items():
                raw = raw.replace(f"{{{{{key}}}}}", str(value))

            print(f"   Processed text output: '{raw}'")
            context[node_id] = raw

        elif node_type == "llm":
            prompt = "".join([context.get(nid, "") for nid in get_connected_nodes(node_id, edges, direction="in")])
            context[node_id] = call_openrouter_llm(prompt)

        elif node_type == "translate":
            src = get_connected_nodes(node_id, edges, "in")[0]
            language = data.get("language", "Hindi")
            input_text = context.get(src, "")
            prompt = f"Translate this to {language}:\n{input_text}"
            context[node_id] = call_openrouter_llm(prompt)

        elif node_type == "summarize":
            src = get_connected_nodes(node_id, edges, "in")[0]
            context[node_id] = call_openrouter_llm(f"Summarize this:\n{context.get(src, '')}")

        elif node_type == "email":
            src = get_connected_nodes(node_id, edges, "in")[0]
            context[node_id] = f"[Email Sent]: {context.get(src, '')}"

        elif node_type == "image":
            # 💡 Generate mock image using label or default description
            srcs = get_connected_nodes(node_id, edges, "in")
            input_text = context.get(srcs[0], "") if srcs else "Generated Image"
            prompt = data.get("label", input_text or "A sample image")
            logger.info(f"🖼 Generating image for prompt: {prompt}")

            # Use a more reliable image service
            import urllib.parse
            safe_text = prompt.replace(" ", "+")[:30]  # Simple encoding, limit length
            image_url = f"https://dummyimage.com/400x200/1a1a1a/ffffff&text={safe_text}"
            
            # Log the generated URL for debugging
            logger.info(f"🖼 Generated image URL: {image_url}")
            context[node_id] = image_url

        elif node_type == "audio":
            # 🎵 Generate mock audio using label or default description
            srcs = get_connected_nodes(node_id, edges, "in")
            input_text = context.get(srcs[0], "") if srcs else "Generated Audio"
            prompt = data.get("label", input_text or "A sample audio")
            logger.info(f"🎵 Generating audio for prompt: {prompt}")

            # Generate a mock audio URL (you can replace this with actual audio generation)
            import urllib.parse
            safe_text = prompt.replace(" ", "+")[:30]  # Simple encoding, limit length
            audio_url = f"https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            
            # Log the generated URL for debugging
            logger.info(f"🎵 Generated audio URL: {audio_url}")
            context[node_id] = audio_url

        elif node_type == "customOutput":
            src = get_connected_nodes(node_id, edges, "in")[0]
            context["output"] = context.get(src, "")

    logger.info(f"✅ Pipeline result: {context.get('output')}")
    return {
        "result": context.get("output", "No output"),
        "nodeResults": context  # Return all node results
    }

# === Save Pipeline ===
@app.post("/api/v1/pipelines/save")
def save_pipeline_endpoint(req: PipelineRequest):
    try:
        pipeline_id = save_pipeline(req.name, req.nodes, req.edges, req.user_id)
        return {"message": "Pipeline saved successfully", "pipeline_id": pipeline_id}
    except Exception as e:
        logger.error(f"❌ Failed to save pipeline: {e}")
        raise HTTPException(status_code=500, detail="Failed to save pipeline")

# === Get Pipeline By ID ===
@app.get("/api/v1/pipelines/{pipeline_id}")
def get_pipeline(pipeline_id: str):
    pipeline = get_pipeline_by_id(pipeline_id)
    if pipeline:
        return pipeline
    else:
        raise HTTPException(status_code=404, detail="Pipeline not found")