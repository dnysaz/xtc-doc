# CLI Commands

## Connection

| Command | Args | Description |
|---|---|---|
| `xtc connect` | `@IP:PORT` | Save server address to config |
| `xtc disconnect` | `@IP:PORT` | Remove saved server config |
| `xtc status` | — | Check connection and latency |

## Rooms

| Command | Args | Description |
|---|---|---|
| `xtc list:rooms` | — | List all rooms on the server |
| `xtc create:room` | `@name [pass]` | Create a room (no args = interactive) |
| `xtc delete:room` | `@name` | Delete a room (creator only) |

## Chat

| Command | Args | Description |
|---|---|---|
| `xtc start:chat` | `@name` | Open interactive chat TUI |
| `xtc start:web` | — | Start web admin at localhost:5000 |

## Bots

| Command | Args | Description |
|---|---|---|
| `xtc list:bots` | — | List all registered bots |
| `xtc start:bot` | — | Interactive bot setup wizard |
| `xtc stop:bot` | `<id>` | Stop a running bot |
| `xtc delete:bot` | `<id> \| all` | Delete bot(s) from database |

## Examples

```bash
# Connect to server
xtc connect @103.45.67.89:8080

# Create a private room
xtc create:room @devteam mypassword

# Interactive room creation (prompts for name, password, description)
xtc create:room

# Start and stop a bot
xtc start:bot
xtc stop:bot 1

# Delete all stopped bots at once
xtc delete:bot all
```