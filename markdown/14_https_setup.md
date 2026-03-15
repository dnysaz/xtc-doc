# HTTPS Setup

No client code changes needed after setup. Just point your client at an `https://` URL.

## Option A — Caddy (Recommended)

Caddy automatically obtains and renews SSL certificates from Let's Encrypt.

```bash
sudo apt install caddy -y
```

Edit `/etc/caddy/Caddyfile`:

```
yourdomain.com {
    reverse_proxy localhost:8080
}
```

```bash
sudo systemctl reload caddy
```

## Option B — Nginx + Let's Encrypt

```bash
sudo apt install nginx certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

Edit your Nginx config:

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Connect Client to HTTPS Server

```bash
xtc connect @yourdomain.com
# Automatically uses https:// with default port 443
```