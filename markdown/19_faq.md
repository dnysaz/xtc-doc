# FAQ

## Can multiple people be in the same room at the same time?

Yes. Messages are polled every 2 seconds. All connected users see new messages automatically.

## Can CLI and web users chat together?

Yes. Both use the same API and see each other's messages in real time in the same rooms.

## Can I manage CLI-created bots from the web admin?

Yes. The web admin uses `/bot/list/all` to show all bots regardless of who created them, and uses admin endpoints (`/bot/admin/kill`, `/bot/admin/delete`) to manage them using your web user PIN.

## Where does bot_runner.py need to be?

Always in `xtc-server/` on the VPS — never on your local machine. The server spawns it directly as a background process.

## Are messages stored permanently?

Until the room creator runs `:purge` (wipes messages, keeps room) or `xtc delete:room` (removes everything). Delete `xtc.db` on the server for a complete reset.

## What if I reinstall my OS or switch machines?

Your hardware PIN changes. A server admin can reset the old entry:

```bash
sqlite3 xtc.db "DELETE FROM users WHERE username='yourname';"
```

## Can I run server and client on the same machine?

Yes:

```bash
xtc connect @localhost:8080
```

## How many users can XtermChat handle?

SQLite handles millions of rows comfortably. For a team of 2–50 people with normal usage, performance is fine on even the cheapest VPS. For very high traffic you'd want to migrate to PostgreSQL by modifying `db.py`.

## How do I update?

```bash
# Server
cd xtc-server && python3 server.py stop && git pull && python3 server.py start

# Client
cd xtc-client && git pull && make install
```

Database and config are preserved through updates.