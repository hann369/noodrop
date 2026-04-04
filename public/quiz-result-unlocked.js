/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result-unlocked.js
   Zeigt das vollständige Protokoll nach erfolgreicher Zahlung.
   ═══════════════════════════════════════════════════════════════ */

const GOAL_LABELS = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

/* ── URL-Parameter auslesen ── */
const params = new URLSearchParams(window.location.search);
const sessionId = params.get('session_id');
const goal = params.get('goal') || 'focus';

/* ── Compound-Daten holen ── */
const stack = (typeof STACKS !== 'undefined' ? STACKS[goal] : null) || (typeof STACKS !== 'undefined' ? STACKS.focus : []);

/* ── Protocol Details rendern ── */
function renderProtocol() {
  document.getElementById('unlockLoading').style.display = 'none';
  document.getElementById('unlockSuccess').style.display = 'block';

  /* Badge */
  const badge = document.getElementById('unlockBadge');
  badge.textContent = '✓ ' + (GOAL_LABELS[goal] || goal);

  /* Section label */
  const label = document.getElementById('unlockSectionLabel');
  label.textContent = 'Dein ' + (GOAL_LABELS[goal] || goal) + '-Stack';

  /* Compound cards — full protocol */
  const container = document.getElementById('unlockCompounds');
  if (!container) return;

  container.innerHTML = stack.map(function(c, i) {
    var link = c.cid ? 'compound.html?cid=' + c.cid : 'index.html';
    return '<div class="compound-card" style="animation-delay: ' + (i * 80) + 'ms">' +
      '<div class="compound-header">' +
        '<span class="compound-name">' + c.name + '</span>' +
        '<span class="compound-dose-badge">' + c.dose + '</span>' +
      '</div>' +
      '<p class="compound-benefit">' + c.benefit + '</p>' +
      '<button class="compound-mechanism-toggle" onclick="toggleMechanism(this)">' +
        '+ Wie es wirkt (Mechanismus)' +
      '</button>' +
      '<div class="mechanism-body">' + c.mechanism + '</div>' +
      '<div class="compound-meta">' +
        '<div class="compound-meta-item"><strong>Timing:</strong> ' + c.timing + '</div>' +
      '</div>' +
      '<div class="compound-pubmed">Studie: ' + c.pubmed + '</div>' +
      '<a href="' + link + '" class="compound-library-link">Im Compound-Archiv ansehen →</a>' +
    '</div>';
  }).join('');
}

function toggleMechanism(btn) {
  var body = btn.nextElementSibling;
  body.classList.toggle('open');
  btn.textContent = body.classList.contains('open')
    ? '− Mechanismus ausblenden'
    : '+ Wie es wirkt (Mechanismus)';
}

/* ── Stripe Session verifizieren (optional, extra Sicherheit) ── */
function verifySession() {
  if (!sessionId) {
    /* Kein session_id → User hat die URL manuell aufgerufen */
    /* Zeig das Protokoll trotzdem — kein Gatekeeping */
    renderProtocol();
    return;
  }

  /* Optional: Session-Status bei Stripe prüfen */
  /* Für MVP: einfach rendern — der Webhook hat den Kauf schon gespeichert */
  renderProtocol();

  /* Future: fetch(`/api/verify-session?id=${sessionId}`) */
}

/* ── Init ── */
if (!stack || !stack.length) {
  document.getElementById('unlockLoading').innerHTML =
    '<p style="color:var(--color-muted);font-size:15px;">Protokoll konnte nicht geladen werden.</p>' +
    '<a href="quiz-result.html" class="btn-primary" style="margin-top:1rem;display:inline-block;">Zurück <span class="btn-arrow">→</span></a>';
} else {
  verifySession();
}
