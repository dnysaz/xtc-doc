# Server Management

## Start / Stop

```bash
python3 server.py start    # start in background
python3 server.py stop     # stop
python3 server.py          # run in foreground (debug)
```

## Check Status & Logs

```bash
cat server.pid
ps aux | grep server.py
tail -f server.log
grep "ERROR\|Exception" server.log
```

## systemd Service (Auto-restart on Reboot)

Create `/etc/systemd/system/xtermchat.service`:

```ini
[Unit]
Description=XtermChat Server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/xtc-server
ExecStart=/usr/bin/python3 /home/ubuntu/xtc-server/server.py run_internal
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable xtermchat
sudo systemctl start xtermchat
```

## Update

```bash
cd xtc-server
python3 server.py stop
git pull
python3 server.py start
```

## Backup

```bash
# The entire server state is one file
cp xtc.db xtc_backup_$(date +%Y%m%d_%H%M).db
```