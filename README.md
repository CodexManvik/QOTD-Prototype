# QOTD - Question of the Day

A coding challenge platform with daily questions, code execution, and leaderboards.

## 🚀 Quick Start

```bash
# Backend
cd Server && npm install && npm run dev

# Frontend (new terminal)
cd Client && npm install && npm run dev
```

**Access (Local):** http://localhost:5173
**Access (Production):** https://imaginative-cat-production.up.railway.app/

---

## 🏗️ System Architecture Overview

The system follows a modern, decoupled **Monorepo** structure, designed for rapid development and scalable deployment.

### Components
1.  **Frontend (Client)**:
    -   **Tech Stack**: React 18, Vite, Tailwind CSS, GSAP (animations), CodeMirror (editor).
    -   **Role**: Handles user interaction, code editing, and API communication. Uses `Context API` for auth state management.
    -   **Deploy**: Static site served via Nginx/Node.js or CDN (Vercel/Netlify/Railway).

    ## ASSETS & CREDITS

Lottie animations created by talented designers:
- [Graphic Room](https://iconscout.com/contributors/graphic-room)
- [Danimotion](https://iconscout.com/contributors/danimotion)
- [Graphichup](https://iconscout.com/contributors/graphichup)
- [Nanoagency](https://iconscout.com/contributors/nanoagency)

2.  **Backend (Server)**:
    -   **Tech Stack**: Node.js, Express.js.
    -   **Role**: RESTful API server handling authentication, question delivery, and submission processing.
    -   **Security**: JWT for stateless authentication, Helmet for headers, CORS for cross-origin resource sharing.

3.  **Data Layer**:
    -   **Development**: File-based storage (JSON) for rapid prototyping and zero-setup local dev.
    -   **Production**: Abstracted Repository Pattern allows seamless switch to MongoDB without changing business logic.

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login/Register |
| GET | `/api/v1/qotd` | Today's question |
| POST | `/api/v1/run` | Run code (no save) |
| POST | `/api/v1/submissions` | Submit answer |
| GET | `/api/v1/leaderboard` | Daily leaderboard |
| GET | `/api/v1/solution/:id` | View solution (paid) |

---

## 🔌 Integration Approach

The integration between frontend and backend is designed to be **loosely coupled**:

-   **API Contract**: The backend exposes a strictly typed REST API (`/api/v1`). The frontend consumes these endpoints via a centralized `authApi.js` service, ensuring consistent error handling and token management.
-   **Environment Agnostic**: Configuration (API URL, Port, DB Type) is injected via environment variables (`VITE_API_URL`, `PORT`, `DB_TYPE`), making the app deployable anywhere (Local, Docker, Cloud) without code changes.
-   **Monorepo Strategy**: Both client and server reside in the same repository, simplifying version control and ensuring that frontend changes which depend on backend updates are committed together.

---

## 📈 Scalability Strategy

The architecture supports scaling from a prototype to a production-grade system:

| Phase | User Load | Architecture Strategy |
| :--- | :--- | :--- |
| **Phase 1 (Current)** | 1 - 1,000 | **Monolithic Node.js Service**: Single instance handles API and static file serving. Simple, fast, zero ops overhead. Data stored in JSON or local MongoDB. |
| **Phase 2** | 1,000 - 10,000 | **Horizontal Scaling**: Deploy multiple instances of the Node.js server behind a load balancer. Switch DB to MongoDB Atlas. Redis for session caching. |
| **Phase 3** | 10,000+ | **Microservices**: Split `Submission Service` (CPU intensive) from `Auth/User Service` (I/O intensive). Use exact same code, just broken into deployable units. |

---

## 💰 Cost Optimisation Reasoning

Every architectural decision was made to minimize cost while maximizing functionality:

-   **Hosting**: The monorepo structure allows deployment on PaaS free tiers (Railway/Render) which often support multi-service builds from a single repo.
-   **Database**: Using JSON file storage for the prototype eliminates the cost of a managed database instance (approx. $15-20/mo saved) while verifying the data schema.
-   **Stateless Backend**: The API is stateless (JWT), meaning we don't need expensive sticky sessions or large Redis clusters for session management.
-   **Frontend Serving**: The frontend is built to robust static files, which can be hosted for free on global CDNs, offloading traffic from the backend.

---

## 💾 Submission Storage & Evaluation Logic

### Storage Logic
Submissions are handled by the `SubmissionService` using a **Repository Pattern**:
1.  **Validation**: Incoming code is validated for length and forbidden keywords.
2.  **Persistence**: The service calls `SubmissionRepository.create()`. Currently, this writes to `submissions.json`. In production, this same method would write to a MongoDB `submissions` collection using Mongoose.
3.  **Association**: Submissions are linked to `userId` and `questionId`, allowing efficient retrieval of user history and leaderboard generation.

### Evaluation Logic (Mock)
For the prototype, code execution is simulated to ensure security and speed:
-   **Mock Runner**: The `SubmissionService` accepts the code but generates a deterministic "Pass/Fail" result based on simple heuristics (e.g., checking for specific function names) rather than executing arbitrary code.
-   **Security**: This prevents Remote Code Execution (RCE) vulnerabilities during the initial public demo phase.

---

## 🔮 Improvements Planned (With More Time)

1.  **Real Code Execution Sandbox**:
    -   Integrate **Judge0** or **Piston** API to safely execute user code in isolated Docker containers.
    -   Capture `stdout`/`stderr` for real-time feedback.

2.  **Enhanced Database**:
    -   Migrate from JSON to **PostgreSQL** or **MongoDB**.
    -   Implement strict schema validation with Zod/Mongoose.

3.  **Real-Time Features**:
    -   **WebSockets (Socket.io)**: Live updating leaderboards and "User X just solved Question Y" notifications.

4.  **Testing & CI/CD**:
    -   Add Unit Tests (Jest) for Services.
    -   Add E2E Tests (Cypress/Playwright) for the submission flow.
    -   Automate deployment pipeline on GitHub Actions.
