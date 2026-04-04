/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result-unlocked.js  v4
   Fixes: 1) Purchase speichern (warte auf Auth) 2) Print-Text dunkel
   ═══════════════════════════════════════════════════════════════ */

const params = new URLSearchParams(window.location.search);
const sessionId = params.get('session_id');
const goalParam = params.get('goal') || 'focus';
const answers = JSON.parse(sessionStorage.getItem('noodrop_quiz') || '{}');

const GOAL_LABELS = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

const EXPERIENCE_LABELS = { beginner: 'Anfänger', intermediate: 'Etwas Erfahrung', advanced: 'Fortgeschritten' };
const LIFESTYLE_LABELS = { student: 'Student', office: 'Wissensarbeiter', athlete: 'Athlet', creative: 'Kreativer' };

const experience = answers.experience || 'beginner';
const lifestyle = answers.lifestyle || 'office';
const medication = answers.medication || 'none';

/* ── Kauf in Firestore speichern (wartet auf Auth) ── */
function savePurchase() {
  if (!sessionId) return;
  if (sessionStorage.getItem('purchase_saved_' + sessionId)) return;

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) return;

    const db = firebase.firestore();
    const purchaseData = {
      goal: goalParam,
      goalLabel: answers.goal_label || GOAL_LABELS[goalParam] || goalParam,
      experience: experience,
      problem: answers.problem || '',
      lifestyle: lifestyle,
      caffeine: answers.caffeine || '',
      budget: answers.budget || '',
      sleep_quality: answers.sleep_quality || 5,
      stress_level: answers.stress_level || 5,
      notes: answers.notes || '',
      expectations: answers.expectations || '',
      stripeSessionId: sessionId,
      productType: 'onetime',
      purchasedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection('users').doc(user.uid).collection('purchases').add(purchaseData)
      .then(function() {
        sessionStorage.setItem('purchase_saved_' + sessionId, 'true');
        console.log('[Unlock] Purchase saved:', user.uid);
      })
      .catch(function(err) { console.error('[Unlock] Save error:', err); });
  });
}

/* ── PDF Download ── */
function downloadPDF() { window.print(); }

/* ── Protokoll rendern ── */
function renderProtocol(stack) {
  document.getElementById('unlockLoading').style.display = 'none';
  document.getElementById('unlockSuccess').style.display = 'block';

  const goalLabel = answers.goal_label || GOAL_LABELS[goalParam] || goalParam;
  document.getElementById('unlockBadge').textContent = '✓ ' + goalLabel;

  const container = document.getElementById('unlockProtocol');
  if (!container) return;

  var html = '';

  /* ── Zusammenfassung ── */
  html += '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">Dein persönliches Protokoll</h2>';
  html += '<p class="protocol-subtitle">Von NooAI generiert — basierend auf deinen 11 Quiz-Antworten</p>';
  html += '<div class="protocol-summary-grid">';
  html += '<div class="summary-item"><span class="summary-label">Ziel</span><span class="summary-value">' + goalLabel + '</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Erfahrung</span><span class="summary-value">' + (EXPERIENCE_LABELS[experience] || experience) + '</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Lifestyle</span><span class="summary-value">' + (LIFESTYLE_LABELS[lifestyle] || lifestyle) + '</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Schlaf</span><span class="summary-value">' + (answers.sleep_quality || '?') + '/10</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Stress</span><span class="summary-value">' + (answers.stress_level || '?') + '/10</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Koffein</span><span class="summary-value">' + (answers.caffeine || '?') + '</span></div>';
  if (answers.budget) html += '<div class="summary-item"><span class="summary-label">Budget</span><span class="summary-value">' + answers.budget + '</span></div>';
  html += '</div></div>';

  /* ── NooAI Reasoning ── */
  if (stack.reasoning) {
    html += '<div class="protocol-section">';
    html += '<h2 class="protocol-section-title">Warum dieser Stack für dich</h2>';
    html += '<div style="background:var(--color-bg-raised);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:20px;font-size:14px;color:var(--color-text);line-height:1.65;">' + stack.reasoning + '</div></div>';
  }

  /* ── Tagesplan ── */
  if (stack.dailySchedule && stack.dailySchedule.length) {
    html += '<div class="protocol-section">';
    html += '<h2 class="protocol-section-title">Dein Tagesplan</h2>';
    html += '<p class="protocol-subtitle">Zeitlich optimiert für ' + (LIFESTYLE_LABELS[lifestyle] || lifestyle) + '</p>';
    stack.dailySchedule.forEach(function(ev) {
      html += '<div class="schedule-row">';
      html += '<div class="schedule-time">' + (ev.time || '—') + '</div>';
      html += '<div class="schedule-icon">💊</div>';
      html += '<div class="schedule-detail"><strong>' + (ev.compound || ev.name || '') + '</strong><br>' + (ev.instruction || ev.detail || '') + '</div>';
      html += '</div>';
    });
    html += '</div>';
  }

  /* ── Compound-Protokolle ── */
  if (stack.compounds && stack.compounds.length) {
    html += '<div class="protocol-section">';
    html += '<h2 class="protocol-section-title">Compound-Protokolle</h2>';
    html += '<p class="protocol-subtitle">Dosierung, Timing und Cycling — personalisiert</p>';

    stack.compounds.forEach(function(comp) {
      html += '<div class="compound-protocol-card">';
      html += '<div class="cpc-header"><span class="cpc-name">' + comp.name + '</span><span class="cpc-dose">' + (comp.dose || '') + '</span></div>';
      html += '<div class="cpc-benefit">' + (comp.benefit || '') + '</div>';
      if (comp.mechanism) html += '<details class="cpc-detail"><summary class="cpc-summary">Wirkmechanismus</summary><div class="cpc-body">' + comp.mechanism + '</div></details>';
      if (comp.timing) html += '<details class="cpc-detail"><summary class="cpc-summary">Timing &amp; Einnahme</summary><div class="cpc-body">' + comp.timing + '</div></details>';
      if (comp.cycling) html += '<details class="cpc-detail"><summary class="cpc-summary">Cycling-Protokoll</summary><div class="cpc-body">' + comp.cycling + '</div></details>';
      html += '</div>';
    });
    html += '</div>';
  }

  /* ── Warnungen ── */
  if (stack.warnings && stack.warnings.length) {
    html += '<div class="protocol-section">';
    html += '<h2 class="protocol-section-title">⚠ Warnungen &amp; Hinweise</h2>';
    stack.warnings.forEach(function(w) {
      html += '<div class="warning-card">' + w + '</div>';
    });
    html += '<div class="warning-disclaimer">Dies ist kein medizinischer Rat. Bei Unsicherheit: Rücksprache mit Arzt/Ärztin.</div>';
    html += '</div>';
  }

  /* ── Budget ── */
  if (stack.budget) {
    html += '<div class="protocol-section">';
    html += '<h2 class="protocol-section-title">Kostenschätzung</h2>';
    if (stack.budget.total) html += '<div class="shopping-total">Geschätzte monatliche Kosten: <strong>' + stack.budget.total + ' EUR</strong></div>';
    if (stack.budget.items && stack.budget.items.length) {
      stack.budget.items.forEach(function(item) {
        html += '<div style="padding:6px 0;font-size:13px;color:var(--color-text);border-bottom:1px solid var(--color-border);">' + item + '</div>';
      });
    }
    html += '</div>';
  }

  /* ── Actions ── */
  html += '<div style="display:flex;gap:12px;margin-top:2rem;flex-wrap:wrap;justify-content:center;">';
  html += '<button class="btn-primary" onclick="downloadPDF()" style="cursor:pointer;">PDF herunterladen <span class="btn-arrow">↓</span></button>';
  html += '<a href="index.html" class="btn-primary" style="background:var(--color-bg-subtle);color:var(--color-orange);border:1px solid var(--color-border);">Zur Library <span class="btn-arrow">→</span></a>';
  html += '</div>';

  container.innerHTML = html;
}

/* ── Init ── */
function init() {
  try {
    if (sessionId) savePurchase();

    const aiStackStr = sessionStorage.getItem('noodrop_ai_stack');
    if (aiStackStr) {
      try {
        const stack = JSON.parse(aiStackStr);
        renderProtocol(stack);
        return;
      } catch (e) {
        console.warn('[Unlock] Could not parse AI stack from sessionStorage');
      }
    }

    document.getElementById('unlockLoading').innerHTML =
      '<p style="color:var(--color-muted);font-size:15px;">Kein Protokoll gefunden.</p>' +
      '<p style="color:var(--color-muted);font-size:13px;margin-top:0.5rem;">Bitte kaufe zuerst ein Protokoll.</p>' +
      '<a href="quiz-result.html" class="btn-primary" style="margin-top:1rem;display:inline-block;">Zurück <span class="btn-arrow">→</span></a>';

  } catch (err) {
    console.error('[Unlock] Init error:', err);
    document.getElementById('unlockLoading').innerHTML =
      '<p style="color:var(--color-muted);font-size:15px;">Fehler: ' + err.message + '</p>' +
      '<a href="quiz-result.html" class="btn-primary" style="margin-top:1rem;display:inline-block;">Zurück <span class="btn-arrow">→</span></a>';
  }
}

init();
