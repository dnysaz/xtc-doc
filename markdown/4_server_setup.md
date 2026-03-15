# Server Setup

SSH into your VPS and follow these steps. The entire process takes about 5 minutes.

## Steps

**1. Clone the server**

```bash
git clone https://github.com/dnysaz/xtc-server.git
cd xtc-server
```

**2. Install dependencies**

```bash
pip3 install flask flask-cors werkzeug psutil
```

> `psutil` is required for the bot monitoring system.

**3. Open port 8080**

```bash
sudo ufw allow 8080 && sudo ufw enable
```

> ⚠️ If your VPS has a separate firewall panel (DigitalOcean, Vultr), also open TCP 8080 there.

**4. Start the server**

```bash
python3 server.py start
# [*] Server started in background (PID: 12345)
```

**5. Verify**

```bash
curl http://localhost:8080
# {"service": "XtermChat Gateway", "status": "online", "version": "1.1"}
```

## File Structure

```
xtc-server/
├── server.py       Flask app, all API + bot routes
├── db.py           Database init (users, rooms, messages, bots)
├── room.py         Room CRUD, bcrypt password hashing
├── connection.py   Message save and retrieval
├── bot_runner.py   Bot background process (runs on VPS)
├── check_db.py     Interactive database inspector
├── xtc.db          SQLite database (auto-created)
├── server.log      Output log (auto-created)
└── server.pid      Process ID file (auto-created)
```

## Custom Port

Default is `8080`. Edit the bottom of `server.py`:

```python
elif command == "run_internal":
    app.run(host='0.0.0.0', port=9000)  # ← change here
```