# How It Works

XtermChat has two parts: a **server** you deploy on a VPS, and a **client** your team installs. They communicate over a REST API with JSON payloads.

## Architecture

```
┌──────────────────────────────────────────────┐
│           YOUR VPS (:8080)                   │
│  xtc-server  Python + Flask + SQLite         │
│  ┌─────────┐ ┌──────────┐ ┌───────┐ ┌─────┐  │
│  │  rooms  │ │ messages │ │ users │ │bots │  │
│  └─────────┘ └──────────┘ └───────┘ └─────┘  │
│           xtc.db  (single file)              │
│           bot_runner.py (background)         │
└─────────────────┬────────────────────────────┘
                  │  REST API  HTTP / HTTPS
        ┌─────────┼──────────┐
        │         │          │
 ┌──────▼──┐ ┌────▼────┐ ┌───▼──────┐
 │ CLI Mac │ │Web :5000│ │CLI Linux │
 │ xtc-cli │ │  Admin  │ │ xtc-cli  │
 └─────────┘ └─────────┘ └──────────┘
```

## Components

**Backend** — Python + Flask. SQLite3 auto-created on first run. No external database needed. Runs on 2 pip packages.

**CLI Client** — Built with `prompt_toolkit`. Full TUI with sidebar, mention highlight, link detection, emoji, and copy-to-clipboard.

**Web Admin** — Flask serves HTML at `:5000`. Full admin panel: dashboard, rooms, chat with link preview, and bot management.

**Bot System** — Background process on VPS. Monitors CPU, RAM, disk, uptime, SSL, logs, and more. Alerts sent to any room via REST API.

## Auth

- **CLI** — uses machine hardware UUID (device-bound, automatic)
- **Web** — uses a 5-digit PIN you choose at login
- Both share the same rooms and messages in real time