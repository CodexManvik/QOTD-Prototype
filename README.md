# QOTD - Question of the Day

A production-ready Question of the Day module for TechLearn Solutions.

## 🚀 Live Demo
- **Frontend**: [Deployed URL]
- **Backend**: [Deployed URL]

---

## ✨ Features

| Feature | Free Users | Paid Users | Admin |
|---------|------------|------------|-------|
| View QOTD | ✅ | ✅ | ✅ |
| Code Runs | 2/day | 4/day | Unlimited |
| Submissions | 1/day | 1/day | Unlimited |
| Leaderboard Visibility | ❌ | ✅ | ✅ |
| View Solutions | ❌ | ✅ | ✅ |

**Core Functionality:**
- Daily QOTD with difficulty levels (Easy/Medium/Hard)
- Online code editor (Python, Java, C++, JavaScript)
- Difficulty-based leaderboards
- Submission tracking & evaluation

---

## 🏗️ Architecture

```
Client (React + Vite)          Server (Node.js + Express)
├── components/                ├── controllers/
├── pages/                     ├── services/
└── services/                  ├── models/
                               └── routes/
```

**Data Flow:** Frontend → REST API → Service Layer → Data Layer (JSON/MongoDB)

---

## 🚀 Getting Started

```bash
# Clone & install
git clone https://github.com/CodexManvik/QOTD-Prototype.git
cd QOTD-Prototype

# Backend (Terminal 1)
cd Server && npm install && npm run dev

# Frontend (Terminal 2)
cd Client && npm install && npm run dev
```

**URLs:** Frontend → http://localhost:5173 | Backend → http://localhost:3000

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/qotd` | GET | Get today's question |
| `/api/run` | POST | Execute code |
| `/api/submissions` | POST | Submit answer |
| `/api/leaderboard` | GET | Get leaderboard |
| `/api/stats/me` | GET | Get user stats |

---

## � Scalability & Cost

- **Stateless servers** - Horizontally scalable
- **JWT auth** - No session storage
- **Daily cache** - QOTD cached in memory
- **Free tier hosting** - Vercel + Render = $0/month

---

## 🔮 Future Improvements
- WebSocket for real-time leaderboard
- OAuth login (Google/GitHub)
- AI-powered hints
- Mobile app

---

## 👥 Team
Built for TechLearn Solutions Round 2 Technical Task
