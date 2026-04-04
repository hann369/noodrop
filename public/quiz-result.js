/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result.js
   Result page logic: email capture → render compounds → Stripe.
   ═══════════════════════════════════════════════════════════════ */

const answers = JSON.parse(sessionStorage.getItem('noodrop_quiz') || '{}');
const goal = answers.goal || 'focus';
const stack = STACKS[goal] || STACKS.focus;
const experience = answers.experience || 'beginner';
const lifestyle = answers.lifestyle || 'office';
const medication = answers.medication || 'none';

const GOAL_LABELS_MAP = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

/* ── Library link helper ── */
function makeLibraryLink(compound) {
  if (compound.cid) return 'compound.html?cid=' + compound.cid;
  return 'index.html?q=' + encodeURIComponent(compound.name);
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
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(err) { console.error('Error saving lead:', err); });
  }
}

function revealResult() {
  document.getElementById('emailGate').style.display = 'none';
  document.getElementById('resultContent').style.display = 'block';

  /* Update badge with goal */
  const badge = document.getElementById('resultBadge');
  if (badge) badge.textContent = 'Stack für: ' + (GOAL_LABELS_MAP[goal] || goal);

  renderCompounds();

  /* Smooth scroll */
  document.getElementById('resultContent').scrollIntoView({ behavior: 'smooth' });
}

/* ── Render compound cards — kostenloses Preview ── */
function renderCompounds() {
  const list = document.getElementById('compoundsList');
  if (!list) return;

  list.innerHTML = stack.map(function(c, i) {
    var dose = typeof c.dose === 'object' ? (c.dose[experience] || c.dose.beginner) : c.dose;
    var link = makeLibraryLink(c);
    return '<div class="compound-card" style="animation-delay: ' + (i * 80) + 'ms">' +
      '<div class="compound-header">' +
        '<span class="compound-name">' + c.name + '</span>' +
        '<span class="compound-dose-badge">' + dose + '</span>' +
      '</div>' +
      '<p class="compound-benefit">' + c.benefit + '</p>' +
      '<button class="compound-mechanism-toggle" onclick="toggleMechanism(this)">' +
        '+ Wie es wirkt (Mechanismus)' +
      '</button>' +
      '<div class="mechanism-body">' + c.mechanism + '</div>' +
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
      /* User muss eingeloggt sein */
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
