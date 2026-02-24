import { ISkillListItem, SkillLevel } from "@/types";

const skills: ISkillListItem[] = [
  // ─────────────────────────────────────────────
  // Evidence: Used in every single web project
  // JS/TS — Jotion, Finance, Cloudinary, Lingo, FluxDeck, OpenDocs, MeloSynthia, Music Marketplace
  // Python — Learnify backend, FoodVision, Pac-Man, Cost-Minimization, EfficientNetB2
  // ─────────────────────────────────────────────
  {
    title: "Programming Languages",
    items: [
      {
        title: "JavaScript",
        level: SkillLevel.Expert,
        icon: "/skills/javascript.svg",
      },
      {
        title: "TypeScript",
        level: SkillLevel.Expert,
        icon: "/skills/typescript.svg",
      },
      {
        title: "Python",
        level: SkillLevel.Expert,
        icon: "/skills/python.svg",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Next.js  → Jotion, Finance Dashboard, Cloudinary SaaS, Music Marketplace,
  //            Lingo, Learnify (frontend), FluxDeck, OpenDocs
  // React    → all Next.js projects + MeloSynthiaAI
  // Tailwind → every web project
  // shadcn   → Jotion, Cloudinary SaaS, Lingo, FluxDeck, OpenDocs
  // Zustand  → Lingo (hearts / practice modal state)
  // TanStack Query → FluxDeck (server state management)
  // Redux    → existing skill
  // ─────────────────────────────────────────────
  {
    title: "Frontend Development",
    items: [
      {
        title: "Next.js",
        level: SkillLevel.Expert,
        icon: "/skills/nextjs.png",
      },
      {
        title: "React.js",
        level: SkillLevel.Expert,
        icon: "/skills/react.svg",
      },
      {
        title: "HTML",
        level: SkillLevel.Expert,
        icon: "/skills/html.svg",
      },
      {
        title: "CSS / Tailwind CSS",
        level: SkillLevel.Expert,
        icon: "/skills/css.svg",
      },
      {
        title: "shadcn/ui",
        level: SkillLevel.Expert,
        icon: "/skills/react.svg",
      },
      {
        title: "Zustand",
        level: SkillLevel.Intermediate,
        icon: "/skills/react.svg",
      },
      {
        title: "TanStack Query",
        level: SkillLevel.Intermediate,
        icon: "/skills/react.svg",
      },
      {
        title: "Redux Toolkit",
        level: SkillLevel.Intermediate,
        icon: "/skills/redux.svg",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // FastAPI  → Learnify (Python backend: YouTube transcript, PDF, RAG chat)
  // Node.js  → existing skill + FluxDeck API layer
  // Express  → existing skill
  // Hono     → FluxDeck RPC API routes
  // ─────────────────────────────────────────────
  {
    title: "Backend Development",
    items: [
      {
        title: "Node.js",
        level: SkillLevel.Intermediate,
        icon: "/skills/nodejs.svg",
      },
      {
        title: "Express.js",
        level: SkillLevel.Intermediate,
        icon: "/skills/express.svg",
      },
      {
        title: "FastAPI",
        level: SkillLevel.Intermediate,
        icon: "/skills/python.svg",
      },
      {
        title: "Hono",
        level: SkillLevel.Beginner,
        icon: "/skills/nodejs.svg",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PyTorch     → FoodVision (EfficientNetB2), Pac-Man (DCQN agent), EfficientNetB2_practice
  // TensorFlow  → EfficientNetB2_practice, Cost-Minimization
  // Gemini API  → Learnify (flashcards, quiz, streaming RAG chat)
  // OpenRouter  → Portfolio AI chatbot
  // RAG         → Learnify (ChromaDB + MiniLM embeddings + Gemini)
  // ─────────────────────────────────────────────
  {
    title: "AI / Machine Learning",
    items: [
      {
        title: "PyTorch",
        level: SkillLevel.Intermediate,
        icon: "/skills/python.svg",
      },
      {
        title: "TensorFlow",
        level: SkillLevel.Intermediate,
        icon: "/skills/python.svg",
      },
      {
        title: "Google Gemini",
        level: SkillLevel.Intermediate,
        icon: "/skills/python.svg",
      },
      {
        title: "OpenRouter API",
        level: SkillLevel.Expert,
        icon: "/skills/python.svg",
      },
      {
        title: "RAG Pipelines",
        level: SkillLevel.Intermediate,
        icon: "/skills/python.svg",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PostgreSQL  → Lingo (NeonDB via Drizzle), Cloudinary SaaS (via Prisma)
  // MongoDB     → existing skill
  // MySQL       → existing skill
  // Drizzle ORM → Lingo (schema: courses, lessons, challenges, userProgress, etc.)
  // Prisma      → Cloudinary SaaS (media asset records)
  // Convex      → Jotion (real-time docs), OpenDocs (collaborative editing)
  // ChromaDB    → Learnify (vector store for RAG semantic search)
  // ─────────────────────────────────────────────
  {
    title: "Database Management",
    items: [
      {
        title: "PostgreSQL",
        level: SkillLevel.Intermediate,
        icon: "/skills/postgresql.svg",
      },
      {
        title: "MongoDB",
        level: SkillLevel.Intermediate,
        icon: "/skills/mongodb.svg",
      },
      {
        title: "MySQL",
        level: SkillLevel.Beginner,
        icon: "/skills/mysql.svg",
      },
      {
        title: "Drizzle ORM",
        level: SkillLevel.Intermediate,
        icon: "/skills/postgresql.svg",
      },
      {
        title: "Prisma",
        level: SkillLevel.Intermediate,
        icon: "/skills/postgresql.svg",
      },
      {
        title: "Convex",
        level: SkillLevel.Intermediate,
        icon: "/skills/nodejs.svg",
      },
      {
        title: "ChromaDB",
        level: SkillLevel.Beginner,
        icon: "/skills/python.svg",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Clerk      → Jotion, Cloudinary SaaS, Lingo, OpenDocs, Learnify (5 projects)
  // Cloudinary → Cloudinary SaaS (AI image/video transform & storage)
  // Stripe     → Lingo (Pro subscription payments)
  // ─────────────────────────────────────────────
  {
    title: "Auth & Cloud Services",
    items: [
      {
        title: "Clerk",
        level: SkillLevel.Expert,
        icon: "/skills/nextjs.png",
      },
      {
        title: "Cloudinary",
        level: SkillLevel.Intermediate,
        icon: "/skills/nextjs.png",
      },
      {
        title: "Stripe",
        level: SkillLevel.Beginner,
        icon: "/skills/nodejs.svg",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Git / GitHub → all 13+ repos, active contributions
  // Docker       → existing + AWS Forage simulation
  // AWS          → AWS APAC Forage (Elastic Beanstalk architecture)
  // Vercel       → Jotion, Lingo, Finance Dashboard, Music Marketplace, Learnify deployed
  // ─────────────────────────────────────────────
  {
    title: "DevOps / VCS",
    items: [
      {
        title: "Git",
        level: SkillLevel.Expert,
        icon: "/skills/git.svg",
      },
      {
        title: "GitHub",
        level: SkillLevel.Expert,
        icon: "/skills/github.svg",
      },
      {
        title: "Docker",
        level: SkillLevel.Beginner,
        icon: "/skills/docker.png",
      },
      {
        title: "AWS",
        level: SkillLevel.Beginner,
        icon: "/skills/aws.svg",
      },
      {
        title: "Vercel",
        level: SkillLevel.Intermediate,
        icon: "/skills/nextjs.png",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Firebase → existing skill
  // Gradio   → FoodVision (deployed interactive food classifier on HuggingFace)
  // ─────────────────────────────────────────────
  {
    title: "Miscellaneous",
    items: [
      {
        title: "Firebase",
        level: SkillLevel.Intermediate,
        icon: "/skills/firebase.svg",
      },
      {
        title: "Gradio",
        level: SkillLevel.Beginner,
        icon: "/skills/python.svg",
      },
    ],
  },

  {
    title: "Nontechnical Skills",
    items: [
      {
        title: "Problem Solving",
        level: SkillLevel.Expert,
        icon: "/images/logical-thinking.png",
      },
      {
        title: "Collaboration",
        level: SkillLevel.Expert,
        icon: "/images/collaboration.png",
      },
      {
        title: "Analytical Skills",
        level: SkillLevel.Expert,
        icon: "/images/analytical-skills.png",
      },
    ],
  },
];

export default skills;
