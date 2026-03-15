# Chat Interface

Running `xtc start:chat` opens a full terminal UI with three panels and a dual-focus mode system.

## Layout

```
  XtermChat-CLI  |  NODE: mac-dana  |  server-ip  |  [ INPUT ]
┌──────────────────┬──────────────────────────────────┬─────────────────┐
│ ID               │                                  │ CHANNEL         │
│  KETUT           │  now  You   ❯  hello everyone    │  #GENERAL       │
│                  │  2m   AGUNG ❯  hey!              │                 │
│ GATEWAY          │  5m   You   ❯  https://x.com     │  MESSAGES       │
│  server-ip       │                                  │  247 total      │
│ AUTH  LOCKED     │                                  │  14 Mar 2026    │
└──────────────────┴──────────────────────────────────┴─────────────────┘
 ✏️  INPUT MODE  │  ENTER: SEND  │  ↑↓: HISTORY  │  TAB: → CHAT  │  Ctrl+X: EXIT
 Message ❯❯❯ _
```

## Focus Modes

**✏️ INPUT MODE** (default) — Type and send. Commands `:clear` `:purge` `:reply` `:e` `:help` active. `↑↓` browse input history (last 50 messages).

**📋 CHAT MODE** — Scroll, select text, copy, open links. New message counter shown when scrolled up. Auto-scroll pauses.

## Keyboard Shortcuts

### Global
| Key | Action |
|---|---|
| `Tab` | Switch INPUT ↔ CHAT mode |
| `Escape` | Back to INPUT / close panel |
| `Ctrl+X` | Exit chat |
| `PageUp` / `PageDown` | Scroll 12 lines |

### INPUT MODE
| Key | Action |
|---|---|
| `Enter` | Send message |
| `↑` / `↓` | Browse input history |
| `:clear` | Clear local chat display |
| `:purge` | Purge server history (confirm modal) |
| `:reply USER msg` | Reply → sends `↩ @USER: msg` |
| `:e` | Toggle emoji shortcuts panel |
| `:help` | Show all keyboard shortcuts |

### CHAT MODE
| Key | Action |
|---|---|
| `↑` / `↓` | Scroll line by line |
| `Home` / `End` | Jump to top / bottom |
| `Shift+Arrow` | Select text |
| `Ctrl+C` | Copy selection to clipboard |
| `Ctrl+L` | Open link at cursor in browser |

## Features

**New message notification** — When in CHAT MODE and new messages arrive:
```
▼ 3 new messages — press End to jump down
```

**Mention highlight** — When someone mentions your username, the line is highlighted in yellow.

**Reconnect behavior** — If server becomes unreachable: 3 failures → `🔄 RECONNECTING...`, 8 failures → `❌ OFFLINE`. Resumes automatically when server is back.

**Link detection** — URLs auto-underlined. Move cursor to link and press `Ctrl+L` to open in browser.