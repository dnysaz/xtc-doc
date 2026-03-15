/* ═══════════════════════════════════════
   XtermChat Docs — script.js
   Dynamic markdown reader
   ═══════════════════════════════════════ */

// ── List of markdown files in order ──────────────────────────────────────────
// Fetched from the manifest.json or hardcoded list.
// Files are read from the markdown/ folder, named NN_slug.md
// The sidebar is built dynamically from this list.

const MD_DIR = 'markdown/';

// Hardcoded file list — edit this when you add/remove files.
// The order here determines sidebar order.
const FILES = [
  '1_introduction.md',
  '2_how_it_works.md',
  '3_requirements.md',
  '4_server_setup.md',
  '5_client_setup.md',
  '6_first_use.md',
  '7_cli_commands.md',
  '8_chat_interface.md',
  '9_web_admin.md',
  '10_room_management.md',
  '11_emoji_shortcuts.md',
  '12_bot_system.md',
  '13_identity_security.md',
  '14_https_setup.md',
  '15_server_management.md',
  '16_database.md',
  '17_api_reference.md',
  '18_troubleshooting.md',
  '19_faq.md',
];

// ── State ─────────────────────────────────────────────────────────────────────
let currentIdx  = 0;
let navItems    = [];   // { num, slug, label, file }
let mdCache     = {};   // file → rendered HTML

// ── Parse filename to label ───────────────────────────────────────────────────
function parseFile(filename) {
  // "12_bot_system.md" → { num: "12", slug: "12_bot_system", label: "Bot System" }
  const base  = filename.replace('.md', '');
  const match = base.match(/^(\d+)_(.+)$/);
  if (!match) return { num: '', slug: base, label: base };
  const num   = match[1];
  const label = match[2].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return { num, slug: base, label, file: filename };
}

// ── Build sidebar ─────────────────────────────────────────────────────────────
function buildSidebar() {
  navItems = FILES.map(f => parseFile(f));

  // Group by section (every ~6 items, or by number prefix group)
  const sections = {
    'Getting Started': navItems.filter(i => parseInt(i.num) <= 6),
    'Usage':           navItems.filter(i => parseInt(i.num) >= 7  && parseInt(i.num) <= 12),
    'Advanced':        navItems.filter(i => parseInt(i.num) >= 13 && parseInt(i.num) <= 17),
    'Help':            navItems.filter(i => parseInt(i.num) >= 18),
  };

  const nav = document.getElementById('nav');
  nav.innerHTML = '';

  Object.entries(sections).forEach(([sectionName, items]) => {
    if (!items.length) return;

    const label = document.createElement('div');
    label.className = 'text-[9px] font-bold uppercase tracking-[.15em] text-slate-300 px-2 pt-3 pb-1 font-mono';
    label.textContent = sectionName;
    nav.appendChild(label);

    items.forEach(item => {
      const a = document.createElement('a');
      a.className   = 'nav-link mb-0.5';
      a.dataset.idx = navItems.indexOf(item);
      a.innerHTML   = `<span class="nav-num">${item.num}</span><span class="truncate">${item.label}</span>`;
      a.onclick     = (e) => { e.preventDefault(); loadDoc(navItems.indexOf(item)); };
      nav.appendChild(a);
    });
  });
}

// ── Update active nav link ────────────────────────────────────────────────────
function updateActiveNav(idx) {
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
  });

  // Scroll active link into view in sidebar
  const activeLink = document.querySelector(`.nav-link[data-idx="${idx}"]`);
  if (activeLink) {
    activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ── Post-process blockquotes (add warning/tip classes) ────────────────────────
function processBlockquotes(container) {
  container.querySelectorAll('blockquote').forEach(bq => {
    const text = bq.textContent.trim();
    if (text.startsWith('⚠️') || text.startsWith('Warning') || text.startsWith('Peringatan')) {
      bq.classList.add('warn');
    } else if (text.startsWith('💡') || text.startsWith('Tip') || text.startsWith('Note')) {
      bq.classList.add('tip');
    }
  });
}

// ── Add copy buttons to pre blocks ───────────────────────────────────────────
function addCopyButtons(container) {
  container.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className   = 'copy-btn';
    btn.textContent = 'copy';
    btn.onclick     = () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 1800);
      }).catch(() => {
        btn.textContent = 'error';
        setTimeout(() => { btn.textContent = 'copy'; }, 1500);
      });
    };
    pre.appendChild(btn);
  });
}

// ── Update page nav (prev/next) ───────────────────────────────────────────────
function updatePageNav(idx) {
  const pagenav  = document.getElementById('pagenav');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const prevLbl  = document.getElementById('prevLabel');
  const nextLbl  = document.getElementById('nextLabel');

  pagenav.classList.remove('hidden');

  const hasPrev = idx > 0;
  const hasNext = idx < navItems.length - 1;

  prevBtn.disabled = !hasPrev;
  nextBtn.disabled = !hasNext;
  prevBtn.style.opacity = hasPrev ? '1' : '0.3';
  nextBtn.style.opacity = hasNext ? '1' : '0.3';

  prevLbl.textContent = hasPrev ? navItems[idx - 1].label : '';
  nextLbl.textContent = hasNext ? navItems[idx + 1].label : '';
}

// ── Load a doc by index ───────────────────────────────────────────────────────
async function loadDoc(idx) {
  if (idx < 0 || idx >= navItems.length) return;
  currentIdx = idx;

  const item    = navItems[idx];
  const loading = document.getElementById('loading');
  const content = document.getElementById('content');

  // Show loading briefly if not cached
  if (!mdCache[item.file]) {
    loading.classList.remove('hidden');
    content.classList.add('hidden');
  }

  updateActiveNav(idx);

  // Update breadcrumb
  const bc = document.getElementById('breadcrumb');
  if (bc) bc.textContent = item.label;

  // Update URL hash for shareable links
  history.replaceState({}, '', `#${item.slug}`);

  // Update page title
  document.title = `${item.label} — XtermChat Docs`;

  try {
    // Use cache if available
    if (!mdCache[item.file]) {
      const res  = await fetch(`${MD_DIR}${item.file}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      mdCache[item.file] = marked.parse(text);
    }

    content.innerHTML = mdCache[item.file];
    content.classList.remove('hidden');
    loading.classList.add('hidden');

    processBlockquotes(content);
    addCopyButtons(content);
    updatePageNav(idx);

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) closeSidebar();

  } catch (e) {
    content.innerHTML = `
      <div class="text-center py-16 text-slate-400">
        <div class="text-3xl mb-3">⚠️</div>
        <div class="font-semibold text-slate-600 mb-1">Failed to load document</div>
        <div class="text-sm font-mono">${item.file}</div>
        <div class="text-xs mt-2 text-slate-300">${e.message}</div>
      </div>`;
    content.classList.remove('hidden');
    loading.classList.add('hidden');
  }
}

// ── Navigate prev/next ────────────────────────────────────────────────────────
function navigateDelta(delta) {
  loadDoc(currentIdx + delta);
}

// ── Sidebar open/close ────────────────────────────────────────────────────────
function openSidebar() {
  document.getElementById('sidebar').style.transform = 'translateX(0)';
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  if (window.innerWidth < 1024) {
    document.getElementById('sidebar').style.transform = 'translateX(-100%)';
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
  }
}
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    document.getElementById('sidebar').style.transform = '';
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
  }
});

// ── Keyboard navigation ───────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  // Alt+Left / Alt+Right for prev/next
  if (e.altKey && e.key === 'ArrowLeft')  navigateDelta(-1);
  if (e.altKey && e.key === 'ArrowRight') navigateDelta(1);
});

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Configure marked
  marked.setOptions({
    breaks: true,
    gfm:    true,
  });

  buildSidebar();

  // Load from URL hash, or default to first file
  const hash    = location.hash.slice(1); // remove #
  const fromHash = hash ? navItems.findIndex(i => i.slug === hash) : -1;
  loadDoc(fromHash >= 0 ? fromHash : 0);
});