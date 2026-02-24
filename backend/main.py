"""
Portfolio AI Chatbot Backend
FastAPI + OpenRouter + SQLite
"""

import os
import sqlite3
import json
import time
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from contextlib import asynccontextmanager

# ─── Database Setup ─────────────────────────────────────────────────────────

DB_PATH = "chat_history.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS chat_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            response_time_ms INTEGER,
            model TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def save_message(session_id: str, role: str, content: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        "INSERT INTO chat_sessions (session_id, role, content) VALUES (?, ?, ?)",
        (session_id, role, content)
    )
    conn.commit()
    conn.close()

def save_analytics(question: str, response_time_ms: int, model: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        "INSERT INTO analytics (question, response_time_ms, model) VALUES (?, ?, ?)",
        (question, response_time_ms, model)
    )
    conn.commit()
    conn.close()

def get_session_history(session_id: str, limit: int = 10):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        "SELECT role, content FROM chat_sessions WHERE session_id = ? ORDER BY timestamp DESC LIMIT ?",
        (session_id, limit)
    )
    rows = c.fetchall()
    conn.close()
    return [{"role": row[0], "content": row[1]} for row in reversed(rows)]

# ─── Portfolio Context ───────────────────────────────────────────────────────

PORTFOLIO_CONTEXT = """You are an AI assistant for Gaurav Kumar's (ARtoRiAs10) portfolio website.
Here is Gaurav's complete information:

NAME: Gaurav Kumar | GitHub: ARtoRiAs10
GITHUB: https://github.com/ARtoRiAs10 (61+ repositories)

SKILLS:
- Frontend: React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
- Backend: Python, Node.js, Express.js, FastAPI
- AI/ML: TensorFlow, PyTorch, EfficientNet, Reinforcement Learning, OpenRouter API
- Database: MongoDB, PostgreSQL, MySQL, SQLite, Convex
- DevOps: Docker, Git, GitHub, AWS
- Other: Blockchain/NFT, Real-time systems, WebSockets, Clerk Auth

PROJECTS:
1. MeloSynthiaAI — NFT-Based AI Music Marketplace (TypeScript, AI, Blockchain) — 14 GitHub stars.
   Generates AI-composed music as NFTs. Collaborative project with AYUSHMAN0503.
   Repo: https://github.com/AYUSHMAN0503/MeloSynthiaAI

2. OpenDocs — Real-time collaborative document editor (Next.js, TypeScript, Convex, Clerk, Tiptap) — 2 stars.
   Features live editing, user mentions, emoji reactions, rich-text interface.
   Repo: https://github.com/ARtoRiAs10/OpenDocs

3. Lingo — Language learning app (TypeScript, Next.js) with gamification and progress tracking.
   Repo: https://github.com/ARtoRiAs10/lingo

4. Cost-Minimization — Python optimization project using mathematical algorithms for cost reduction.
   Repo: https://github.com/ARtoRiAs10/Cost-Mininimization

5. Pac-Man AI — Reinforcement learning Pac-Man agent in Jupyter Notebook/Python.
   Repo: https://github.com/ARtoRiAs10/Pac-man

6. EfficientNetB2 Practice — Deep learning image classification with transfer learning in Python.
   Repo: https://github.com/ARtoRiAs10/EfficientNetB2_practice

7. AI Portfolio Chatbot — This portfolio with AI chatbot (Next.js + Python FastAPI + OpenRouter).

EXPERIENCE:
- Full Stack Developer (Freelance, Jan 2023–Present): Next.js, React, TypeScript, Python apps.
- AI/ML Developer (Research, Jun–Dec 2022): Deep learning, reinforcement learning, optimization.
- Web Dev Intern (Academic, Aug 2021–May 2022): React.js, TypeScript apps.

CONTACT:
- GitHub: https://github.com/ARtoRiAs10
- Email: gauravkumar.dev@gmail.com

Be concise, helpful, and friendly. Answer only about Gaurav's portfolio, projects, skills, and background.
For unrelated questions, politely redirect to portfolio topics."""

# ─── Models ─────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None
    history: Optional[list] = []
    session_id: Optional[str] = "default"

class ChatResponse(BaseModel):
    response: str
    model: str
    session_id: str

# ─── App Setup ───────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    print("✅ Database initialized")
    print("🚀 Portfolio AI Backend starting...")
    yield
    print("👋 Shutting down...")

app = FastAPI(
    title="Portfolio AI Chatbot API",
    description="AI-powered portfolio chatbot for Gaurav Kumar (ARtoRiAs10)",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routes ──────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Portfolio AI Chatbot Backend",
        "owner": "Gaurav Kumar (ARtoRiAs10)",
        "github": "https://github.com/ARtoRiAs10",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    api_key = os.getenv("OPENROUTER_API_KEY", "")

    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="OPENROUTER_API_KEY not set. Add it to backend/.env file."
        )

    # Save user message
    save_message(request.session_id, "user", request.message)

    # Build message history
    context = request.context or PORTFOLIO_CONTEXT
    history = request.history or []

    messages = [{"role": "system", "content": context}]
    if history:
        messages.extend(history[-6:])  # Last 6 messages for context
    messages.append({"role": "user", "content": request.message})

    model = "meta-llama/llama-3.1-8b-instruct:free"
    start_time = time.time()

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://github.com/ARtoRiAs10",
                    "X-Title": "Gaurav Kumar Portfolio",
                },
                json={
                    "model": model,
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7,
                },
            )

        elapsed_ms = int((time.time() - start_time) * 1000)

        if response.status_code != 200:
            error_detail = response.text
            print(f"OpenRouter error {response.status_code}: {error_detail}")
            raise HTTPException(status_code=502, detail=f"OpenRouter API error: {response.status_code}")

        data = response.json()
        ai_response = data["choices"][0]["message"]["content"]

        # Save to DB
        save_message(request.session_id, "assistant", ai_response)
        save_analytics(request.message, elapsed_ms, model)

        return ChatResponse(
            response=ai_response,
            model=model,
            session_id=request.session_id,
        )

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to OpenRouter timed out")
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Network error: {str(e)}")

@app.get("/api/analytics")
async def get_analytics():
    """Get chat analytics summary"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM chat_sessions WHERE role = 'user'")
    total_messages = c.fetchone()[0]
    c.execute("SELECT AVG(response_time_ms) FROM analytics")
    avg_response_time = c.fetchone()[0]
    c.execute("SELECT COUNT(*) FROM analytics")
    total_interactions = c.fetchone()[0]
    conn.close()

    return {
        "total_user_messages": total_messages,
        "total_ai_interactions": total_interactions,
        "avg_response_time_ms": round(avg_response_time or 0, 2),
    }

@app.get("/api/sessions/{session_id}")
async def get_session(session_id: str):
    """Get chat history for a session"""
    history = get_session_history(session_id)
    return {"session_id": session_id, "messages": history}

if __name__ == "__main__":
    import uvicorn
    print("Starting Portfolio AI Backend...")
    print("Docs available at: http://localhost:8000/docs")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
