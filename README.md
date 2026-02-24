# 🚀 Gaurav Kumar — AI-Powered Portfolio

> Personal portfolio with an AI chatbot that answers questions about projects, skills, and experience — powered by OpenRouter (free LLM), Next.js 14, and Python FastAPI.

**GitHub**: [@ARtoRiAs10](https://github.com/ARtoRiAs10)

## 🌟 Features

- ⚡ Next.js 14 portfolio with TypeScript
- 🤖 AI Chatbot floating widget powered by OpenRouter (Llama 3.1 8B — free tier)
- 🐍 Python FastAPI backend with SQLite chat history & analytics
- 💬 Project-aware AI — knows all repos, skills, and experience
- 📊 Chat analytics — tracks interactions and response times
- 🎨 Beautiful dark UI with smooth animations
- 📱 Fully responsive design

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Python 3.11+, FastAPI, Uvicorn |
| AI Engine | OpenRouter API (Llama 3.1 8B Instruct — **free**) |
| Database | SQLite (via Python sqlite3) |

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18+, Python 3.9+
- Free OpenRouter API key: [openrouter.ai](https://openrouter.ai/)

### Quick Start

```bash
chmod +x start.sh && ./start.sh
```

### Manual Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # Add OPENROUTER_API_KEY
python main.py         # → http://localhost:8000
```

**Frontend:**
```bash
cp .env.local.example .env.local   # Add OPENROUTER_API_KEY
npm install && npm run dev          # → http://localhost:3000
```

## 🔑 OpenRouter API Key (Free)
1. Sign up at [openrouter.ai](https://openrouter.ai/)
2. Generate a free API key
3. Add to `backend/.env` and `.env.local`

Free model: `stepfun/step-3.5-flash:free`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI |
| GET | `/api/analytics` | Chat analytics |
| GET | `/api/sessions/{id}` | Session history |
| GET | `/docs` | Swagger API docs |

## 🌐 Deployment with Cloudflare Tunnels (Free)

> The application is deployed across the following platforms to ensure high availability:

### Frontend (Vercel)
- URL: [https://learnify-two-nu.vercel.app/](https://portfolio-sooty-eta-82.vercel.app/)
- Features: Edge caching, automatic CI/CD from GitHub, and optimized Next.js 14 builds.

### Backend (FastAPI)
- Hosted on: [Your Hosting Provider, e.g., Render / Railway / AWS]

- Environment Configuration:
    - CORS_ORIGINS: Set to your Vercel URL.
    - DATABASE_URL: Used Local Storage. 

## 📄 License
MIT © [Gaurav Kumar (ARtoRiAs10)](https://github.com/ARtoRiAs10)
