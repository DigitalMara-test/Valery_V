# 🧪 Log API Test Project

Fullstack test project with backend in **TypeScript + Express + PostgreSQL**, and frontend in **React + Vite + TypeScript**.
Includes Docker support and basic testing with Jest.

---

## 📦 Project Structure

```
project-root/
├── backend/         # Express + PostgreSQL API
├── frontend/        # React + Vite frontend
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start (Docker)

Make sure you have Docker & Docker Compose installed, then run:

```bash
docker-compose up --build
```

* Backend will be available at: [http://localhost:3000](http://localhost:3000)
* Frontend will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🛠 Backend (manual setup)

### 1. Install dependencies

```bash
cd backend
yarn install
```

### 2. Create PostgreSQL DB and .env file

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/logdb
PORT=3000
```

> You can use Docker for PostgreSQL, or install it locally.

### 3. Run backend

```bash
yarn dev
```

### 4. Run tests

```bash
yarn test
```

---

## 🎨 Frontend (manual setup)

### 1. Install dependencies

```bash
cd frontend
yarn install
```

### 2. Run dev server

```bash
yarn dev
```

> The frontend uses Vite dev proxy to communicate with backend on port `3000`.

---

## 🧪 Testing

The backend has basic tests for:

* `GET /log` — fetch logs
* `POST /log` — insert log

Run tests:

```bash
cd backend
yarn test
```

---

## 📋 API Endpoints

### `GET /log`

Returns all log entries.

### `POST /log`

Accepts JSON payload and saves to DB.

Body example:

```json
{
  "example": "value"
}
```

---

## 🔒 Notes

* All columns in the `log` table are `NOT NULL`
* `inserted_at` is auto-filled with `now()`
* Table is auto-created at backend startup if not exists

---

## 🧑‍💻 Author

Valery V. — test task for DigitalMara
