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

## 6) Ports and firewall

- Docker publishes **website** on `127.0.0.1:4001` and **backend** on `127.0.0.1:4000` (only nginx on the host should talk to them).
- Open **80** and **443** for the public (HTTP/HTTPS). Do **not** expose 4000/4001 to the internet if nginx terminates TLS.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 7) HTTPS — nginx on the host + Let’s Encrypt

Install on the VPS (Debian/Ubuntu):

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

Copy the example site config from the repo, edit `YOURDOMAIN.COM`, enable it:

```bash
# from your app folder, after copying the example to the server:
sudo cp nginx/host-nginx-vps.conf.example /etc/nginx/sites-available/app.conf
sudo sed -i 's/YOURDOMAIN.COM/strelements.com/g' /etc/nginx/sites-available/app.conf   # adjust domain
sudo ln -sf /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Start Docker stack, then check **http://yourdomain.com** and **http://api.yourdomain.com** (still HTTP).

Then obtain certificates (Certbot will add HTTPS to the same `server` blocks):

```bash
sudo certbot --nginx -d strelements.com -d api.strelements.com
```

Use your real domain names and email when Certbot asks. Renewals are usually installed as a **cron**/`systemd` timer automatically.

`.env` on the server should use HTTPS URLs, then rebuild the website image:

```env
NEXT_PUBLIC_APP_URL=https://strelements.com
NEXT_PUBLIC_BACKEND_URL=https://api.strelements.com
```

```bash
docker compose -f docker-compose.vps.yml up -d --build website
```

Reference config: `nginx/host-nginx-vps.conf.example`.
