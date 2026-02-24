#!/bin/bash

echo "🚀 Starting Gaurav Kumar's Portfolio + AI Chatbot"
echo "================================================="

# Start Python backend
echo ""
echo "📦 Starting Python Backend..."
cd backend

# Install dependencies if not installed
if ! python3 -c "import fastapi" 2>/dev/null; then
  echo "Installing Python dependencies..."
  pip3 install -r requirements.txt
fi

# Copy env if not exists
if [ ! -f .env ]; then
  cp .env.example .env
  echo "⚠️  Please set your OPENROUTER_API_KEY in backend/.env"
fi

# Start backend in background
python3 main.py &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID) at http://localhost:8000"

# Go back to root
cd ..

# Start Next.js frontend
echo ""
echo "🌐 Starting Next.js Frontend..."

# Copy env if not exists
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
fi

npm install
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID) at http://localhost:3000"

echo ""
echo "================================================="
echo "✨ Portfolio running at:   http://localhost:3000"
echo "🤖 AI Backend running at: http://localhost:8000"
echo "📖 API Docs at:           http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo "================================================="

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
