# Room Management

## Creating Rooms

```bash
# Public room — anyone on the server can join
xtc create:room @general

# Private room — password required to join
xtc create:room @team secretpassword

# Interactive mode — prompts for name, password, description
xtc create:room
```

Private rooms appear in `xtc list:rooms` with a **LOCKED** label. Passwords are stored as bcrypt hashes — the raw password is never saved.

## Creator Privileges

When you create a room, your hardware UUID is recorded as `creator_pin`. Only you (from the same machine) can:

- **Delete the room** — `xtc delete:room @roomname`
- **Purge all messages** — type `:purge` inside chat

> ⚠️ `:purge` shows a confirmation modal before deleting. It permanently removes all messages from the server. The room itself remains. This action **cannot be undone**.

## From Web Admin

You can also create and delete rooms from the web admin panel at `localhost:5000/rooms`. Room operations from the web use your web PIN for authentication.