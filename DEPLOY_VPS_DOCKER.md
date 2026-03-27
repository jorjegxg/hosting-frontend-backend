# VPS Docker deploy

## 1) File system on the VPS

Create this structure:

```
/opt/hosting-app/
  docker-compose.vps.yml
  .env
  hosting-backend/
  hosting-website/
```

## 2) Get files on VPS

Option A (recommended): clone with git

```bash
cd /opt
git clone <your-repo-url> hosting-app
cd hosting-app
```

Option B: upload from your local machine (PowerShell)

```powershell
scp -r "D:\SERIOUS PROJECTS\hosting-frontend-backend\*" root@YOUR_SERVER_IP:/opt/hosting-app/
```

## 3) Prepare environment

```bash
cd /opt/hosting-app
cp .env.example .env
nano .env
```

Set real values for DB and SMTP.  
If website and backend are on same VPS, `NEXT_PUBLIC_BACKEND_URL` can be:

```
http://YOUR_SERVER_IP:4000
```

## 4) Run with Docker

```bash
cd /opt/hosting-app
docker compose -f docker-compose.vps.yml up -d --build
docker compose -f docker-compose.vps.yml ps
```

## 5) Useful commands

```bash
docker compose -f docker-compose.vps.yml logs -f
docker compose -f docker-compose.vps.yml restart
docker compose -f docker-compose.vps.yml down
```

Uploaded ZIP files are stored in a Docker volume mounted at `/app/uploads` in the backend container, so they persist across restarts.

## 6) Ports to open

- `3000` -> Next.js website
- `4000` -> backend API

For production, put Nginx/Caddy in front (80/443) and route:
- `/` -> `website:3000`
- `/api` -> `backend:4000`
