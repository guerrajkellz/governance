# Governance Architecture Cost ‑  Demo

A full-stack reference implementation demonstrating how users can understand and visualize their journey to , guided by clear governance rules through a Node.js Express backend and a React + Vite frontend.

---

## 📁 Project layout

governance/
├── .prettierrc.json # Shared Prettier config
├── eslint.config.js # Unified ESLint config
├── package.json # Root scripts & dependencies
│
├── backend/ # Node.js Express REST API
│ ├── server.js
│ ├── config/ # Environment & runtime config
│ ├── auth/ # OIDC setup & middleware
│ ├── api/
│ │ └── productCatalog/
│ │ ├── data/ # Fetch & group catalog data
│ │ └── routes/ # API endpoints
│ ├── apiTokens/ # Token helpers for APIs
│ ├── utils/ # Helper utilities
│ └── mock/ # JSON mocks for local dev
│
└── frontend/ # React + Vite client app
├── index.html
├── src/
│ ├── api/ # API integration
│ ├── auth/ # Auth context & hooks
│ ├── components/ # UI components
│ ├── pages/ # Application pages
│ ├── assets/ # Static images
│ └── styles/ # Theme and styling
└── vite.config.js


---


---

## 🔑 Environment Variables

Copy the example environment file and configure it:

```bash

Fill in the .env file with appropriate values:

| Variable       | Example Value                                                        | Purpose                                  |
| -------------- | -------------------------------------------------------------------- | ---------------------------------------- |
| NODE\_ENV      | development                                                          | Node runtime mode (development/prod)     |
| USE\_MOCK      | true                                                                 | `true`: use mock data, `false`: live API |
| AUTH\_ENABLED  | false                                                                | Enable authentication middleware         |
| PORT           | 3000                                                                 | Port for backend server                  |
| COOKIE\_SECRET | changeme-dev-secret                                                  | Secret for signing cookies               |
| TOKEN\_URL     | [https://auth.server/oauth2/token](https://auth.server/oauth2/token) | URL for obtaining external API token     |
| BASE\_API\_URL | [https://catalog.server/endpoint](https://catalog.server/endpoint)   | Product catalog API endpoint             |
| CLIENT\_ID     | your-client-id                                                       | API client ID                            |
| USERNAME       | your-username                                                        | API username/service account             |
| PASSWORD       | your-password                                                        | API password                             |
| RESOURCE       | (optional)                                                           | API resource identifier                  |
| GRANT\_TYPE    | password                                                             | OAuth grant type                         |
| TRACE\_ID      | local-trace                                                          | API tracing ID (dev only)                |
| CHANNEL\_TYPE  | local-channel                                                        | API channel type (dev only)              |
| REQUEST\_COUNT | 100                                                                  | Pagination size for API requests         |


| Variable             | Example Value                                                                                | Purpose                  |
| -------------------- | -------------------------------------------------------------------------------------------- | ------------------------ |
| OIDC\_ISSUER         | [https://id.example.com](https://id.example.com)                                             | OIDC issuer URL          |
| OIDC\_AUDIENCE       | api://catalog                                                                                | OIDC audience            |
| OIDC\_CLIENT\_ID     | example-spa                                                                                  | OIDC client ID           |
| OIDC\_CLIENT\_SECRET | (public SPA - leave empty)                                                                   | OIDC client secret       |
| OIDC\_SCOPE          | openid profile email                                                                         | OIDC scope               |
| OIDC\_REDIRECT\_URI  | [http://localhost:3000/oidc/cb](http://localhost:3000/oidc/cb)                               | Callback URL             |
| OIDC\_JWKS\_URI      | [https://id.example.com/.well-known/jwks.json](https://id.example.com/.well-known/jwks.json) | JWKS URL                 |
| OIDC\_AUTHORIZE\_URL | [https://id.example.com/authorize](https://id.example.com/authorize)                         | Authorization URL        |
| OIDC\_TOKEN\_URL     | [https://id.example.com/oauth/token](https://id.example.com/oauth/token)                     | Token endpoint           |
| OIDC\_RESOURCE       | (optional)                                                                                   | OIDC resource identifier |

---

```

## 🚀 Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/governance.git
cd governance
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Run Applications

Run these commands in separate terminals:

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev

```

Your apps should now be running at http://localhost:3000/


---

## ✅ Before Committing

Make sure you're in the **root directory** (`governance/`) of your project before running these commands.

### Install Development Dependencies (ESLint & Prettier)

Before you run linting and formatting commands, ensure ESLint and Prettier dependencies are installed by running:

```bash
npm install
```

This will install all necessary dependencies defined in your package.json, including ESLint and Prettier.

#### Lint and Auto-fix

```bash
npm run lint
```

#### Format Code

```bash
npm run format
```

#### Recommended Commit Workflow

```bash
npm run lint && npm run format
```

After successful completion, you're ready to commit your changes!





