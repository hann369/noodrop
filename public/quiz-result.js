/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result.js  v2
   Email Capture → NooAI generiert Stack → Stripe Paywall.
   ═══════════════════════════════════════════════════════════════ */

const answers = JSON.parse(sessionStorage.getItem('noodrop_quiz') || '{}');
const goal = answers.goal || 'focus';

const GOAL_LABELS_MAP = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

/* NooAI-generated Stack (wird asynchron geladen) */
let aiStack = null;
let aiError = null;

/* ── NooAI Stack generieren ── */
async function generateStack() {
  try {
    const res = await fetch('/api/generate-stack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: answers }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'NooAI Fehler');
    }

    aiStack = data.stack;
    console.log('[NooAI] Generated stack:', aiStack);

    /* Stack in sessionStorage speichern für die Unlock-Seite */
    sessionStorage.setItem('noodrop_ai_stack', JSON.stringify(aiStack));

    /* Label updaten */
    const label = document.getElementById('compoundsLabel');
    if (label) label.textContent = 'Dein personalisierter NooAI-Stack — ' + aiStack.compounds.length + ' Compounds';

    /* Badge updaten */
    const badge = document.getElementById('resultBadge');
    if (badge) badge.textContent = 'Stack für: ' + (aiStack.reasoning ? 'Personalisiert' : GOAL_LABELS_MAP[goal]);

    /* Compounds rendern */
    renderCompounds();

    /* Locked Section sichtbar machen */
    const locked = document.getElementById('lockedSection');
    if (locked) locked.style.display = 'block';

  } catch (err) {
    console.error('[NooAI] Generation failed:', err);
    aiError = err.message;

    /* Fallback: zeige Fehler */
    const container = document.getElementById('compoundsList');
    if (container) {
      container.innerHTML = '<p style="color:var(--color-muted);padding:2rem;text-align:center;">NooAI konnte deinen Stack nicht generieren. Bitte versuche es erneut.</p>';
    }
  }
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

  /* NooAI starten */
  generateStack();

  /* Smooth scroll */
  document.getElementById('resultContent').scrollIntoView({ behavior: 'smooth' });
}

/* ── Render compounds — kostenloses Preview ── */
function renderCompounds() {
  const list = document.getElementById('compoundsList');
  if (!list) return;

  if (!aiStack || !aiStack.compounds || !aiStack.compounds.length) {
    list.innerHTML = '<p style="color:var(--color-muted);padding:2rem;">Compounds werden geladen…</p>';
    return;
  }

  /* KOSTENLOS: Zeigt nur Namen + Benefit + Mechanismus */
  list.innerHTML = aiStack.compounds.map(function(c, i) {
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

/* ── Stripe checkout — Login-Pflicht + uid ── */
document.querySelectorAll('.btn-checkout').forEach(function(btn) {
  btn.addEventListener('click', async function() {
    var priceId = btn.dataset.price;
    var productType = btn.dataset.product;

    if (!priceId || priceId.includes('_HERE')) {
      alert('Stripe noch nicht konfiguriert.');
      return;
    }

    /* Login-Check */
    var user = firebase.auth().currentUser;
    if (!user) {
      alert('Bitte melde dich an oder erstelle einen Account, um fortzufahren.');
      window.location.href = 'index.html';
      return;
    }

    /* Loading state */
    btn.disabled = true;
    btn.innerHTML = '<span style="opacity:0.7">Wird weitergeleitet…</span>';

    var mode = productType === 'pro' ? 'subscription' : 'onetime';
    var emailInput = document.getElementById('emailInput');
    var email = emailInput ? emailInput.value.trim() : user.email || '';

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

      if (!res.ok) {
        throw new Error(data.error || 'Checkout fehlgeschlagen');
      }

      window.location.href = data.url;

    } catch (err) {
      console.error('Checkout error:', err);
      btn.disabled = false;
      btn.innerHTML = btn.dataset.product === 'pro'
        ? 'Jetzt freischalten <span class="btn-arrow">→</span>'
        : 'Einmalig kaufen';
      alert('Fehler beim Checkout: ' + err.message);
    }
  });
});
