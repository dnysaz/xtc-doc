# Troubleshooting

## Connection Refused

```bash
curl http://YOUR_IP:8080       # test direct access
sudo ufw status                # check firewall
cat server.pid                 # check if server is running
ps aux | grep server.py
```

## Identity Locked to Another Device

Your username is registered from a different machine. Options:

```bash
# Option 1 — use a different system username
# Option 2 — admin removes the old entry
sqlite3 xtc.db "DELETE FROM users WHERE username='yourname';"
```

## Access Denied on Purge or Delete

You must be on the same machine that created the room. Hardware PIN is device-specific.

## Server Won't Start — Port in Use

```bash
sudo lsof -i :8080
sudo kill -9 <PID>
rm server.pid
python3 server.py start
```

## Bot Not Starting

```bash
# Check bot_runner.py is in xtc-server/
ls xtc-server/bot_runner.py

# Check the bot log
cat ~/.xtc_bot_1.log

# Make sure psutil is installed on VPS
pip3 install psutil
```

## Web Admin Blank / 500 Error

Make sure `app.py` uses `send_from_directory` instead of `render_template`. Flask's Jinja2 conflicts with HTML comment syntax.

```python
# Correct pattern:
from flask import Flask, send_from_directory
@app.route('/dashboard')
def dashboard():
    return send_from_directory(html_dir, 'dashboard.html')
```

## Copy Not Working (Linux)

```bash
sudo apt install xclip
# or
sudo apt install xsel
```

## Chat Scroll Not Working

Minimum terminal size is 80×24. Press `Tab` to enter CHAT MODE first, then use arrow keys or PageUp/PageDown.

## Server Crashed / Not Responding

```bash
tail -50 server.log
rm server.pid
python3 server.py start
```