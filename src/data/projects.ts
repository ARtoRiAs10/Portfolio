import { IProjectItem, ProjectType, RepoType } from "@/types";

const projects: IProjectItem[] = [
  {
    id: "melosynthia-ai",
    title: "MeloSynthiaAI",
    description:
      "NFT-Based AI Music Marketplace that focuses on generating AI-generated music compositions. Built with TypeScript, React, and blockchain technology for a seamless creative experience.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/AYUSHMAN0503/MeloSynthiaAI",
    tags: ["TypeScript", "AI", "NFT", "Music", "Blockchain"],
  },
  {
    id: "opendocs",
    title: "OpenDocs",
    description:
      "A full-stack, real-time collaborative document editor built with Next.js, React, TypeScript, Convex, and Clerk. Features live editing, user mentions, reactions, and a Tiptap-powered rich-text interface.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/OpenDocs",
    tags: ["Next.js", "TypeScript", "Convex", "Clerk", "Real-time"],
  },
  {
    id: "lingo",
    title: "Lingo",
    description:
      "A language learning application built with TypeScript and modern web technologies, offering an interactive and engaging learning experience.",
    icon: "/skills/typescript.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/lingo",
    tags: ["TypeScript", "Next.js", "Education", "Web App"],
  },
  {
    id: "cost-minimization",
    title: "Cost Minimization",
    description:
      "An optimization project built in Python focusing on cost reduction algorithms and mathematical optimization techniques for real-world problems.",
    icon: "/skills/nodejs.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/Cost-Mininimization",
    tags: ["Python", "Optimization", "Algorithms", "Mathematics"],
  },
  {
    id: "pac-man",
    title: "Pac-Man AI",
    description:
      "An AI-powered Pac-Man game implementation using Jupyter Notebook, exploring reinforcement learning and game theory algorithms.",
    icon: "/skills/python.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/Pac-man",
    tags: ["Python", "AI", "Reinforcement Learning", "Game Dev"],
  },
  {
    id: "efficientnet-practice",
    title: "EfficientNetB2 Image Classifier",
    description:
      "Deep learning image classification practice using EfficientNetB2 architecture, demonstrating transfer learning techniques with Python and TensorFlow/PyTorch.",
    icon: "/skills/python.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/EfficientNetB2_practice",
    tags: ["Python", "Deep Learning", "Computer Vision", "EfficientNet"],
  },
  {
    id: "portfolio-ai-chat",
    title: "AI Portfolio Chatbot",
    description:
      "This portfolio itself — featuring an intelligent AI chatbot powered by OpenRouter that answers questions about my projects, skills, and experience in real-time.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10",
    tags: ["Next.js", "TypeScript", "Python", "OpenRouter", "AI"],
  },

  {
    id: "jotion",
    title: "Jotion",
    description:
      "A full-featured Notion clone built with Next.js, TypeScript, and Convex for real-time data sync. Supports nested documents, rich-text editing, cover images, icons, and a trash/restore system — all with seamless live updates.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/notion-clone",
    tags: ["Next.js", "TypeScript", "Convex", "Tailwind CSS", "Real-time"],
  },
  {
    id: "finance-dashboard",
    title: "Finance Dashboard",
    description:
      "A modern financial analytics dashboard built with Next.js and TypeScript. Provides an intuitive interface for tracking income, expenses, and financial trends with dynamic charts and clean data visualizations.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/finance-dashboard",
    tags: ["Next.js", "TypeScript", "Finance", "Dashboard", "Charts"],
  },
  {
    id: "cloudinary-saas",
    title: "Cloudinary SaaS",
    description:
      "A cloud-based media management SaaS application powered by Next.js, Prisma, and Cloudinary. Features AI-driven image/video transformations, secure Clerk authentication, and a polished UI for seamless asset management.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/Cloudinary-Saas",
    tags: ["Next.js", "TypeScript", "Cloudinary", "Prisma", "Clerk", "SaaS"],
  },
  {
    id: "music-marketplace",
    title: "Music Marketplace",
    description:
      "A full-stack music marketplace platform built with Next.js and TypeScript, allowing artists to showcase and sell their tracks. Features browsing, audio previews, and a clean storefront experience.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/music_Marketplace",
    tags: ["Next.js", "TypeScript", "Music", "E-Commerce", "Tailwind CSS"],
  },
  {
    id: "learnify",
    title: "Learnify",
    description:
      "An AI-powered learning assistant that transforms YouTube videos and PDFs into interactive study tools. Built with Next.js and FastAPI, it leverages Google Gemini, RAG pipelines, ChromaDB vector search, and sentence embeddings to generate smart flashcards, quizzes, and a streaming chat interface.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/ARtoRiAs10/Learnify",
    tags: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Google Gemini",
      "RAG",
      "ChromaDB",
      "AI",
    ],
  },
];
export default projects;
