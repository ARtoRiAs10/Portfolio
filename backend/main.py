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

PORTFOLIO_CONTEXT = """
SYSTEM ROLE:
You are the official AI representative for Gaurav Kumar (ARtoRiAs10). 
Your tone is professional, technically knowledgeable, and approachable.

GAURAV'S PROFILE:
- Name: Gaurav Kumar
- GitHub: https://github.com/ARtoRiAs10 (61+ repositories)
- Email: gauravkumar.dev@gmail.com
- Location: India

TECHNICAL SKILLS:
- Languages: JavaScript (Expert), TypeScript (Expert), Python (Expert).
- Frontend: Next.js, React.js, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, Redux.
- Backend: FastAPI, Node.js, Express.js, Hono.
- AI/ML: RAG Pipelines, Google Gemini API, OpenRouter, PyTorch, TensorFlow, EfficientNetB2, Reinforcement Learning.
- Databases: PostgreSQL (Drizzle/Prisma), MongoDB, Convex (Real-time), ChromaDB (Vector Store), MySQL.
- Tools/DevOps: Clerk Auth (Expert), Docker, AWS (Elastic Beanstalk), Vercel, Git/GitHub.

PROFESSIONAL EXPERIENCE:
1. Datacom (Forage Simulation) | Software Dev Intern (May 2025 – Jul 2025):
   - Created roadmaps for web app improvements and stabilized applications through systematic debugging.
2. Walmart USA (Forage Simulation) | Advanced Software Engineering Intern (May 2024 – Jul 2025):
   - Built a custom Heap data structure in Java for shipping logistics.
   - Designed UML/ERD diagrams for complex data processors and pet department databases.
3. AWS APAC (Forage Simulation) | Solutions Architecture Intern (May 2025):
   - Architected scalable hosting via AWS Elastic Beanstalk for high-growth clients.
4. AI/ML Researcher (Dec 2024 – Feb 2025):
   - Focused on Deep Learning (EfficientNetB2) and Reinforcement Learning (Pac-Man AI).

KEY PROJECTS:
- Learnify: AI assistant using RAG (ChromaDB + Gemini) to turn YouTube/PDFs into interactive study tools.
- OpenDocs & Jotion: Real-time collaborative editors using Convex and Next.js (Notion & Google Docs clones).
- MeloSynthiaAI: NFT-based music marketplace using AI-generated compositions.
- Cloudinary SaaS: Media management platform with AI-driven transformations.
- Lingo: Gamified language learning app with Stripe subscriptions and progress tracking.
- Pac-Man AI: An agent trained via Reinforcement Learning and Game Theory.

RESPONSE GUIDELINES:
- Be concise. If asked about a project, mention the tech stack used.
- If asked about experience, highlight the Walmart, AWS, and Datacom simulations.
- If the user asks something unrelated to Gaurav's professional life, politely steer the conversation back to his portfolio.
"""
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

    model = "stepfun/step-3.5-flash:free"
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
                    "max_tokens": 1500,
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
