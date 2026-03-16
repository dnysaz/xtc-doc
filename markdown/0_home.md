<div class="hero">

<div class="hero-badge">v1.0.0 Stable &nbsp;·&nbsp; March 2026</div>

<h1>XtermChat</h1>

<p class="hero-sub">
  A self-hosted chat system that lives in your terminal.<br>
  <strong>No third-party servers. No accounts. Just your VPS.</strong>
</p>

<div class="btn-row">
  <a class="btn-primary-lp" href="#1_introduction" onclick="event.preventDefault();loadDoc&&loadDoc(1)">
    📖 Read the Docs
  </a>
  <a class="btn-secondary-lp" href="https://github.com/dnysaz/xtc-server" target="_blank">
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1.01.07 1.54 1.02 1.54 1.02.9 1.52 2.36 1.08 2.94.83.1-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.68.5C19.14 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z"/></svg>
    Fork on GitHub
  </a>
  <a class="btn-secondary-lp" href="https://github.com/dnysaz/xtc-client/archive/refs/heads/main.zip" target="_blank">
    ⬇ Download Client
  </a>
</div>

<div class="stats-strip">
  <div class="stat-item"><span class="stat-val">~5 min</span><span class="stat-lbl">setup time</span></div>
  <div class="stat-item"><span class="stat-val">~30 MB</span><span class="stat-lbl">RAM usage</span></div>
  <div class="stat-item"><span class="stat-val">2 deps</span><span class="stat-lbl">pip packages</span></div>
  <div class="stat-item"><span class="stat-val">MIT</span><span class="stat-lbl">license</span></div>
</div>

</div>

---

<p class="section-label">What is XtermChat?</p>

XtermChat is a lightweight, self-hosted chat application built for developers and sysadmins. It runs entirely on your own VPS — no external servers, no accounts, no subscriptions. Messages stay on infrastructure you control.

You interact with it through a **terminal TUI** (text user interface), a **web admin panel**, or both. On top of chat, it ships with a **bot system** that monitors your server — CPU, RAM, disk, SSL, uptime — and sends alerts directly into your chat rooms.

---

<p class="section-label">Features</p>

<div class="feature-grid">
  <div class="feature-card">
    <span class="fc-icon">⌨️</span>
    <span class="fc-title">Terminal TUI</span>
    <span class="fc-desc">Full chat interface in your terminal. Sidebar, emoji, link detection, clipboard copy, mention highlight.</span>
  </div>
  <div class="feature-card">
    <span class="fc-icon">🌐</span>
    <span class="fc-title">Web Admin</span>
    <span class="fc-desc">Browser panel at <code>localhost:5000</code>. Dashboard, rooms, chat with link preview, bot management.</span>
  </div>
  <div class="feature-card">
    <span class="fc-icon">🤖</span>
    <span class="fc-title">Bot Monitoring</span>
    <span class="fc-desc">Background process on your VPS. 10+ monitoring tasks. Alerts sent to any room as messages.</span>
  </div>
  <div class="feature-card">
    <span class="fc-icon">🔒</span>
    <span class="fc-title">Private Rooms</span>
    <span class="fc-desc">bcrypt-hashed passwords. Creator-only delete and purge. No password ever stored in plain text.</span>
  </div>
  <div class="feature-card">
    <span class="fc-icon">💾</span>
    <span class="fc-title">SQLite Storage</span>
    <span class="fc-desc">Entire server state in one file. Backup is just <code>cp xtc.db</code>. No external database needed.</span>
  </div>
  <div class="feature-card">
    <span class="fc-icon">🔑</span>
    <span class="fc-title">PIN Auth</span>
    <span class="fc-desc">CLI uses hardware UUID (auto). Web uses a 5-digit PIN. No passwords or accounts to manage.</span>
  </div>
</div>

---

<p class="section-label">Who is it for?</p>

<div class="for-grid">
  <div class="for-card">
    <span class="for-icon">👨‍💻</span>
    <span class="for-who">Developers</span>
    <span class="for-desc">Want a private Slack alternative on their own server without giving data to third parties.</span>
  </div>
  <div class="for-card">
    <span class="for-icon">🛠️</span>
    <span class="for-who">Sysadmins</span>
    <span class="for-desc">Need server monitoring alerts delivered directly into a chat room — without setting up a separate tool.</span>
  </div>
  <div class="for-card">
    <span class="for-icon">👥</span>
    <span class="for-who">Small Teams</span>
    <span class="for-desc">2–50 people who want a fast, lightweight internal communication tool on a $5/month VPS.</span>
  </div>
  <div class="for-card">
    <span class="for-icon">🏠</span>
    <span class="for-who">Homelab Owners</span>
    <span class="for-desc">Running their own infrastructure and want everything — including chat — on hardware they control.</span>
  </div>
</div>

---

<div class="lp-footer">
  <div class="lp-footer-links">
    <a href="https://github.com/dnysaz/xtc-server" target="_blank">xtc-server ↗</a>
    <a href="https://github.com/dnysaz/xtc-client" target="_blank">xtc-client ↗</a>
  </div>
</div>