# CI/CD Pipeline Demo

A sample Node.js/Express application that clearly demonstrates **Docker** containerization and **CI/CD deployment workflows** using GitHub Actions.

---

## 📁 Project Structure

```
.
├── src/
│   ├── app.js              # Express application (routes & middleware)
│   ├── index.js            # Entry point — starts the HTTP server
│   └── __tests__/
│       └── app.test.js     # Unit / integration tests (Jest + Supertest)
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI workflow: lint → test → build image
│       └── cd.yml          # CD workflow: build, push & deploy on release
├── Dockerfile              # Multi-stage Docker build
├── .dockerignore           # Files excluded from the Docker build context
├── docker-compose.yml      # Local development / demo stack
├── .eslintrc.json          # ESLint configuration
└── package.json
```

---

## 🚀 Quick Start

### Run locally (Node.js)

```bash
npm install
npm start
# Server listening on http://localhost:3000
```

### Run with Docker Compose

```bash
docker compose up --build
# App available at http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Path            | Description                        |
|--------|-----------------|------------------------------------|
| GET    | `/`             | Welcome message and app version    |
| GET    | `/health`       | Health check (used by Docker/LBs)  |
| GET    | `/greet/:name`  | Returns `Hello, <name>!`           |

---

## 🧪 Testing & Linting

```bash
npm test        # Run Jest tests with coverage
npm run lint    # Run ESLint
```

---

## 🐳 Docker

### Build the image manually

```bash
docker build -t ci-cd-pipeline-demo:latest .
```

### Run the container

```bash
docker run -p 3000:3000 ci-cd-pipeline-demo:latest
```

---

## ⚙️ CI/CD Workflows

### Continuous Integration (`.github/workflows/ci.yml`)

Triggered on **every push** and **pull requests** targeting `main`.

| Step | Description |
|------|-------------|
| **Lint** | Runs ESLint against `src/` |
| **Test** | Runs Jest test suite and uploads coverage artifact |
| **Build** | Builds the Docker image (no push) to validate the `Dockerfile` |

### Continuous Deployment (`.github/workflows/cd.yml`)

Triggered when a **GitHub Release is published**.

| Step | Description |
|------|-------------|
| **Test** | Re-runs the test suite as a safety gate |
| **Build & Push** | Builds a production Docker image and pushes it to **GitHub Container Registry** (`ghcr.io`) with semantic version tags |
| **Deploy** | Placeholder step — replace with your actual deployment commands (e.g. SSH + `docker compose pull && docker compose up -d`) |

### Image tags produced on release

| Tag pattern | Example |
|-------------|---------|
| Semantic version | `ghcr.io/<owner>/<repo>:1.2.3` |
| Major.minor | `ghcr.io/<owner>/<repo>:1.2` |
| Git SHA | `ghcr.io/<owner>/<repo>:sha-abc1234` |

---

## 🔑 Required Secrets

| Secret | Used in | Description |
|--------|---------|-------------|
| `GITHUB_TOKEN` | CD workflow | Automatically provided by GitHub Actions — used to push to GHCR |

No additional secrets are needed for the CI workflow.
