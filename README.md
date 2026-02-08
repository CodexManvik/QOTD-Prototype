# QOTD - Question of the Day

A coding challenge platform with daily questions, code execution, and leaderboards.

## 🚀 Quick Start

```bash
# Backend
cd Server && npm install && npm run dev

# Frontend (new terminal)
cd Client && npm install && npm run dev
```

**Access:** http://localhost:5173

---

## ✨ Features

- Daily coding questions (Easy/Medium/Hard)
- Code editor with Run & Submit
- User tiers: Free (2 runs), Paid (4 runs), Admin (unlimited)
- Daily leaderboard (paid users only)
- Solution access for paid users

---

## 🏗️ Architecture

```
Client (React + Vite)  →  Server (Express)  →  JSON Files
     :5173                    :3000              /data/*.json
```

| Layer | Tech | Purpose |
|-------|------|---------|
| Frontend | React, Vite | UI, Auth context |
| Backend | Express, JWT | APIs, Auth |
| Storage | JSON files | Questions, Users, Submissions |

---

## � API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login/Register |
| GET | `/api/v1/qotd` | Today's question |
| POST | `/api/v1/run` | Run code (no save) |
| POST | `/api/v1/submissions` | Submit answer |
| GET | `/api/v1/leaderboard` | Daily leaderboard |
| GET | `/api/v1/solution/:id` | View solution (paid) |

---

## 📈 Scalability

| Users | Storage | Notes |
|-------|---------|-------|
| 1-1K | JSON files | Current setup |
| 1K-10K | MongoDB | Change `DB_TYPE=mongodb` |
| 10K+ | MongoDB + Redis | Add caching |

---

## 💰 Cost

| Service | Cost |
|---------|------|
| Frontend (Vercel) | Free |
| Backend (Render) | Free |
| Storage (JSON) | Free |
| **Total** | **$0/month** |

---

## � Future Improvements

- Real code execution (Judge0/Piston API)
- Payment gateway integration
- WebSocket for live leaderboard
- OAuth (Google/GitHub login)
- Mobile app

---

## 📁 Structure

```
QOTD-Prototype/
├── Client/          # React frontend
├── Server/          # Express backend
│   └── data/        # JSON storage
│       ├── questions.json
│       ├── users.json
│       └── submissions.json
└── README.md
```

---

Built for TechLearn Solutions Round 2
