# Bot System

XtermChat has a built-in server monitoring bot system. Bots run as background processes on your VPS and send alerts to any room you choose. You can create bots from the CLI wizard or from the web admin panel.

## Setup via CLI

```bash
xtc start:bot
```

The wizard will ask:
1. Which room to receive alerts
2. Bot name
3. Which tasks to run
4. Configuration per task (thresholds, intervals, URLs)

Then it registers the bot on the server and starts it automatically.

## Architecture

```
Mac                              VPS
  │                               │
  │  xtc start:bot                │
  │  (setup wizard)               │
  │                               │
  │─── POST /bot/register ───────→│ save config to db
  │─── POST /bot/start ──────────→│ spawn bot_runner.py
  │                               │
  │                               │ bot monitors VPS...
  │                               │ POST /send → alerts to room
  │                               │
  │  xtc stop:bot 1               │
  │─── POST /bot/kill ───────────→│ kill PID, update db
```

> ℹ️ `bot_runner.py` must be in the `xtc-server/` folder on your VPS. Install `psutil` on the VPS: `pip3 install psutil`

## Available Tasks

| Task | Description |
|---|---|
| **Resource Monitor** | CPU, RAM, Disk — alert if above threshold |
| **Process Monitor** | Watch if a service dies, optional auto-restart |
| **Uptime Watchdog** | Ping a URL every N minutes, alert if down |
| **Port Checker** | Verify specific ports are open |
| **Traffic Monitor** | Network bandwidth in/out report |
| **SSL Cert Checker** | Alert N days before cert expires |
| **Log Watcher** | Tail a log file and alert on keyword match |
| **Disk Cleanup Alert** | Warn when disk fills up, list top directories |
| **Scheduled Report** | Daily server summary at a set time |
| **Deployment Hook** | Notify room when deploy.sh calls the bot |
| **Backup Notifier** | Confirm backup success/fail |
| **Custom Command** | Run any shell command, send output to room |

## Bot Commands

```bash
# List all registered bots
xtc list:bots

# Stop a running bot
xtc stop:bot 1

# Delete a stopped bot
xtc delete:bot 1

# Delete all stopped bots at once
xtc delete:bot all
```

## Example Alert Messages

Resource alert:
```
⚠️ RESOURCE ALERT on my-vps [15 Mar 2026 08:30:00]
  CPU   85%  (limit 80%)
  RAM   91%  (limit 85%)
```

Bot online:
```
🤖 MONITOR is now online [15 Mar 2026 08:00:00]
  Tasks  : Resource Monitor, Uptime Watchdog
  Room   : #alerts
```