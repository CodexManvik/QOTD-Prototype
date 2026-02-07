# TechLearn QOTD API

A high-performance, scalable backend for the "Question of the Day" platform, built with Node.js, Express, and MongoDB.

## Architecture

The system adheres to a strict **Controller-Service-Repository** architecture to ensure separation of concerns, maintainability, and testability.

1.  **Controller Layer**: Handles HTTP requests, input validation (Zod), and response formatting. It delegates business logic to the Service layer.
2.  **Service Layer**: Contains core business logic, including submission evaluation, leaderboard aggregation, and user statistics. It interacts with the Repository layer for data access.
3.  **Repository Layer**: Abstracts the data access logic. This allows the application to switch between different data sources (e.g., MongoDB, PostgreSQL, In-Memory JSON) without modifying the business logic.

## Integration Approach

### Mock Execution Engine
To optimize costs while providing a realistic user experience, the system implements a **Mock Execution Engine** for code submissions. Instead of provisioning expensive sandboxed environments (e.g., Docker containers per submission), the system:
1.  Accepts user code and language.
2.  Parses the code to identify structural patterns relevant to the problem's expected solution.
3.  Simulates execution against a set of predefined test cases stored in the `Question` model.
4.  Returns detailed, structured results (`status`, `output`, `executionTime`, `memoryUsage`, `testResults`) that mimic a real judgment system (e.g., Judge0).

This approach allows for immediate feedback and comprehensive frontend testing without the operational overhead and security risks of arbitrary code execution.

## Scalability Strategy

1.  **Stateless Architecture**: The API is fully stateless, allowing for horizontal scaling across multiple instances or containers.
2.  **Database Indexing**: MongoDB collections are indexed on critical fields (`userId`, `questionId`, `difficulty`, `status`) to ensure sub-millisecond query performance for leaderboards and user stats.
3.  **Aggregation Pipelines**: Complex data retrieval, such as leaderboard generation, is offloaded to the database via optimized Aggregation Pipelines, reducing application memory footprint.

## Cost Optimization

*   **Mock Execution**: Eliminates compute costs associated with running untrusted user code.
*   **Efficient Data Models**: Normalized schema design reduces storage redundancy.
*   **Rate Limiting**: Implemented to prevent abuse and manage resource consumption.

## Prerequisites

*   Node.js v18+
*   MongoDB v6+ (or compatible Docker container)
*   Docker & Docker Compose (optional)

## Environment Setup

Create a `.env` file in the root directory:

```bash
PORT=3000
DB_TYPE=mongo
MONGODB_URI=mongodb://localhost:27017/techlearn_qotd
```

## Installation & Running

### Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Seed the database (Initial Setup):
    ```bash
    npm run seed
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

### Docker Deployment

1.  Build the image:
    ```bash
    docker build -t techlearn-api .
    ```

2.  Run the container:
    ```bash
    docker run -p 3000:3000 --env-file .env techlearn-api
    ```

## API Documentation

### Key Endpoints

*   `GET /api/v1/qotd` - Fetch the daily challenge.
*   `POST /api/v1/run` - Dry-run execution of code against test cases.
*   `POST /api/v1/submissions` - Submit a solution for scoring.
*   `GET /api/v1/leaderboard` - Retrieve the global leaderboard.
*   `GET /api/v1/stats/:userId` - Get user-specific statistics.
