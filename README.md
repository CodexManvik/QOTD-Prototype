# Question of the Day (QOTD) API

A production-grade, scalable REST API built with Node.js, Express, and MongoDB.

## Architecture
This project follows a strict **Service-Repository Pattern** to ensure scalability and maintainability:
- **Controller Layer**: Handles HTTP requests/responses and input validation.
- **Service Layer**: Contains business logic (Evaluation, Stats processing, Date logic).
- **Repository Layer**: Abducts data access. Supports switching between **JSON** (Local) and **MongoDB** (Production) via configuration.
- **Scalability**:
    - **Stateless API**: The application server is stateless, allowing for horizontal scaling behind a Load Balancer.
    - **Database Indexing**: Compound indexes (`score/timestamp` and `questionId/status`) allow for O(log N) retrieval of leaderboards and stats.

## Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose) with JSON fallback
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Logging**: Morgan

## API Documentation

### 1. Get Daily Question
Retrieves the programming challenge for the current date (DD-MM-YYYY).

- **Endpoint**: `GET /api/v1/qotd`
- **Response**:
  ```json
  {
    "id": "qotd-001",
    "date": "31-01-2026",
    "title": "Two Sum",
    "difficulty": "Easy",
    "problemStatement": "Given an array...",
    "hints": ["Try using a hash map...", "Time complexity O(n)"]
  }
  ```

### 2. Submit Solution
Evaluates a user submission.

- **Endpoint**: `POST /api/v1/submissions`
- **Body**:
  ```json
  {
    "questionId": "qotd-001",
    "userId": "user_123",
    "code": "def solve(): return [0,1]",
    "language": "python",
    "userOutput": "0,1"
  }
  ```
- **Response**:
  ```json
  {
    "status": "correct",
    "message": "Test cases passed!"
  }
  ```

### 3. Get Leaderboard
Returns the top 10 users sorted by Score (Descending) and Timestamp (Ascending).

- **Endpoint**: `GET /api/v1/leaderboard`
- **Response**:
  ```json
  [
    { "rank": 1, "username": "algo_king", "score": 150, "time": "10:48:48" },
    { "rank": 2, "username": "python_guru", "score": 145, "time": "10:47:48" }
  ]
  ```

### 4. Get Statistics
Returns submission statistics for a question.

- **Endpoint**: `GET /api/v1/stats/:questionId`
- **Response**:
  ```json
  {
    "questionId": "qotd-001",
    "totalAttempts": 100,
    "successCount": 97,
    "successRate": "97.00%"
  }
  ```

## Setup Instructions

### Local Development
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Setup**:
    Create a `.env` file based on `.env.example`.
    ```ini
    DB_TYPE=mongodb
    MONGODB_URI=mongodb://localhost:27017/qotd
    ```
3.  **Seed Database**:
    ```bash
    node scripts/seed-leaderboard.js
    ```
4.  **Run Server**:
    ```bash
    npm start
    ```
5.  **Browser Interface**:
    Open [http://localhost:3000](http://localhost:3000) to view the Question and submit answers via the UI.

### Deployment (Railway/Render)
1.  Push the repository to GitHub.
2.  Connect the repository to your hosting provider.
3.  Add a MongoDB service (e.g., Railway MongoDB).
4.  Set the Environment Variables:
    - `DB_TYPE`: `mongodb`
    - `MONGODB_URI`: `[Your Connection String]`
    - `NODE_ENV`: `production`

## Future Improvements
- **Authentication**: Implement JWT (JSON Web Tokens) for secure user sessions.
- **Caching**: Integrate Redis to cache the Leaderboard and QOTD responses for higher throughput.
- **Dockerization**: Create a Dockerfile and docker-compose.yml for containerized deployment.
- **Code Execution**: Integrate a secure sandbox (e.g., Judge0) to safely execute user code instead of mock evaluation.
