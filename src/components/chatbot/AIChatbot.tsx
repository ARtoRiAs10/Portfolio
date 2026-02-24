"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const PORTFOLIO_CONTEXT = `You are an AI assistant for Gaurav Kumar's (ARtoRiAs10) portfolio website. 
Here is Gaurav's information:

NAME: Gaurav Kumar (GitHub: ARtoRiAs10)
GITHUB: https://github.com/ARtoRiAs10 (61+ repositories, Pull Shark achiever)

SKILLS:
- Frontend: React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
- Backend: Python, Node.js, Express.js, FastAPI
- AI/ML: TensorFlow, PyTorch, EfficientNet, Reinforcement Learning, OpenRouter
- Database: MongoDB, PostgreSQL, MySQL, Convex
- DevOps: Docker, Git, GitHub, AWS
- Other: Blockchain/NFT, Real-time systems, WebSockets

PROJECTS:
1. MeloSynthiaAI - NFT-Based AI Music Marketplace (TypeScript, AI, Blockchain) - 14 stars on GitHub. Collaborator on AYUSHMAN0503/MeloSynthiaAI. Focuses on generating AI-generated music compositions using NFT technology.
2. OpenDocs - Real-time collaborative document editor (Next.js, TypeScript, Convex, Clerk, Tiptap) - 2 stars. Features live editing, user mentions, reactions, rich-text interface.
3. Lingo - Language learning application (TypeScript, Next.js) with gamification and progress tracking.
4. Cost-Minimization - Python optimization project using mathematical algorithms for cost reduction problems.
5. Pac-Man AI - AI-powered Pac-Man game using Jupyter Notebook, exploring reinforcement learning.
6. EfficientNetB2 Practice - Deep learning image classification using EfficientNetB2 with transfer learning.
7. AI Portfolio Chatbot - This portfolio with integrated AI chatbot using OpenRouter API.

EXPERIENCE:
- Full Stack Developer (Freelance & Open Source, Jan 2023 - Present): Building Next.js, React, Python apps. Created OpenDocs and MeloSynthiaAI.
- AI/ML Developer (Research & Projects, Jun 2022 - Dec 2022): Deep learning with EfficientNetB2, RL with Pac-Man, optimization algorithms.
- Web Development Intern (Academic Projects, Aug 2021 - May 2022): React.js, TypeScript, language learning platform.

CONTACT:
- GitHub: https://github.com/ARtoRiAs10
- Email: gauravkumar.dev@gmail.com

Answer questions about Gaurav's projects, skills, experience, and background. Be helpful, concise, and friendly. If asked something outside this context, politely redirect to portfolio topics.`;

const SUGGESTED_QUESTIONS = [
  "What are your top projects?",
  "What tech stack do you use?",
  "Tell me about OpenDocs",
  "What AI/ML projects have you built?",
  "How can I contact you?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey! 👋 I'm Gaurav's AI assistant. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: PORTFOLIO_CONTEXT,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      setIsTyping(false);

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Sorry, I couldn't process that request.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      setIsTyping(false);
      if (error instanceof Error && error.name === "AbortError") return;

      // Fallback: use Claude API directly via Next.js API route
      try {
        const fallbackRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            context: PORTFOLIO_CONTEXT,
            history: messages.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: data.response,
              timestamp: new Date(),
            },
          ]);
        } else {
          throw new Error("Fallback also failed");
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "⚠️ Backend unavailable. Please start the Python server with `python backend/main.py`",
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="chatbot-fab"
        aria-label="Open AI Chat"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9999,
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.4)",
          animation: isOpen ? "none" : "pulse-ring 2s infinite",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(99, 102, 241, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(99, 102, 241, 0.4)";
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>{isOpen ? "✕" : "🤖"}</span>
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "2rem",
          zIndex: 9998,
          width: "min(380px, calc(100vw - 2rem))",
          height: "min(580px, calc(100vh - 8rem))",
          display: "flex",
          flexDirection: "column",
          borderRadius: "1.25rem",
          overflow: "hidden",
          background: "linear-gradient(180deg, #0f0f1a 0%, #13131f 100%)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99, 102, 241, 0.1)",
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformOrigin: "bottom right",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
          >
            🤖
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.2 }}>
              Gaurav&apos;s AI Assistant
            </div>
            <div style={{ color: "#22d3ee", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <span
                style={{
                  width: "0.4rem",
                  height: "0.4rem",
                  borderRadius: "50%",
                  background: "#22d3ee",
                  display: "inline-block",
                  animation: "blink 1.5s infinite",
                }}
              />
              Online · Powered by OpenRouter
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: "1.8rem",
              height: "1.8rem",
              color: "#9ca3af",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(99,102,241,0.3) transparent",
          }}
        >
          {/* Suggested questions (shown only initially) */}
          {messages.length === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <p style={{ color: "#6b7280", fontSize: "0.7rem", marginBottom: "0.25rem" }}>
                💡 Try asking:
              </p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    borderRadius: "0.6rem",
                    padding: "0.4rem 0.75rem",
                    color: "#a5b4fc",
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.2)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                gap: "0.2rem",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "0.65rem 0.9rem",
                  borderRadius:
                    msg.role === "user"
                      ? "1rem 1rem 0.2rem 1rem"
                      : "1rem 1rem 1rem 0.2rem",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "rgba(255,255,255,0.06)",
                  border:
                    msg.role === "user"
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                  color: "#f1f5f9",
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
              </div>
              <span style={{ color: "#4b5563", fontSize: "0.62rem" }}>
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <div
                style={{
                  padding: "0.65rem 1rem",
                  borderRadius: "1rem 1rem 1rem 0.2rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: "0.3rem",
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "0.4rem",
                      height: "0.4rem",
                      borderRadius: "50%",
                      background: "#6366f1",
                      display: "inline-block",
                      animation: `typing-dot 1.2s infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "0.875rem 1rem",
            borderTop: "1px solid rgba(99,102,241,0.15)",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about projects, skills..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "0.75rem",
              padding: "0.6rem 0.9rem",
              color: "#f1f5f9",
              fontSize: "0.82rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(99,102,241,0.6)";
              e.target.style.boxShadow = "0 0 0 2px rgba(99,102,241,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(99,102,241,0.25)";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            style={{
              width: "2.3rem",
              height: "2.3rem",
              borderRadius: "0.75rem",
              background:
                input.trim() && !isLoading
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "rgba(99,102,241,0.2)",
              border: "none",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            {isLoading ? "⏳" : "➤"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 12px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
