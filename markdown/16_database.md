# Database

Everything is stored in `xtc.db` — a single SQLite file auto-created on first run.

## Schema

| Table | Columns | Purpose |
|---|---|---|
| `users` | `username` PK, `pin` | Identity registry |
| `rooms` | `name`, `creator`, `password`, `description`, `created_at`, `creator_pin` | Room config & ownership |
| `messages` | `id`, `room`, `sender`, `pin`, `content`, `timestamp` | Message history |
| `bots` | `id`, `name`, `pin`, `room`, `host`, `tasks` JSON, `status`, `created_at` | Bot configurations |

## Inspect with check_db.py

```bash
python3 check_db.py
```

Opens an interactive menu to browse rooms, users, messages, and bots with formatted table output.

## Direct SQLite Access

```bash
sqlite3 xtc.db

.tables
SELECT * FROM rooms;
SELECT * FROM bots WHERE status='active';
SELECT COUNT(*) FROM messages WHERE room='general';
SELECT * FROM messages ORDER BY id DESC LIMIT 20;
.quit
```

## Full Reset

```bash
python3 server.py stop
rm xtc.db
python3 server.py start   # fresh database created automatically
```