#!/usr/bin/env bash
# -e: exit immediately if any command fails
# -u: treat unset variables as errors
# -o pipefail: catch errors in piped commands (not just the last one)
set -euo pipefail

# ============================================================
#  VPS Deployment Script
#  Run this ONCE on your VPS after cloning the repo and filling .env
#
#  What it does:
#    1. Configures nginx with your real domain name
#    2. Starts all services (frontend, backend, db, nginx) with HTTP only
#    3. Uses certbot to get free SSL certificates from Let's Encrypt
#    4. Switches nginx to HTTPS mode and restarts
#
#  Prerequisites:
#    - Docker & Docker Compose installed on the VPS
#    - .env file filled with your configuration
#    - DNS A records pointing your domain + api.domain to this server
#
#  Example:
#    ./deploy.sh --domain mysite.com --email admin@mysite.com
# ============================================================

# -- CLI argument defaults --
DOMAIN=""
EMAIL=""

# Show usage instructions and exit if arguments are wrong
print_usage() {
  echo "Usage: ./deploy.sh --domain yourdomain.com --email you@email.com"
  exit 1
}

# Parse command-line arguments: --domain and --email are both required
while [[ $# -gt 0 ]]; do
  case $1 in
    --domain) DOMAIN="$2"; shift 2 ;;  # consume flag + value
    --email)  EMAIL="$2"; shift 2 ;;   # consume flag + value
    *) print_usage ;;                   # unknown flag → show help
  esac
done

# Bail out if either argument was not provided
[[ -z "$DOMAIN" || -z "$EMAIL" ]] && print_usage

echo "==> Deploying for domain: $DOMAIN"
echo "==> Certbot email: $EMAIL"

# ── STEP 1: Replace placeholder domain in nginx configs ─────
# The template configs ship with "YOURDOMAIN.COM" as a placeholder.
# This replaces it with the real domain in both the SSL and non-SSL configs.
echo "==> Configuring nginx for $DOMAIN ..."
sed -i "s/YOURDOMAIN\.COM/$DOMAIN/g" nginx/conf.d/default.conf
sed -i "s/YOURDOMAIN\.COM/$DOMAIN/g" nginx/conf.d/default.conf.nossl

# ── STEP 2: Start with HTTP-only nginx (for certbot challenge) ──
# Certbot needs to serve a file over HTTP to prove we own the domain.
# So we temporarily use the non-SSL config while obtaining the cert.
echo "==> Starting services with HTTP-only nginx ..."
cp nginx/conf.d/default.conf nginx/conf.d/default.conf.ssl-backup   # save the SSL config for later
cp nginx/conf.d/default.conf.nossl nginx/conf.d/default.conf         # activate HTTP-only config

# Build and start all containers (frontend, backend, postgres, nginx, etc.)
docker compose -f docker-compose.vps.yml up -d --build

# Give containers time to start and become healthy
echo "==> Waiting for services to be ready ..."
sleep 10

# ── STEP 3: Obtain SSL certificates from Let's Encrypt ──────
# Certbot uses the "webroot" method: it places a challenge file in
# /var/www/certbot, and Let's Encrypt fetches it via HTTP to verify
# domain ownership. Then it issues the certificate.
echo "==> Requesting SSL certificate from Let's Encrypt ..."
docker compose -f docker-compose.vps.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "api.$DOMAIN"
# Certificates are stored in a Docker volume mounted at /etc/letsencrypt

# ── STEP 4: Switch to full SSL nginx config ──────────────────
# Now that we have certs, restore the SSL-enabled config so nginx
# can serve HTTPS and redirect HTTP → HTTPS.
echo "==> Switching nginx to SSL mode ..."
cp nginx/conf.d/default.conf.ssl-backup nginx/conf.d/default.conf

# ── STEP 5: Restart nginx to pick up the new certs ───────────
# Nginx needs a restart to load the SSL certificates and the new config.
docker compose -f docker-compose.vps.yml restart nginx

echo ""
echo "============================================"
echo "  Deployment complete!"
echo "  Frontend: https://$DOMAIN"
echo "  Backend:  https://api.$DOMAIN"
echo "============================================"
echo ""
echo "To redeploy after code changes:"
echo "  git pull && docker compose -f docker-compose.vps.yml up -d --build"
echo ""
echo "To renew SSL certificates manually:"
echo "  docker compose -f docker-compose.vps.yml run --rm certbot renew"
echo "  docker compose -f docker-compose.vps.yml restart nginx"
