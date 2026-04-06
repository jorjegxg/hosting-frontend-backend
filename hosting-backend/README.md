# Hosting Backend (Node.js + TypeScript)

## Setup

1. Start MySQL:

```bash
docker run -d --name hosting-db -e MYSQL_ROOT_PASSWORD=mysecretpassword -e MYSQL_DATABASE=myappdb -p 3308: mysql:latest
```

2. Install dependencies:

```bash
npm install
```

3. Create env file:

```bash
copy .env.example .env
```

4. Run in development:

```bash
npm run dev
```

## Endpoints

- `GET /health` - basic API health
- `GET /db-health` - checks MySQL connectivity and returns server time
