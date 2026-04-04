/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result-unlocked.js
   Zeigt das vollständige Protokoll nach erfolgreicher Zahlung.
   Speichert den Kauf in Firestore unter users/{uid}/purchases.
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

/* ── Kauf in Firestore speichern (wenn eingeloggt) ── */
function savePurchase() {
  if (!sessionId) return;

  const user = typeof firebase !== 'undefined' ? firebase.auth().currentUser : null;
  if (!user) return;

  /* Prüfen ob schon gespeichert */
  const alreadySaved = sessionStorage.getItem('purchase_saved_' + sessionId);
  if (alreadySaved) return;

  const db = firebase.firestore();
  const purchaseData = {
    goal: goal,
    goalLabel: GOAL_LABELS[goal] || goal,
    stripeSessionId: sessionId,
    productType: 'onetime',
    purchasedAt: firebase.firestore.FieldValue.serverTimestamp(),
    compounds: stack.map(function(c) { return { name: c.name, dose: c.dose }; }),
  };

  db.collection('users').doc(user.uid).collection('purchases').add(purchaseData)
    .then(function() {
      sessionStorage.setItem('purchase_saved_' + sessionId, 'true');
      console.log('[Unlock] Purchase saved for user:', user.uid);
    })
    .catch(function(err) {
      console.error('[Unlock] Error saving purchase:', err);
    });
}

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

/* ── Init ── */
if (!stack || !stack.length) {
  document.getElementById('unlockLoading').innerHTML =
    '<p style="color:var(--color-muted);font-size:15px;">Protokoll konnte nicht geladen werden.</p>' +
    '<a href="quiz-result.html" class="btn-primary" style="margin-top:1rem;display:inline-block;">Zurück <span class="btn-arrow">→</span></a>';
} else {
  if (sessionId) savePurchase();
  renderProtocol();
}
