# Introduction

XtermChat is a lightweight, self-hosted chat system built for the terminal. Unlike third-party platforms, XtermChat stores nothing on external servers. You deploy the server on your own VPS, connect with the CLI client or a browser, and all messages stay on infrastructure you control.

It is designed for developers and sysadmins who want something simple that *just works* — without the overhead of Matrix, the enterprise focus of Mattermost, or the data concerns of Slack. It also ships with a full **bot monitoring system** and a **web admin panel**.

## Why XtermChat?

| | XtermChat | Matrix | Mattermost | Slack |
|---|---|---|---|---|
| Self-hosted | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Open source | ✅ MIT | ✅ Yes | ⚠️ Partial | ❌ No |
| Setup time | ~5 min | ~2 hrs | ~30 min | Instant |
| RAM usage | ~30 MB | ~1–2 GB | ~300 MB | — |
| Terminal-first | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Bot monitoring | ✅ Built-in | ❌ No | ❌ No | ❌ No |
| Your data | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |

## Stats

- **~5 min** server setup
- **~30 MB** RAM usage
- **2 deps** pip packages
- **MIT** license
- **10+** bot tasks