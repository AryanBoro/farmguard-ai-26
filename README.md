# 🌱 FarmGuard AI — Frontend

> Intelligent crop disease detection interface built with React, TypeScript, Tailwind CSS, and shadcn/ui.

![FarmGuard AI](https://img.shields.io/badge/FarmGuard-AI-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

---

<img width="1458" height="813" alt="Screenshot 2026-03-05 015325" src="https://github.com/user-attachments/assets/6f6915e2-9442-4b9c-9396-43a73db9b178" />


## Overview

FarmGuard AI is a crop disease detection web app that lets farmers upload a leaf image and instantly receive AI-powered disease diagnosis, treatment recommendations, weather risk assessment, and crop history analytics.

This repo is the **frontend only**. All AI inference and data is served by the backend at:
```
https://borreooo-farmguard-ai.hf.space
```

---

## Screenshots

![Home](./screenshots/home.png)
![Scan](./screenshots/scan.png)
![Dashboard](./screenshots/dashboard.png)

## Features

- 🔍 **Scan** — Upload a leaf image, select crop type, get instant disease diagnosis
- 💊 **Remedies** — Immediate actions, prevention tips, and organic treatment options
- 🌤️ **Weather Risk** — Real-time weather-based disease risk assessment
- 📊 **Dashboard** — Scan history, disease trends, and analytics
- 🌿 **History** — Full scan log with severity badges and crop filters

---

## Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** — glassmorphism design system
- **shadcn/ui** — component library
- **Three.js** — animated WebGL shader background
- **Recharts** — dashboard charts
- **lucide-react** — icons

---

## Design System

Dark glassmorphism aesthetic throughout:
- Background: `zinc-950`
- Cards: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl`
- Animations: `fadeSlideIn` on all cards
- Severity: green (healthy) → amber (moderate) → red (high) → purple (critical)

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/AryanBoro/farmguard-ai-frontend
cd farmguard-ai-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variable
Create a `.env` file:
```
VITE_API_URL=https://borreooo-farmguard-ai.hf.space
```

### 4. Run locally
```bash
npm run dev
```

Open `http://localhost:5173`

---

## API

All data is fetched from the live backend. Zero mock data.

| Function | Method | Endpoint |
|---|---|---|
| getCrops() | GET | `/crops` |
| predict() | POST | `/predict` |
| getHistory() | GET | `/history` |
| getStats() | GET | `/history/stats` |
| getTrends() | GET | `/history/trends` |

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic redeploy.

[![Deploy with Vercel](https://vercel.com/button)](https://farmguard-ai-frontend.vercel.app/)

---

## Related

- 🔧 **Backend repo:** [farmguard-ai](https://github.com/AryanBoro/farmguard-ai) — FastAPI + PyTorch EfficientNet-B4
- 🤗 **Live API:** [HuggingFace Space](https://huggingface.co/spaces/borreooo/farmguard-ai)
