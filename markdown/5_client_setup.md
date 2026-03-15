# Client Setup

## macOS / Linux

**1. Clone the client**

```bash
git clone https://github.com/dnysaz/xtc-client.git
cd xtc-client
```

**2. Install — creates global `xtc` command**

```bash
make install
```

**3. Verify**

```bash
xtc
```

## Windows

**1.** Install [Python 3.10+](https://python.org) — check "Add to PATH" during install.

**2.** Install [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal) from Microsoft Store for best Unicode and emoji support.

**3.** Clone and install

```bash
git clone https://github.com/dnysaz/xtc-client.git
cd xtc-client
.\install.bat
```

The installer will:
- Install Python dependencies (`prompt_toolkit`, `requests`, `flask`)
- Create an `xtc.bat` wrapper
- Add to PATH automatically

> ℹ️ Configuration is saved to `~/.xtc_config.json`. Managed by `xtc connect` and `xtc disconnect`.