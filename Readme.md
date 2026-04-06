# Hosting Frontend + Backend

Full-stack project: **Next.js** frontend + **Express/TypeScript** backend + **MySQL** database.

---

## Local Development

```bash
# 1. Start MySQL
docker compose up -d

# 2. Copy and fill env
cp .env.example .env

# 3. Start backend
cd hosting-backend && npm install && npm run dev

# 4. Start frontend (in another terminal)
cd hosting-website && npm install && npm run dev
```

---

## VPS Deployment

### Prerequisites

- A VPS (Ubuntu 22.04+ recommended) with at least **1 GB RAM**
- A domain name with DNS pointing to your VPS IP:
  - `hostera24.com` -> VPS IP (A record)
  - `api.hostera24.com` -> VPS IP (A record)
- **Docker** and **Docker Compose** installed on the VPS

### Step 1 — Install Docker on VPS

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Install Docker
curl -fsSL https://get.docker.com | sh

# Verify
docker --version
docker compose version
```

### Step 2 — Clone and configure

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Create .env from template
cp .env.example .env
nano .env
```

Edit `.env` with your **production values**:

```env
DB_PASSWORD=your_strong_db_password
DB_NAME=hosting_prod
ADMIN_PASSWORD=your_strong_admin_password

SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_USER=you@hostera24.com
SMTP_PASS=your_email_password
SMTP_SECURE=true
SMTP_FROM=hello@hostera24.com
ORDER_NOTIFY_EMAIL=hello@hostera24.com

NEXT_PUBLIC_BACKEND_URL=https://api.hostera24.com
NEXT_PUBLIC_APP_URL=https://hostera24.com
NEXT_PUBLIC_SITE_URL=https://hostera24.com
NEXT_PUBLIC_APP_MODE=production

STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_live_xxx
STRIPE_PRICE_HOSTING_9_99_MONTHLY=price_xxx
STRIPE_PRICE_FULL_STACK_19_99_MONTHLY=price_xxx
```

### Step 3 — Deploy with SSL

```bash
chmod +x deploy.sh
./deploy.sh --domain hostera24.com --email you@hostera24.com
```

This script will:

1. Configure nginx for your domain
2. Build and start all containers (DB, backend, frontend, nginx)
3. Obtain a free SSL certificate from Let's Encrypt
4. Switch to HTTPS and restart

### Step 4 — Verify

- **Frontend:** `https://hostera24.com`
- **Backend API:** `https://api.hostera24.com`

---

## Post-Deployment

### Redeploy after code changes

```bash
git pull
docker compose -f docker-compose.vps.yml up -d --build
```

### View logs

```bash
docker compose -f docker-compose.vps.yml logs -f           # all services
docker compose -f docker-compose.vps.yml logs -f backend    # backend only
docker compose -f docker-compose.vps.yml logs -f website    # frontend only
```

### Renew SSL (auto-renews, but manual if needed)

```bash
docker compose -f docker-compose.vps.yml run --rm certbot renew
docker compose -f docker-compose.vps.yml restart nginx
```

### Access MySQL

```bash
docker exec -it hosting-db mysql -uroot -p
```

---

## Architecture (VPS)

```
Internet
  │
  ├── :80  ──→ nginx (redirect to HTTPS)
  └── :443 ──→ nginx
                ├── hostera24.com      → website (Next.js :4001)
                └── api.hostera24.com  → backend (Express :4000)
                                              └── db (MySQL :3306)
```

All services communicate over an internal Docker network. Only ports 80 and 443 are exposed to the internet.
#test deploy
#test deploy2
#test deploy3

---

## Q&A

### What is a website with backend and db?

A website with backend and database is a full-stack application:

- **Frontend (website UI):** what users see and interact with in the browser.
- **Backend (server logic):** handles requests, business rules, authentication, payments, and APIs.
- **Database (db):** stores persistent data like users, products, orders, and settings.

In this project:

- Frontend = **Next.js** (`hosting-website`)
- Backend = **Express + TypeScript** (`hosting-backend`)
- DB = **MySQL** (`db` service in Docker)
