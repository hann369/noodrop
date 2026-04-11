/* ═══════════════════════════════════════════════════════════════
   Metacognition — quiz-result.js  v4
   Email Capture → NooAI generiert Stack → Stripe Paywall.
   Fixes: Free preview zeigt NUR Namen, Stripe besser, Fallback robuster
   ═══════════════════════════════════════════════════════════════ */

const answers = JSON.parse(sessionStorage.getItem('Metacognition_quiz') || '{}');
const goal = answers.goal || 'focus';
let aiStack = null;

const GOAL_LABELS_MAP = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

/* ── NooAI Stack generieren ── */
async function generateStack() {
  try {
    const res = await fetch('/api/generate-stack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: answers }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'NooAI Fehler');
    if (!data.stack || !data.stack.compounds) throw new Error('Keine Compounds returned');

    aiStack = data.stack;
    console.log('[NooAI] Success:', aiStack.compounds.length, 'compounds');

  } catch (err) {
    console.warn('[NooAI] Failed, using fallback:', err.message);
    aiStack = getFallbackStack();
  }

  /* In sessionStorage für Unlock-Seite */
  sessionStorage.setItem('Metacognition_ai_stack', JSON.stringify(aiStack));

  /* UI updaten */
  const label = document.getElementById('compoundsLabel');
  if (label) label.textContent = 'Dein NooAI-Stack — ' + aiStack.compounds.length + ' Compounds';

  /* Free Preview rendern (sehr wenig Content) */
  renderFreePreview();

  /* Stripe-Buttons anzeigen */
  enableStripeButtons();
}

/* ── Fallback wenn NooAI nicht erreichbar ── */
function getFallbackStack() {
  var Fallbacks = {
    focus: {
      compounds: [
        { name: 'L-Tyrosin', dose: '1000 mg', benefit: 'Erhöht Dopamin-Reserven bei kognitivem Stress.', mechanism: 'L-Tyrosin ist direkter Dopamin-Vorläufer.', timing: 'Morgens nüchtern', cycling: '5 Tage ein, 2 Tage frei' },
        { name: 'Citicoline', dose: '300 mg', benefit: 'Erhöht Acetylcholin für bessere Konzentration.', mechanism: 'Liefert Cholin und Cytidine.', timing: 'Morgens zum Frühstück', cycling: 'Durchgängig' },
        { name: 'L-Theanin', dose: '200 mg', benefit: 'Alpha-Wellen für ruhigen Fokus.', mechanism: 'Erhöht Alpha-Band-Aktivität (8–14 Hz).', timing: '90 Min nach dem Aufwachen', cycling: 'Bei Bedarf' }
      ],
      dailySchedule: [
        { time: '07:00', compound: 'L-Tyrosin', instruction: '1000 mg nüchtern' },
        { time: '07:30', compound: 'Citicoline', instruction: '300 mg zum Frühstück' },
        { time: '09:00', compound: 'L-Theanin', instruction: '200 mg' }
      ],
      warnings: ['Nicht mit SSRIs kombinieren ohne ärztliche Rücksprache.'],
      budget: { total: '~25-35', items: ['L-Tyrosin: ~€5', 'Citicoline: ~€18', 'L-Theanin: ~€12'] },
      reasoning: 'Fokus-Stack: Dopamin + Acetylcholin + Alpha-Wellen — die neurochemische Basis für konzentriertes Arbeiten.'
    },
    energy: {
      compounds: [
        { name: 'Creatin Monohydrat', dose: '5 g', benefit: 'Erhöht zerebrale ATP-Resynthese.', mechanism: 'Oxford-Studie: 14% besseres Arbeitsgedächtnis.', timing: 'Täglich', cycling: 'Durchgängig' },
        { name: 'Coenzym Q10', dose: '200 mg', benefit: 'Mitochondriale Energieproduktion.', mechanism: 'Kofaktor in Elektronentransportkette.', timing: 'Morgens mit Fett', cycling: '3 Monate ein, 1 Pause' },
        { name: 'Rhodiola Rosea', dose: '200 mg', benefit: 'Adaptogen gegen mentale Erschöpfung.', mechanism: 'Beeinflusst MAO, COMT, HPA-Achse.', timing: 'Morgens nüchtern', cycling: '4 Wochen ein, 1 Pause' }
      ],
      dailySchedule: [
        { time: '07:00', compound: 'Creatin', instruction: '5 g' },
        { time: '07:00', compound: 'CoQ10', instruction: '200 mg mit Fett' },
        { time: '07:30', compound: 'Rhodiola', instruction: '200 mg nüchtern' }
      ],
      warnings: ['Rhodiola nicht mit SSRIs kombinieren.'],
      budget: { total: '~40-55', items: ['Creatin: ~€4', 'CoQ10: ~€25', 'Rhodiola: ~€12'] },
      reasoning: 'Energie-Stack: ATP + Mitochondrien + Stress-Resilienz — dreifache Energie auf zellulärer Ebene.'
    },
    sleep: {
      compounds: [
        { name: 'Magnesium Glycinat', dose: '300 mg', benefit: 'Entspannt das Nervensystem.', mechanism: 'Kofaktor für GABA-Synthese.', timing: '60 Min vor Schlafen', cycling: 'Durchgängig' },
        { name: 'Ashwagandha KSM-66', dose: '300 mg', benefit: 'Senkt Cortisol um 28%.', mechanism: 'Reduziert Serum-Cortisol.', timing: 'Abends', cycling: '8 Wochen ein, 2 Pause' },
        { name: 'Glycin', dose: '3 g', benefit: 'Senkt Körperkerntemperatur.', mechanism: 'Fördert Vasodilatation → Einschlafsignal.', timing: '30 Min vor Schlafen', cycling: 'Durchgängig' }
      ],
      dailySchedule: [
        { time: '19:00', compound: 'Ashwagandha', instruction: '300 mg' },
        { time: '22:00', compound: 'Magnesium', instruction: '300 mg' },
        { time: '22:30', compound: 'Glycin', instruction: '3 g in Wasser' }
      ],
      warnings: ['Ashwagandha: bei emotionaler Bluntness absetzen.'],
      budget: { total: '~20-30', items: ['Magnesium: ~€7', 'Ashwagandha: ~€12', 'Glycin: ~€4'] },
      reasoning: 'Schlaf-Stack: GABA + Cortisol-Reduktion + Temperatur-Signal — drei Synergien für tieferen Schlaf.'
    },
    mood: {
      compounds: [
        { name: 'Ashwagandha KSM-66', dose: '300 mg', benefit: 'Klinisch belegte Cortisol-Reduktion.', mechanism: 'Normalisiert HPA-Achse.', timing: 'Abends', cycling: '12 Wochen ein, 4 Pause' },
        { name: 'L-Theanin', dose: '200 mg', benefit: 'Alpha-Wellen — entspannte Wachheit.', mechanism: 'Erhöht Alpha-Band-Aktivität.', timing: 'Bei Bedarf', cycling: 'Bei Bedarf' },
        { name: 'Saffron Extrakt', dose: '28 mg', benefit: 'Antidepressive Wirkung in Trials.', mechanism: 'Hemmt Serotonin-Wiederaufnahme.', timing: 'Morgens', cycling: '8 Wochen ein, 2 evaluieren' }
      ],
      dailySchedule: [
        { time: '07:30', compound: 'Saffron', instruction: '28 mg' },
        { time: '13:00', compound: 'L-Theanin', instruction: '200 mg' },
        { time: '19:00', compound: 'Ashwagandha', instruction: '300 mg' }
      ],
      warnings: ['Saffron NICHT mit SSRIs kombinieren.'],
      budget: { total: '~45-60', items: ['Ashwagandha: ~€12', 'L-Theanin: ~€12', 'Saffron: ~€28'] },
      reasoning: 'Stimmungs-Stack: Cortisol-Basis + Alpha-Wellen + Serotonin — dreifache Unterstützung.'
    },
    memory: {
      compounds: [
        { name: 'Bacopa Monnieri', dose: '300 mg', benefit: 'Verbessert Gedächtniskonsolidierung.', mechanism: 'Fördert Dendritenbildung im Hippocampus.', timing: 'Morgens mit Fett', cycling: '12 Wochen ein, 2 Pause' },
        { name: "Lion's Mane", dose: '1000 mg', benefit: 'Stimuliert NGF — neuronales Wachstum.', mechanism: 'Hericenone stimulieren NGF-Synthese.', timing: 'Morgens + abends', cycling: '8 Wochen ein, 2 Pause' },
        { name: 'Alpha-GPC', dose: '300 mg', benefit: 'Schneller Acetylcholin-Boost.', mechanism: 'Höhere BBB-Permeabilität als CDP-Cholin.', timing: '45 Min vor Session', cycling: '3-4x/Woche' }
      ],
      dailySchedule: [
        { time: '07:30', compound: 'Bacopa', instruction: '300 mg mit Fett' },
        { time: '07:30', compound: "Lion's Mane", instruction: '500 mg' },
        { time: 'Vor Session', compound: 'Alpha-GPC', instruction: '300 mg' }
      ],
      warnings: ['Bacopa: initiale Müdigkeit normal (erste 2 Wochen).'],
      budget: { total: '~40-55', items: ['Bacopa: ~€12', "Lion's Mane: ~€28", 'Alpha-GPC: ~€18'] },
      reasoning: 'Gedächtnis-Stack: Dendriten + NGF + Acetylcholin — sofort + langfristig.'
    }
  };

  return Fallbacks[goal] || Fallbacks.focus;
}

/* ── Email gate ── */
document.getElementById('emailSubmit').addEventListener('click', e => {
  e.preventDefault();
  const input = document.getElementById('emailInput');
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    input.style.borderColor = 'var(--color-danger)';
    input.focus();
    return;
  }
  input.style.borderColor = '';
  saveEmailLead(email);
  revealResult();
});

document.getElementById('skipEmail').addEventListener('click', revealResult);

function saveEmailLead(email) {
  if (typeof firebase !== 'undefined' && typeof db !== 'undefined') {
    db.collection('email_leads').add({
      email: email,
      goal: goal,
      experience: answers.experience || '',
      problem: answers.problem || '',
      lifestyle: answers.lifestyle || '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(err) { console.error('Error saving lead:', err); });
  }
}

function revealResult() {
  document.getElementById('emailGate').style.display = 'none';
  document.getElementById('resultContent').style.display = 'block';

  /* Stripe-Buttons SOFORT zeigen */
  document.getElementById('lockedSection').style.display = 'block';

  /* NooAI generieren */
  generateStack();

  document.getElementById('resultContent').scrollIntoView({ behavior: 'smooth' });
}

/* ── Free Preview: NUR Name — NICHTS anderes ── */
function renderFreePreview() {
  const list = document.getElementById('compoundsList');
  if (!list) return;
  if (!aiStack || !aiStack.compounds || !aiStack.compounds.length) return;

  list.innerHTML = aiStack.compounds.map(function(c, i) {
    return '<div class="compound-card" style="animation-delay:' + (i * 80) + 'ms">' +
      '<div class="compound-header">' +
        '<span class="compound-name">' + c.name + '</span>' +
        '<span class="compound-dose-badge">🔒</span>' +
      '</div>' +
      '<div style="margin-top:8px;font-size:11px;color:var(--color-muted);text-align:center;">' +
        '🔒 Dosierung, Timing, Cycling & Einkaufsliste freischalten →' +
      '</div>' +
    '</div>';
  }).join('');
}

function enableStripeButtons() {
  var locked = document.getElementById('lockedSection');
  if (locked) locked.style.display = 'block';
}

/* ── Stripe checkout ── */
document.querySelectorAll('.btn-checkout').forEach(function(btn) {
  btn.addEventListener('click', async function() {
    var priceId = btn.dataset.price;
    var productType = btn.dataset.product;

    if (!priceId || priceId.includes('_HERE')) {
      alert('Stripe Price IDs fehlen.\n\nIn quiz-result.html: price_PRO_ID_HERE und price_ONETIME_ID_HERE durch echte Stripe Price IDs ersetzen.\n\nFindest du im Stripe Dashboard → Products → deine Price IDs (beginnen mit price_).');
      return;
    }

    var user = firebase.auth().currentUser;
    if (!user) {
      alert('Bitte melde dich an oder erstelle einen Account, um fortzufahren.');
      window.location.href = 'index.html';
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span style="opacity:0.7">Wird weitergeleitet…</span>';

    var mode = productType === 'pro' ? 'subscription' : 'onetime';
    var email = user.email || '';

    try {
      var res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: priceId,
          mode: mode,
          goal: goal,
          email: email,
          firebaseUid: user.uid,
        }),
      });

      var data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout fehlgeschlagen (' + res.status + ')');
      if (!data.url) throw new Error('Keine Checkout-URL returned');

      window.location.href = data.url;

    } catch (err) {
      console.error('Checkout error:', err);
      btn.disabled = false;
      btn.innerHTML = btn.dataset.product === 'pro'
        ? 'Jetzt freischalten <span class="btn-arrow">→</span>'
        : 'Einmalig kaufen';
      alert('Checkout fehlgeschlagen:\n\n' + err.message);
    }
  });
});
