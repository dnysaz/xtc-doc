# Web Admin Panel

XtermChat includes a full browser-based admin panel. Start it with:

```bash
xtc start:web
# URL: http://localhost:5000
```

Enter your server IP, port, username, and a 5-digit PIN. After login you get a full admin dashboard.

## Pages

**◈ Dashboard** — Server status, room count, active bots, quick actions, recent rooms and bots at a glance.

**⊞ Rooms** — Create public or private rooms, delete rooms, jump directly into chat.

**◎ Chat** — Real-time bubble chat with grouped messages, link preview with OG image/title/description, password room support.

**🤖 Bots** — Create, start, stop, and delete bots. Shows all bots including those created from the CLI.

## CLI vs Web

| | CLI | Web |
|---|---|---|
| PIN type | Hardware UUID (auto) | 5-digit (user-chosen) |
| Device-bound | ✅ Yes | ❌ No |
| Create bots | ✅ Yes | ✅ Yes |
| Mobile support | ❌ No | ✅ Yes |
| Installation | Required | None (browser only) |

## Link Preview

The web chat automatically fetches Open Graph metadata for any URL shared in a message:

- **OG image** — full-width cover image
- **Title** — page title (max 2 lines)
- **Description** — page description (max 2 lines)
- **Favicon + domain** — shown at the bottom

Previews are cached per session so the same URL is only fetched once.

## HTTP Warning

When connecting to a plain HTTP server (no domain, no HTTPS), the login page shows a warning banner. The connection still works — the warning is informational only. For production use, set up HTTPS with Caddy or Nginx.