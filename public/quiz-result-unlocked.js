/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result-unlocked.js  v2
   Generiert ein DYNAMISCHES, personalisiertes Protokoll basierend
   auf den 5 Quiz-Antworten: goal, experience, problem, lifestyle, medication
   ═══════════════════════════════════════════════════════════════ */

const GOAL_LABELS = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

const EXPERIENCE_LABELS = {
  beginner: 'Anfänger',
  intermediate: 'Etwas Erfahrung',
  advanced: 'Fortgeschritten'
};

const PROBLEM_LABELS = {
  brainfog: 'Brain Fog',
  procrastination: 'Prokrastination',
  sleep_quality: 'Schlechter Schlaf',
  low_energy: 'Niedriges Energieniveau',
  motivation: 'Fehlende Motivation'
};

const LIFESTYLE_LABELS = {
  student: 'Student / Learner',
  office: 'Wissensarbeiter',
  athlete: 'Athlet / Sportler',
  creative: 'Kreativer / Gründer'
};

const MEDICATION_LABELS = {
  none: 'Keine',
  basic: 'Basis-Supplemente',
  prescription: 'Rezeptpflichtige Medikamente'
};

/* ── URL-Parameter + Quiz-Daten ── */
const params = new URLSearchParams(window.location.search);
const sessionId = params.get('session_id');
const goalParam = params.get('goal') || 'focus';
const answers = JSON.parse(sessionStorage.getItem('noodrop_quiz') || '{}');

const goal = goalParam;
const experience = answers.experience || 'beginner';
const problem = answers.problem || '';
const lifestyle = ['student', 'office', 'athlete', 'creative'].includes(answers.lifestyle) ? answers.lifestyle : 'office';
const medication = ['none', 'basic', 'prescription'].includes(answers.medication) ? answers.medication : 'none';

/* Debug-Log */
console.log('[Unlock] goal:', goal, 'experience:', experience, 'lifestyle:', lifestyle, 'medication:', medication);
console.log('[Unlock] STACKS available:', typeof STACKS !== 'undefined' ? Object.keys(STACKS) : 'NOT LOADED');
console.log('[Unlock] answers:', answers);

/* ── Stack-Daten holen — mit Fallback ── */
let stack = [];
if (typeof STACKS !== 'undefined' && STACKS[goal]) {
  stack = STACKS[goal];
} else if (typeof STACKS !== 'undefined' && STACKS.focus) {
  stack = STACKS.focus;
  console.warn('[Unlock] Fallback to focus stack. goal "' + goal + '" not found.');
} else {
  console.error('[Unlock] STACKS not available!');
}

console.log('[Unlock] stack length:', stack ? stack.length : 0);
if (stack && stack.length > 0) {
  console.log('[Unlock] first compound:', stack[0].name);
  console.log('[Unlock] dose keys:', typeof stack[0].dose, Object.keys(stack[0].dose || {}));
}

/* ── Kauf in Firestore speichern ── */
function savePurchase() {
  if (!sessionId) return;
  const user = typeof firebase !== 'undefined' ? firebase.auth().currentUser : null;
  if (!user) return;
  if (sessionStorage.getItem('purchase_saved_' + sessionId)) return;

  const db = firebase.firestore();
  const purchaseData = {
    goal: goal,
    goalLabel: GOAL_LABELS[goal] || goal,
    experience: experience,
    problem: problem,
    lifestyle: lifestyle,
    medication: medication,
    stripeSessionId: sessionId,
    productType: 'onetime',
    purchasedAt: firebase.firestore.FieldValue.serverTimestamp(),
    compounds: stack.map(function(c) { return { name: c.name, dose: c.dose[experience] || c.dose.beginner }; }),
  };

  db.collection('users').doc(user.uid).collection('purchases').add(purchaseData)
    .then(function() {
      sessionStorage.setItem('purchase_saved_' + sessionId, 'true');
    })
    .catch(function(err) { console.error('[Unlock] Error saving purchase:', err); });
}

/* ── Personalisierte Wake-Zeit berechnen ── */
function getWakeTime() {
  if (lifestyle === 'student') return '07:00';
  if (lifestyle === 'office') return '06:30';
  if (lifestyle === 'athlete') return '05:30';
  return '08:00';
}

function getSleepTime() {
  if (lifestyle === 'athlete') return '22:00';
  if (lifestyle === 'student') return '23:00';
  return '23:00';
}

/* ── Protokoll rendern ── */
function renderProtocol() {
  document.getElementById('unlockLoading').style.display = 'none';
  document.getElementById('unlockSuccess').style.display = 'block';

  document.getElementById('unlockBadge').textContent = '✓ ' + (GOAL_LABELS[goal] || goal);

  const container = document.getElementById('unlockProtocol');
  if (!container) return;

  var html = '';

  /* ── Sektion 1: Persönliche Zusammenfassung ── */
  html += '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">Dein persönliches Protokoll</h2>';
  html += '<div class="protocol-summary-grid">';
  html += '<div class="summary-item"><span class="summary-label">Ziel</span><span class="summary-value">' + (GOAL_LABELS[goal] || goal) + '</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Erfahrung</span><span class="summary-value">' + (EXPERIENCE_LABELS[experience] || experience) + '</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Lifestyle</span><span class="summary-value">' + (LIFESTYLE_LABELS[lifestyle] || lifestyle) + '</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Wake-Up</span><span class="summary-value">' + getWakeTime() + ' Uhr</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Sleep</span><span class="summary-value">' + getSleepTime() + ' Uhr</span></div>';
  html += '<div class="summary-item"><span class="summary-label">Medikamente</span><span class="summary-value">' + (MEDICATION_LABELS[medication] || medication) + '</span></div>';
  if (problem) html += '<div class="summary-item"><span class="summary-label">Hauptproblem</span><span class="summary-value">' + (PROBLEM_LABELS[problem] || problem) + '</span></div>';
  html += '</div></div>';

  /* ── Sektion 2: Tagesplan ── */
  html += renderDailySchedule();

  /* ── Sektion 3: Compound-Details ── */
  html += renderCompoundDetails();

  /* ── Sektion 4: Cycling-Kalender ── */
  html += renderCyclingCalendar();

  /* ── Sektion 5: Warnungen ── */
  html += renderWarnings();

  /* ── Sektion 6: Einkaufsliste ── */
  html += renderShoppingList();

  container.innerHTML = html;
}

/* ── TAGESPLAN ── */
function renderDailySchedule() {
  var wakeTime = getWakeTime();
  var sleepTime = getSleepTime();

  var events = [];

  stack.forEach(function(comp) {
    var timing = comp.timing[lifestyle] || comp.timing.office || 'Morgens zum Frühstück';
    var dose = comp.dose[experience] || comp.dose.beginner;
    var timingLower = timing.toLowerCase();

    if (timingLower.indexOf('morgens') !== -1) {
      events.push({ time: wakeTime, icon: comp.name.charAt(0), name: comp.name, detail: dose + ' — ' + timing });
    }
    if (timingLower.indexOf('90 min nach dem aufwachen') !== -1) {
      events.push({ time: '+90 Min', icon: '☕', name: 'Koffein + L-Theanin', detail: comp.dose[experience] + ' — ' + timing });
    }
    if (timingLower.indexOf('vor lernsessions') !== -1 || timingLower.indexOf('vor deep-work') !== -1 || timingLower.indexOf('vor dem training') !== -1) {
      events.push({ time: 'Vor Session', icon: '⚡', name: comp.name, detail: dose + ' — ' + timing });
    }
    if (timingLower.indexOf('mittag') !== -1 || timingLower.indexOf('13:00') !== -1 || timingLower.indexOf('14:00') !== -1) {
      events.push({ time: '13:00', icon: '🕐', name: comp.name, detail: dose + ' — Mittagstief-Booster' });
    }
    if (timingLower.indexOf('abends') !== -1 || timingLower.indexOf('abend') !== -1) {
      events.push({ time: '19:00', icon: '🌆', name: comp.name, detail: dose + ' — ' + timing });
    }
    if (timingLower.indexOf('schlafen') !== -1 || timingLower.indexOf('60 min') !== -1 || timingLower.indexOf('30 min vor dem schlafen') !== -1) {
      var mins = timingLower.indexOf('30 min') !== -1 ? 30 : 60;
      events.push({ time: '-' + mins + ' Min', icon: '🌙', name: comp.name, detail: dose + ' — ' + timing });
    }
    if (timingLower.indexOf('frühstück') !== -1) {
      events.push({ time: wakeTime + '+30', icon: '🍳', name: comp.name, detail: dose + ' — Zum Frühstück' });
    }
  });

  var html = '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">Dein Tagesplan</h2>';
  html += '<p class="protocol-subtitle">Zeitlich optimiert für ' + (LIFESTYLE_LABELS[lifestyle] || lifestyle) + '</p>';

  /* Sort events by time roughly */
  var order = [wakeTime, wakeTime + '+30', '+90 Min', 'Vor Session', '13:00', '19:00', '-60 Min', '-30 Min', sleepTime];
  events.sort(function(a, b) {
    return order.indexOf(a.time) - order.indexOf(b.time);
  });

  /* Remove duplicates */
  var seen = {};
  events = events.filter(function(e) {
    var key = e.time + e.name;
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });

  events.forEach(function(ev) {
    html += '<div class="schedule-row">';
    html += '<div class="schedule-time">' + ev.time + '</div>';
    html += '<div class="schedule-icon">' + ev.icon + '</div>';
    html += '<div class="schedule-detail"><strong>' + ev.name + '</strong><br>' + ev.detail + '</div>';
    html += '</div>';
  });

  html += '</div>';
  return html;
}

/* ── COMPOUND DETAILS ── */
function renderCompoundDetails() {
  var html = '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">Compound-Protokolle</h2>';
  html += '<p class="protocol-subtitle">Dosierung, Timing und Cycling — angepasst an dein Profil</p>';

  stack.forEach(function(comp) {
    var dose = comp.dose[experience] || comp.dose.beginner;
    var timing = comp.timing[lifestyle] || comp.timing.office || 'Morgens';
    var cycling = comp.cycling[experience] || comp.cycling.beginner || 'Durchgängig einnehmen';
    var warning = comp.warnings[medication] || comp.warnings.none || 'Keine bekannten Warnungen.';

    html += '<div class="compound-protocol-card">';
    html += '<div class="cpc-header"><span class="cpc-name">' + comp.name + '</span><span class="cpc-dose">' + dose + '</span></div>';
    html += '<div class="cpc-benefit">' + comp.benefit + '</div>';

    html += '<details class="cpc-detail"><summary class="cpc-summary">Wirkmechanismus</summary><div class="cpc-body">' + (comp.mechanism || 'Wird ergänzt.') + '</div></details>';
    html += '<details class="cpc-detail"><summary class="cpc-summary">Timing &amp; Einnahme</summary><div class="cpc-body">' + timing + '</div></details>';
    html += '<details class="cpc-detail"><summary class="cpc-summary">Cycling-Protokoll</summary><div class="cpc-body">' + cycling + '</div></details>';
    html += '<details class="cpc-detail"><summary class="cpc-summary">Sicherheit &amp; Warnungen</summary><div class="cpc-body ' + (warning.indexOf('⚠') !== -1 ? 'cpc-warning' : '') + '">' + warning + '</div></details>';

    html += '</div>';
  });

  html += '</div>';
  return html;
}

/* ── CYCLING KALENDER ── */
function renderCyclingCalendar() {
  var html = '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">Cycling-Übersicht</h2>';
  html += '<p class="protocol-subtitle">Wann du welche Compounds nimmst — basierend auf deinem Erfahrungslevel (' + (EXPERIENCE_LABELS[experience] || experience) + ')</p>';

  stack.forEach(function(comp) {
    var cycling = comp.cycling[experience] || comp.cycling.beginner || 'Durchgängig';
    var dose = comp.dose[experience] || comp.dose.beginner || '';

    html += '<div class="cycling-row">';
    html += '<div class="cycling-name">' + comp.name + '</div>';
    html += '<div class="cycling-info">' + cycling + '</div>';
    html += '<div class="cycling-dose">' + dose + '</div>';
    html += '</div>';
  });

  html += '</div>';
  return html;
}

/* ── WARNUNGEN ── */
function renderWarnings() {
  if (medication === 'none') return '';

  var html = '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">⚠ Interaktions-Warnungen</h2>';
  html += '<p class="protocol-subtitle">Basierend auf: ' + (MEDICATION_LABELS[medication] || medication) + '</p>';

  stack.forEach(function(comp) {
    var warning = comp.warnings[medication] || comp.warnings.none || '';
    if (warning.indexOf('⚠') !== -1) {
      html += '<div class="warning-card">' + warning + '</div>';
    }
  });

  html += '<div class="warning-disclaimer">Dies ist kein medizinischer Rat. Bei Unsicherheit oder bekannten Wechselwirkungen: Immer Rücksprache mit deinem Arzt oder deiner Ärztin halten.</div>';
  html += '</div>';
  return html;
}

/* ── EINKAUFSLISTE ── */
function renderShoppingList() {
  var html = '<div class="protocol-section">';
  html += '<h2 class="protocol-section-title">Einkaufsliste</h2>';
  html += '<p class="protocol-subtitle">Konkrete Empfehlungen — geprüft auf Qualität und Preis-Leistung</p>';

  var totalPrice = 0;

  stack.forEach(function(comp) {
    var p = comp.purchase;
    if (!p) return;

    html += '<div class="shopping-item">';
    html += '<div class="shopping-name">' + p.brand + '</div>';
    html += '<div class="shopping-detail">' + comp.name + ' · ' + p.price + '</div>';
    html += '<div class="shopping-quality">' + p.quality + '</div>';
    html += '<a href="' + p.url + '" target="_blank" rel="noopener" class="shopping-link">Ansehen →</a>';
    html += '</div>';
  });

  html += '<div class="shopping-total">Gesamtkosten (ca.): <strong>' + stack.reduce(function(sum, c) {
    if (!c.purchase || !c.purchase.price) return sum;
    var match = c.purchase.price.match(/€([0-9.]+)/);
    if (match) return sum + parseFloat(match[1]);
    return sum;
  }, 0).toFixed(2) + ' EUR</strong></div>';

  html += '</div>';
  return html;
}

/* ── Init ── */
function init() {
  if (!stack || !stack.length) {
    document.getElementById('unlockLoading').innerHTML =
      '<p style="color:var(--color-muted);font-size:15px;">Protokoll konnte nicht geladen werden.</p>' +
      '<p style="color:var(--color-muted);font-size:13px;margin-top:0.5rem;">STACKS: ' + (typeof STACKS !== 'undefined' ? 'geladen' : 'NICHT geladen') + ' | goal: ' + goal + '</p>' +
      '<a href="quiz-result.html" class="btn-primary" style="margin-top:1rem;display:inline-block;">Zurück <span class="btn-arrow">→</span></a>';
    return;
  }

  try {
    if (sessionId) savePurchase();
    renderProtocol();
  } catch (err) {
    console.error('[Unlock] renderProtocol error:', err);
    document.getElementById('unlockLoading').innerHTML =
      '<p style="color:var(--color-muted);font-size:15px;">Fehler beim Laden des Protokolls.</p>' +
      '<p style="color:var(--color-muted);font-size:12px;margin-top:0.5rem;">' + err.message + '</p>' +
      '<a href="quiz-result.html" class="btn-primary" style="margin-top:1rem;display:inline-block;">Zurück <span class="btn-arrow">→</span></a>';
  }
}

init();
