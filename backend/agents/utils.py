# agents/utils.py
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def call_openrouter_llm(prompt, system="You are a helpful assistant."):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",  # Optional
        "X-Title": "Sarthak's Pipeline App",       # Optional
    }

    payload = {
        "model": "openrouter/cypher-alpha:free",
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            data=json.dumps(payload),
            timeout=20
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        print("❌ OpenRouter API Error:", e)
        return "[OpenRouter API Error]"