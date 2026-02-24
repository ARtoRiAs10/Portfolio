import { IServiceItem } from "@/types";

const services: IServiceItem[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Backed by: Jotion (Notion clone), Lingo (Duolingo clone), FluxDeck
  //            (Jira clone), Music Marketplace, Finance Dashboard
  // Core stack proven across 8+ deployed projects
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Full-Stack Web Development",
    icons: [
      "/skills/nextjs.png",
      "/skills/react.svg",
      "/skills/typescript.svg",
      "/skills/css.svg",
      "/skills/postgresql.svg",
    ],
    shortDescription:
      "I build polished, production-ready web applications end to end.",
    description:
      "From Notion-style document editors to Duolingo-style learning platforms and Jira-inspired project trackers, I build complete, production-grade web applications using Next.js 14, React, TypeScript, and Tailwind CSS. I handle everything from pixel-perfect UI with shadcn/ui to server actions, database design with Drizzle or Prisma, and deployment on Vercel — delivering fast, scalable, and maintainable products.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Backed by: Learnify (RAG + Google Gemini + ChromaDB + FastAPI),
  //            Portfolio AI Chatbot (OpenRouter API),
  //            MeloSynthiaAI (AI music generation)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "AI-Powered App Development",
    icons: [
      "/skills/python.svg",
      "/skills/nextjs.png",
      "/skills/nodejs.svg",
      "/skills/express.svg",
      "/skills/mongodb.svg",
    ],
    shortDescription:
      "I integrate LLMs and RAG pipelines into real-world applications.",
    description:
      "I build intelligent applications that go beyond simple API calls. Using Google Gemini, OpenRouter, RAG pipelines with ChromaDB and sentence embeddings, and FastAPI backends, I create AI-powered tools like interactive learning assistants (Learnify), streaming chatbots grounded in your content, and generative AI platforms. I handle the full stack — from vector search and LLM orchestration to a polished Next.js frontend.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Backed by: Cloudinary SaaS (Next.js + Prisma + PostgreSQL + Cloudinary +
  //            Clerk + Render), Finance Dashboard (analytics + charts)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "SaaS & Cloud Platform Development",
    icons: [
      "/skills/nextjs.png",
      "/skills/postgresql.svg",
      "/skills/aws.svg",
      "/skills/docker.png",
      "/skills/git.svg",
    ],
    shortDescription:
      "I build multi-tenant SaaS platforms with auth, billing, and cloud storage.",
    description:
      "I design and build full-featured SaaS products with the infrastructure to match. From Cloudinary-powered media management platforms with AI transformations to financial analytics dashboards, I handle authentication (Clerk), database design (PostgreSQL + Prisma), cloud storage integration, Stripe billing, and deployment on Render or Vercel. Every project is built for real users, real scale, and real reliability.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Backed by: OpenDocs (Convex real-time + Tiptap + Clerk + Next.js),
  //            Jotion (Convex real-time document sync, multi-tab presence)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Real-Time & Collaborative Tools",
    icons: [
      "/skills/nextjs.png",
      "/skills/react.svg",
      "/skills/nodejs.svg",
      "/skills/typescript.svg",
      "/skills/firebase.svg",
    ],
    shortDescription:
      "I build live-syncing collaborative apps with real-time presence.",
    description:
      "I build real-time collaborative experiences using Convex for live data sync, Tiptap for rich-text editing, and Clerk for user presence and authentication. Whether it's a collaborative document editor with live cursors, reactions, and mentions (OpenDocs), or a real-time note-taking workspace with nested pages (Jotion), I engineer the full experience — from WebSocket-backed data layers to a polished, responsive UI.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Backed by: Learnify FastAPI backend (YouTube transcript, PDF parsing,
  //            RAG, streaming), FluxDeck Hono RPC API,
  //            Lingo server actions + Drizzle ORM
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Backend & API Development",
    icons: [
      "/skills/nodejs.svg",
      "/skills/express.svg",
      "/skills/python.svg",
      "/skills/postgresql.svg",
      "/skills/mongodb.svg",
    ],
    shortDescription:
      "I build robust, type-safe APIs and scalable backend systems.",
    description:
      "I design and build backend systems that are efficient, type-safe, and production-ready. I work with Node.js and Express for REST APIs, FastAPI for high-performance Python backends, and Hono for lightweight RPC layers. I use Drizzle ORM and Prisma for type-safe database access with PostgreSQL, and structure server logic using Next.js server actions, middleware, and route handlers for seamless full-stack integration.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Backed by: FoodVision (EfficientNetB2 + Gradio + HuggingFace),
  //            EfficientNetB2_practice (transfer learning experiments),
  //            Pac-Man AI (DCQN reinforcement learning agent),
  //            Cost-Minimization (deep Q-learning optimization)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Computer Vision & Deep Learning",
    icons: [
      "/skills/python.svg",
      "/skills/nodejs.svg",
      "/images/analytical-skills.png",
      "/images/logical-thinking.png",
      "/skills/aws.svg",
    ],
    shortDescription:
      "I build and deploy image classifiers and reinforcement learning agents.",
    description:
      "I design and train deep learning models for real-world computer vision and reinforcement learning tasks. Using PyTorch and transfer learning, I built FoodVision — an EfficientNetB2 image classifier deployed on Hugging Face Spaces with a Gradio interface. I also implemented a Deep Convolutional Q-Network (DCQN) agent that learns to play Pac-Man from raw pixels, and applied optimization algorithms to cost minimization problems. From model training to deployment, I deliver the full ML pipeline.",
  },
];

export default services;
