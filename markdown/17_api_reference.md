# API Reference

Base URL: `http://YOUR_SERVER:8080` — all endpoints return JSON.

## Health

**GET** `/`

```json
{"status": "online", "service": "XtermChat Gateway", "version": "1.1"}
```

## Identity

**POST** `/login` — Register or verify identity

```json
{"user": "ketut", "pin": "12345"}
```

Responses: `200` Welcome back · `201` New identity registered · `403` PIN mismatch

## Rooms

**GET** `/rooms` — List all rooms (no sensitive data)

**POST** `/create-room`

```json
{"room": "general", "user": "ketut", "password": "", "description": "...", "created_at": 1741234567, "pin": "UUID"}
```

**POST** `/verify-room`

```json
{"room": "general", "password": ""}
```

**POST** `/delete-room`

```json
{"room": "general", "user": "ketut", "pin": "UUID"}
```

## Messages

**POST** `/send`

```json
{"room": "general", "user": "KETUT", "content": "hello", "pin": "UUID", "password": ""}
```

Responses: `201` ok · `403` PIN mismatch · `400` empty or too long (max 4000 chars)

**GET** `/messages/<room>?password=`

Returns array of message objects. `401` if password required.

**POST** `/purge-chat`

```json
{"room": "general", "user": "ketut", "pin": "UUID"}
```

## Bots

**POST** `/bot/register`

```json
{"name": "MONITOR", "pin": "UUID", "room": "alerts", "host": "...", "tasks": [...]}
```

Returns: `{"bot_id": 1}`

**GET** `/bot/config/<id>` — Get bot config (used by bot_runner.py)

**GET** `/bot/list?pin=UUID` — List bots owned by PIN

**GET** `/bot/list/all` — List all bots (no PIN filter, used by web admin)

**POST** `/bot/start`

```json
{"bot_id": 1, "pin": "UUID"}
```

Returns: `{"pid": 24891}`

**POST** `/bot/kill` — Kill bot process (owner PIN required)

**POST** `/bot/admin/kill` — Kill bot (any registered user PIN)

**POST** `/bot/admin/start` — Start bot (any registered user PIN)

**POST** `/bot/admin/delete` — Delete bot (any registered user PIN)

**POST** `/bot/delete` — Delete bot from db (must be stopped, owner PIN)