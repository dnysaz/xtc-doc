# Identity & Security

## How CLI Identity Works

```
machine UUID (IOPlatformUUID / /etc/machine-id)
        ↓
   CLI_PIN  (hardware-bound, auto-generated)
        ↓
sent with every message and room operation
        ↓
server: users table → username:PIN mapping
        ↓
mismatch → 403  Identity mismatch. Wrong PIN.
```

There is no signup flow. Your username comes from your system user (`whoami`) and your identity is tied to your machine's hardware UUID. First message auto-registers you. If someone tries to use the same username from a different machine, the server rejects it with 403.

## Server-side Validation

| Action | Validation |
|---|---|
| Send message | Username + PIN must match registered record |
| Create room | PIN stored as `creator_pin` |
| Purge messages | Requester PIN must match `creator_pin` |
| Delete room | Username + PIN must match creator |
| Join private room | Room password verified via bcrypt |
| Web login | Username + PIN must match registered record |
| Bot stop/delete (web) | User must be registered on server |

## Web Identity

Web users choose a 5-digit PIN at login. This PIN is stored in `localStorage` and sent with every request. Unlike the CLI, web identity is not device-bound — the same credentials can be used from any browser.

## Security Notes

- Default setup uses **HTTP** — acceptable for private/internal networks
- For public deployments, use HTTPS (see HTTPS setup section)
- Room passwords are stored as **bcrypt hashes** — the raw password is never saved
- `creator_pin` is never sent to clients — server-side only