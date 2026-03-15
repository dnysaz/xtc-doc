# First Time Use

After installing the client and starting the server, here's how to get started in under 2 minutes.

```bash
# 1. Connect to your server
$ xtc connect @your-server-ip:8080
[*] Configuration saved
[*] Linked to gateway: http://your-server-ip:8080

# 2. Verify connection
$ xtc status
 GATEWAY :  http://your-server-ip:8080
 SERVICE :  XtermChat Gateway v1.1
 STATUS  :  ONLINE (HTTP 200)
 LATENCY :  42 ms

# 3. Create a room
$ xtc create:room @general
[*] SUCCESS: Room '@general' is live (public 🌐)

# 4. Start chatting
$ xtc start:chat @general
```

## Private Room

```bash
# Create a private room with password
$ xtc create:room @devteam secretpassword

# Join — password prompted automatically
$ xtc start:chat @devteam
```

## Web Admin

```bash
# Start the web admin panel
$ xtc start:web
# URL: http://localhost:5000
```

Open `http://localhost:5000` in your browser, enter your server IP, username, and a 5-digit PIN.