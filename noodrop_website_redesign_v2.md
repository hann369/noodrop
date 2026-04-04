# Noodrop Website — Full Conversion Redesign v2
> Agent: Qwen Coder (Terminal)  
> Repo: `github.com/hann369/noodrop` · Live: `noodrop.vercel.app`  
> Stack: Vanilla HTML/CSS/JS · Firebase Auth + Firestore · Stripe · Cloudinary · Vercel  
> Brief level: Production-grade. Every line of copy, every animation, every spacing decision is specified.

---

## IMMUTABLE — Do Not Touch

| Asset | Reason |
|---|---|
| `firebase-config.js` | Auth + Firestore live config |
| `sw.js` | Service worker — modifying breaks caching |
| `styles-v3.css` CSS variable names | App and extension share these tokens |
| All existing Firebase read/write logic | Stack Builder, Profile, Marketplace data |
| `particles.js` hero background | Core brand visual |
| i18n attribute system (`data-i18n`, `data-i18n-*`) | EN/DE/PT switching |
| Stripe checkout flows in `marketplace.html` | Live payment paths |
| Clash Display + Tabular font loading | Brand typography |

**Rule**: If a file isn't in the "Files to Modify" table at the bottom, don't open it.

---

## Design System Reference

```css
/* Exact tokens — use these everywhere, never hardcode */
--color-bg:          #0e0e0e;   /* true near-black, slightly warmer than #111 */
--color-bg-raised:   #161616;   /* card surfaces */
--color-bg-subtle:   #1c1c1c;   /* input fields, code blocks */
--color-border:      rgba(255,255,255,0.07);  /* default border */
--color-border-glow: rgba(232,84,26,0.25);    /* orange glow border */
--color-orange:      #E8541A;   /* PRIMARY — exact brand value */
--color-orange-dim:  rgba(232,84,26,0.12);    /* tinted bg on hover/active */
--color-orange-mid:  rgba(232,84,26,0.35);    /* progress fills, mid-state */
--color-cream:       #F0EBE0;   /* primary headline text */
--color-text:        #C8C4BC;   /* body text */
--color-muted:       #6B6760;   /* captions, labels */
--color-success:     #3DAA6E;   /* positive states */
--color-danger:      #E84040;   /* warnings, conflicts */

--radius-sm:   6px;
--radius-md:   10px;
--radius-lg:   16px;
--radius-pill: 999px;

--shadow-card: 0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px var(--color-border);
--shadow-glow: 0 0 24px rgba(232,84,26,0.15), 0 0 0 1px var(--color-border-glow);

--font-display: 'Clash Display', sans-serif;  /* already loaded */
--font-body:    'Tabular', sans-serif;         /* already loaded */

--transition-fast:   140ms cubic-bezier(0.2, 0, 0, 1);
--transition-normal: 220ms cubic-bezier(0.2, 0, 0, 1);
--transition-slow:   380ms cubic-bezier(0.2, 0, 0, 1);
```

---

## Feature 1 — `index.html` Hero Section (MODIFY)

### What changes and why

The current hero asks too much of the visitor at once. The single job of the hero is to get them to start the quiz. One headline. One sub-line. One CTA. Everything else is noise.

### Exact copy (DE — i18n wrapped)

```
Headline:    "Dein Gehirn. Optimiert."
Sub:         "Keine Marketing-Versprechen. Nur Compounds, die in klinischen Studien funktionieren.
              Dein persönlicher Stack in 2 Minuten."
CTA button:  "Stack finden →"
Trust line:  "Kostenlos · Kein Account nötig · Basiert auf PubMed-Daten"
```

### HTML structure (replace existing hero CTA block)

```html
<div class="hero-cta-block">
  <p class="hero-sub" data-i18n="hero_sub">
    Keine Marketing-Versprechen. Nur Compounds, die in klinischen Studien funktionieren.
    Dein persönlicher Stack in 2 Minuten.
  </p>
  <a href="quiz.html" class="btn-primary btn-hero" data-i18n="hero_cta">
    Stack finden
    <span class="btn-arrow" aria-hidden="true">→</span>
  </a>
  <p class="hero-trust" data-i18n="hero_trust">
    Kostenlos · Kein Account nötig · Basiert auf PubMed-Daten
  </p>
</div>
```

### CSS additions (append to `styles-v3.css`)

```css
/* === Hero CTA Block === */
.hero-cta-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  text-align: center;
}

.hero-sub {
  font-family: var(--font-body);
  font-size: clamp(15px, 2vw, 17px);
  color: var(--color-text);
  line-height: 1.65;
  max-width: 520px;
  margin: 0 auto;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--color-orange);
  color: #0e0e0e;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.01em;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform var(--transition-fast),
              box-shadow var(--transition-fast),
              background var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.12);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(232,84,26,0.35);
}

.btn-primary:hover::before { opacity: 1; }
.btn-primary:active { transform: translateY(0); }

.btn-hero { font-size: 17px; padding: 16px 40px; }

.btn-arrow {
  display: inline-block;
  transition: transform var(--transition-fast);
}
.btn-primary:hover .btn-arrow { transform: translateX(4px); }

.hero-trust {
  font-size: 13px;
  color: var(--color-muted);
  letter-spacing: 0.02em;
}
```

---

## Feature 2 — `quiz.html` (CREATE — full file)

### UX philosophy

Each step is a single, focused decision. No scrolling. No distraction. The progress bar at the top tells the user exactly where they are. Option cards are large, tappable, and give immediate visual feedback on selection. The "Weiter" button only appears after a selection — this reduces cognitive load and makes the flow feel guided, not form-like.

### Full HTML file

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finde deinen Stack — Noodrop</title>
  <link rel="stylesheet" href="styles-v3.css">
  <link rel="stylesheet" href="quiz.css">
</head>
<body class="quiz-body">

  <!-- Progress bar -->
  <div class="quiz-progress-track">
    <div class="quiz-progress-fill" id="progressFill"></div>
  </div>

  <!-- Back button -->
  <button class="quiz-back" id="backBtn" aria-label="Zurück" style="display:none">
    ← Zurück
  </button>

  <!-- Step counter -->
  <div class="quiz-step-label" id="stepLabel">Schritt 1 von 5</div>

  <!-- Quiz container -->
  <main class="quiz-container" id="quizContainer">

    <!-- Step 1 -->
    <div class="quiz-step active" data-step="1">
      <h1 class="quiz-headline">Was ist dein<br><em>Hauptziel?</em></h1>
      <p class="quiz-desc">Wähle das, was dir gerade am wichtigsten ist.</p>
      <div class="quiz-options" data-key="goal">
        <button class="quiz-option" data-value="focus">
          <span class="option-icon">⚡</span>
          <span class="option-label">Fokus &amp; Konzentration</span>
          <span class="option-sub">Tiefer arbeiten, weniger ablenken lassen</span>
        </button>
        <button class="quiz-option" data-value="energy">
          <span class="option-icon">🔋</span>
          <span class="option-label">Energie &amp; Ausdauer</span>
          <span class="option-sub">Ganztägig leistungsfähig bleiben</span>
        </button>
        <button class="quiz-option" data-value="sleep">
          <span class="option-icon">🌙</span>
          <span class="option-label">Schlaf &amp; Erholung</span>
          <span class="option-sub">Tiefer schlafen, besser regenerieren</span>
        </button>
        <button class="quiz-option" data-value="mood">
          <span class="option-icon">🧠</span>
          <span class="option-label">Stimmung &amp; Resilienz</span>
          <span class="option-sub">Stressresistenter, ausgeglichener sein</span>
        </button>
        <button class="quiz-option" data-value="memory">
          <span class="option-icon">💡</span>
          <span class="option-label">Gedächtnis &amp; Lernen</span>
          <span class="option-sub">Schneller lernen, länger behalten</span>
        </button>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="quiz-step" data-step="2">
      <h1 class="quiz-headline">Wie erfahren bist du<br><em>mit Nootropics?</em></h1>
      <p class="quiz-desc">Das beeinflusst welche Compounds wir empfehlen.</p>
      <div class="quiz-options" data-key="experience">
        <button class="quiz-option" data-value="beginner">
          <span class="option-icon">🌱</span>
          <span class="option-label">Anfänger</span>
          <span class="option-sub">Ich nehme maximal Koffein oder Multivitamine</span>
        </button>
        <button class="quiz-option" data-value="intermediate">
          <span class="option-icon">📈</span>
          <span class="option-label">Etwas Erfahrung</span>
          <span class="option-sub">Ich habe schon 2–3 Supplements ausprobiert</span>
        </button>
        <button class="quiz-option" data-value="advanced">
          <span class="option-icon">🔬</span>
          <span class="option-label">Fortgeschritten</span>
          <span class="option-sub">Ich kenne Racetame, Adaprogene, Cycling-Protokolle</span>
        </button>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="quiz-step" data-step="3">
      <h1 class="quiz-headline">Was ist dein<br><em>größtes Problem?</em></h1>
      <p class="quiz-desc">Sei ehrlich — das macht dein Protokoll präziser.</p>
      <div class="quiz-options" data-key="problem">
        <button class="quiz-option" data-value="brainfog">
          <span class="option-icon">🌫️</span>
          <span class="option-label">Brain Fog</span>
          <span class="option-sub">Gedanken fühlen sich langsam oder unklar an</span>
        </button>
        <button class="quiz-option" data-value="procrastination">
          <span class="option-icon">⏳</span>
          <span class="option-label">Prokrastination</span>
          <span class="option-sub">Ich weiß was ich tun soll, tue es aber nicht</span>
        </button>
        <button class="quiz-option" data-value="sleep_quality">
          <span class="option-icon">😴</span>
          <span class="option-label">Schlechter Schlaf</span>
          <span class="option-sub">Einschlafen oder durchschlafen fällt schwer</span>
        </button>
        <button class="quiz-option" data-value="low_energy">
          <span class="option-icon">📉</span>
          <span class="option-label">Niedriges Energieniveau</span>
          <span class="option-sub">Nachmittags-Crash, ständige Müdigkeit</span>
        </button>
        <button class="quiz-option" data-value="motivation">
          <span class="option-icon">🎯</span>
          <span class="option-label">Fehlende Motivation</span>
          <span class="option-sub">Antrieb da, aber der Funke fehlt</span>
        </button>
      </div>
    </div>

    <!-- Step 4 -->
    <div class="quiz-step" data-step="4">
      <h1 class="quiz-headline">Wie sieht dein<br><em>Alltag aus?</em></h1>
      <p class="quiz-desc">Verschiedene Lifestyles brauchen verschiedene Stacks.</p>
      <div class="quiz-options" data-key="lifestyle">
        <button class="quiz-option" data-value="student">
          <span class="option-icon">📚</span>
          <span class="option-label">Student / Learner</span>
          <span class="option-sub">Viel Lernen, Deadlines, kognitive Ausdauer</span>
        </button>
        <button class="quiz-option" data-value="office">
          <span class="option-icon">💻</span>
          <span class="option-label">Wissensarbeiter</span>
          <span class="option-sub">Meetings, Deep Work, lange Bildschirmzeit</span>
        </button>
        <button class="quiz-option" data-value="athlete">
          <span class="option-icon">🏋️</span>
          <span class="option-label">Athlet / Sportler</span>
          <span class="option-sub">Training + mentale Performance kombinieren</span>
        </button>
        <button class="quiz-option" data-value="creative">
          <span class="option-icon">🎨</span>
          <span class="option-label">Kreativer / Gründer</span>
          <span class="option-sub">Ideenfluss, Flow-States, Resilienz</span>
        </button>
      </div>
    </div>

    <!-- Step 5 -->
    <div class="quiz-step" data-step="5">
      <h1 class="quiz-headline">Nimmst du aktuell<br><em>andere Mittel?</em></h1>
      <p class="quiz-desc">Wichtig für Sicherheit und Interaktions-Check.</p>
      <div class="quiz-options" data-key="medication">
        <button class="quiz-option" data-value="none">
          <span class="option-icon">✓</span>
          <span class="option-label">Nein, nichts</span>
          <span class="option-sub">Nur Essen und vielleicht Kaffee</span>
        </button>
        <button class="quiz-option" data-value="basic">
          <span class="option-icon">💊</span>
          <span class="option-label">Basis-Supplemente</span>
          <span class="option-sub">Vitamin D, Magnesium, Omega-3 o.ä.</span>
        </button>
        <button class="quiz-option" data-value="prescription">
          <span class="option-icon">🏥</span>
          <span class="option-label">Rezeptpflichtige Medikamente</span>
          <span class="option-sub">Ich werde Interaktionen besonders prüfen</span>
        </button>
      </div>
    </div>

    <!-- Loading screen -->
    <div class="quiz-step quiz-loading" data-step="loading">
      <div class="loading-orb"></div>
      <h2 class="loading-headline">Dein Stack wird berechnet...</h2>
      <div class="loading-steps" id="loadingSteps">
        <p class="loading-step active" data-idx="0">Ziel analysiert: <strong id="loadGoal"></strong></p>
        <p class="loading-step" data-idx="1">Erfahrungslevel berücksichtigt</p>
        <p class="loading-step" data-idx="2">Compounds aus PubMed-Datenbank geprüft</p>
        <p class="loading-step" data-idx="3">Interaktionen gecheckt</p>
        <p class="loading-step" data-idx="4">Stack personalisiert ✓</p>
      </div>
    </div>

  </main>

  <!-- Bottom bar with CTA -->
  <div class="quiz-bottom" id="quizBottom" style="display:none">
    <button class="btn-primary btn-quiz-next" id="nextBtn" disabled>
      Weiter <span class="btn-arrow">→</span>
    </button>
  </div>

  <script src="quiz.js"></script>
</body>
</html>
```

### `quiz.css` (CREATE — full file)

```css
/* quiz.css — scoped styles for quiz pages only */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.quiz-body {
  background: var(--color-bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-body);
  color: var(--color-text);
  padding-bottom: 100px;
}

/* Progress bar */
.quiz-progress-track {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: rgba(255,255,255,0.06);
  z-index: 100;
}
.quiz-progress-fill {
  height: 100%;
  background: var(--color-orange);
  transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(232,84,26,0.6);
}

/* Back button */
.quiz-back {
  position: fixed;
  top: 20px; left: 20px;
  background: transparent;
  border: none;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 14px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  z-index: 100;
}
.quiz-back:hover { color: var(--color-text); background: var(--color-bg-raised); }

/* Step counter */
.quiz-step-label {
  margin-top: 52px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

/* Container */
.quiz-container {
  width: 100%;
  max-width: 560px;
  padding: 0 20px;
  margin-top: 28px;
}

/* Step visibility */
.quiz-step { display: none; }
.quiz-step.active {
  display: block;
  animation: stepIn 320ms cubic-bezier(0.2, 0, 0, 1) both;
}
@keyframes stepIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.quiz-step.exit {
  animation: stepOut 220ms cubic-bezier(0.4, 0, 1, 1) both;
}
@keyframes stepOut {
  to { opacity: 0; transform: translateY(-12px); }
}

/* Headlines */
.quiz-headline {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 38px);
  font-weight: 600;
  color: var(--color-cream);
  line-height: 1.2;
  margin-bottom: 10px;
}
.quiz-headline em {
  font-style: normal;
  color: var(--color-orange);
}
.quiz-desc {
  font-size: 15px;
  color: var(--color-muted);
  margin-bottom: 28px;
  line-height: 1.5;
}

/* Option cards */
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quiz-option {
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-template-rows: auto auto;
  column-gap: 14px;
  row-gap: 2px;
  align-items: start;
  padding: 16px 18px;
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: border-color var(--transition-fast),
              background var(--transition-fast),
              transform var(--transition-fast),
              box-shadow var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.quiz-option::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-orange-dim);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.quiz-option:hover {
  border-color: rgba(232,84,26,0.4);
  transform: translateX(3px);
}
.quiz-option:hover::before { opacity: 0.5; }

.quiz-option.selected {
  border-color: var(--color-orange);
  box-shadow: var(--shadow-glow);
  background: var(--color-bg-raised);
}
.quiz-option.selected::before { opacity: 1; }

.option-icon {
  grid-row: 1 / 3;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
}

.option-label {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-cream);
  transition: color var(--transition-fast);
}
.quiz-option.selected .option-label { color: #fff; }

.option-sub {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.4;
}

/* Bottom bar */
.quiz-bottom {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  padding: 16px 20px;
  background: linear-gradient(to top, var(--color-bg) 70%, transparent);
  display: flex;
  justify-content: center;
}
.btn-quiz-next {
  width: 100%;
  max-width: 340px;
  justify-content: center;
  font-size: 16px;
  padding: 16px 32px;
  opacity: 0.4;
  pointer-events: none;
  transition: opacity var(--transition-fast),
              transform var(--transition-fast),
              box-shadow var(--transition-fast);
}
.btn-quiz-next:not([disabled]) {
  opacity: 1;
  pointer-events: all;
}

/* Loading screen */
.quiz-loading { text-align: center; padding-top: 40px; }

.loading-orb {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, var(--color-orange), #7a2a0a);
  margin: 0 auto 28px;
  animation: orbPulse 1.8s ease-in-out infinite;
  box-shadow: 0 0 32px rgba(232,84,26,0.4);
}
@keyframes orbPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 32px rgba(232,84,26,0.4); }
  50%       { transform: scale(1.08); box-shadow: 0 0 48px rgba(232,84,26,0.65); }
}

.loading-headline {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--color-cream);
  margin-bottom: 28px;
}

.loading-steps { display: flex; flex-direction: column; gap: 10px; }
.loading-step {
  font-size: 14px;
  color: var(--color-muted);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 400ms, transform 400ms, color 400ms;
}
.loading-step.active {
  opacity: 1;
  transform: translateY(0);
  color: var(--color-text);
}
.loading-step.done { opacity: 0.5; color: var(--color-success); }

/* Mobile */
@media (max-width: 400px) {
  .quiz-headline { font-size: 26px; }
  .quiz-option { padding: 14px 14px; }
  .option-label { font-size: 14px; }
}
```

### `quiz.js` (CREATE — full file)

```javascript
// quiz.js

const STEPS = ['goal', 'experience', 'problem', 'lifestyle', 'medication'];
const STEP_COUNT = STEPS.length;
const GOAL_LABELS = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

let currentStep = 1;
const answers = {};

const progressFill = document.getElementById('progressFill');
const stepLabel    = document.getElementById('stepLabel');
const backBtn      = document.getElementById('backBtn');
const nextBtn      = document.getElementById('nextBtn');
const quizBottom   = document.getElementById('quizBottom');

function setProgress(step) {
  const pct = ((step - 1) / STEP_COUNT) * 100;
  progressFill.style.width = pct + '%';
  stepLabel.textContent = `Schritt ${step} von ${STEP_COUNT}`;
  backBtn.style.display  = step > 1 ? 'block' : 'none';
}

function showStep(n) {
  const current = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
  const next    = document.querySelector(`.quiz-step[data-step="${n}"]`);
  if (!next) return;

  if (current) {
    current.classList.add('exit');
    setTimeout(() => {
      current.classList.remove('active', 'exit');
    }, 220);
  }

  setTimeout(() => {
    next.classList.add('active');
    currentStep = n;
    setProgress(n);
    quizBottom.style.display = 'flex';
    refreshNextBtn();
  }, 120);
}

function refreshNextBtn() {
  const key = STEPS[currentStep - 1];
  const hasAnswer = !!answers[key];
  nextBtn.disabled = !hasAnswer;
}

// Option selection
document.querySelectorAll('.quiz-options').forEach(group => {
  group.addEventListener('click', e => {
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;

    const key = group.dataset.key;
    const val = btn.dataset.value;

    group.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    answers[key] = val;

    refreshNextBtn();
  });
});

// Next
nextBtn.addEventListener('click', () => {
  if (nextBtn.disabled) return;

  if (currentStep < STEP_COUNT) {
    showStep(currentStep + 1);
  } else {
    startLoading();
  }
});

// Back
backBtn.addEventListener('click', () => {
  if (currentStep > 1) showStep(currentStep - 1);
});

function startLoading() {
  const loadingEl = document.querySelector('.quiz-step[data-step="loading"]');
  const current   = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);

  document.getElementById('loadGoal').textContent =
    GOAL_LABELS[answers.goal] || answers.goal;

  current.classList.add('exit');
  quizBottom.style.display = 'none';
  backBtn.style.display    = 'none';
  stepLabel.textContent    = '';
  progressFill.style.width = '100%';

  setTimeout(() => {
    current.classList.remove('active', 'exit');
    loadingEl.classList.add('active');
    animateLoadingSteps();
  }, 220);
}

function animateLoadingSteps() {
  const steps = document.querySelectorAll('.loading-step');
  let i = 0;
  const interval = setInterval(() => {
    if (i > 0) steps[i - 1].classList.add('done');
    if (i < steps.length) {
      steps[i].classList.add('active');
      i++;
    } else {
      clearInterval(interval);
      sessionStorage.setItem('noodrop_quiz', JSON.stringify(answers));
      setTimeout(() => { window.location.href = 'quiz-result.html'; }, 600);
    }
  }, 480);
}

// Init
setProgress(1);
quizBottom.style.display = 'flex';
```

---

## Feature 3 — `quiz-result.html` (CREATE — full file)

### UX philosophy

The result page has one job: convert. The user just invested ~2 minutes in the quiz — they have skin in the game. The free section gives them real, specific, valuable information (compound names + mechanisms). The locked section shows them exactly what they're missing. The CTA is never more than one scroll away.

**Critical conversion mechanics:**
- Email capture is shown FIRST, framed as "Where to send your stack" not "Subscribe to newsletter"
- The free compounds are specific and personalized — not generic
- The locked section blur is real content, not fake — the user can see the structure of what they're missing
- Trust badges are directly adjacent to the CTA button, not below it
- Price anchoring: show Pro subscription first, one-time second (monthly feels cheaper)

### Compound data (hardcoded — update to Firebase later)

```javascript
// In quiz-result.js
const STACKS = {
  focus: [
    {
      name: 'L-Tyrosin',
      benefit: 'Erhöht Dopamin- und Norepinephrin-Vorstufen bei kognitivem Stress',
      mechanism: 'L-Tyrosin ist der direkte Vorläufer von Dopamin. Unter Stress erschöpft das Gehirn Katecholamine — Tyrosin füllt den Pool wieder auf und verhindert den stressbedingten Leistungsabfall.',
      dose: '500–2000 mg',
      timing: '30–60 Min vor Fokus-Session',
      pubmed: 'PMID: 15729188',
      libraryLink: 'library.html#l-tyrosin'
    },
    {
      name: 'CDP-Cholin (Citicolin)',
      benefit: 'Erhöht Acetylcholin und unterstützt neuronale Membranintegrität',
      mechanism: 'Citicolin liefert sowohl Cholin (Acetylcholin-Vorläufer) als auch Cytidine (→ Uridin → Phosphatidylcholin). Zwei synergistische Effekte in einem Compound.',
      dose: '250–500 mg',
      timing: 'Morgens, mit oder ohne Essen',
      pubmed: 'PMID: 22071706',
      libraryLink: 'library.html#cdp-cholin'
    },
    {
      name: 'Koffein + L-Theanin',
      benefit: 'Schärft Aufmerksamkeit ohne Nervosität — das meistbelegte Nootropics-Stack',
      mechanism: 'L-Theanin (GABA-Modulator, alpha-Wellen-Induktor) puffert den anxiogenen Effekt von Koffein. Das Ergebnis: fokussierte Wachheit ohne Jitter oder Crash.',
      dose: '100 mg Koffein + 200 mg L-Theanin (1:2 Ratio)',
      timing: 'Morgens oder vor Aufgaben',
      pubmed: 'PMID: 18681988',
      libraryLink: 'library.html#koffein'
    }
  ],
  energy: [
    {
      name: 'Creatin Monohydrat',
      benefit: 'Erhöht zerebrale ATP-Resynthese — auch kognitive Leistung nachgewiesen',
      mechanism: 'Creatin erhöht den Phosphocreatinpool im Gehirn. Eine 2003 Oxford-Studie zeigte 14% bessere Arbeitsgedächtnisleistung nach 6 Wochen (5g/Tag) gegenüber Placebo.',
      dose: '3–5 g täglich',
      timing: 'Täglich, Zeitpunkt egal (Sättigung entscheidet)',
      pubmed: 'PMID: 12631461',
      libraryLink: 'library.html#creatin'
    },
    {
      name: 'Coenzym Q10 (Ubiquinol)',
      benefit: 'Mitochondriales Antioxidans — reduziert oxidativen Stress, verbessert ATP-Produktion',
      mechanism: 'CoQ10 ist ein essentieller Kofaktor in der mitochondrialen Elektronentransportkette (Komplex I–III). Ubiquinol ist die reduzierte, bioverfügbarere Form.',
      dose: '100–300 mg Ubiquinol',
      timing: 'Morgens, mit fetthaltiger Mahlzeit',
      pubmed: 'PMID: 14595471',
      libraryLink: 'library.html#coq10'
    },
    {
      name: 'Rhodiola Rosea',
      benefit: 'Adaptogen gegen Erschöpfung — reduziert mentale Müdigkeit in klinischen Trials',
      mechanism: 'Rosavine und Salidroside beeinflussen Monoaminoxidase, COMT und HPA-Achse. Eine 2009 Plazebo-Studie an Ärzten im Nachtdienst zeigte signifikant weniger Burnout-Symptome.',
      dose: '200–400 mg (mind. 3% Rosavine)',
      timing: 'Morgens oder vor Belastungsphasen, nicht abends',
      pubmed: 'PMID: 19016404',
      libraryLink: 'library.html#rhodiola'
    }
  ],
  sleep: [
    {
      name: 'Magnesium Glycinat',
      benefit: 'Entspannt das Nervensystem und unterstützt tiefen Slow-Wave-Schlaf',
      mechanism: 'Magnesium ist Kofaktor für GABA-Synthese und NMDA-Rezeptor-Modulation. Glycinat-Form hat hohe GI-Verträglichkeit und passiert gut die Blut-Hirn-Schranke.',
      dose: '300–400 mg elementares Magnesium',
      timing: '60 Min vor dem Schlafen',
      pubmed: 'PMID: 23853635',
      libraryLink: 'library.html#magnesium'
    },
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Senkt Cortisol nachweislich — direkte Auswirkung auf Einschlafzeit und Schlafqualität',
      mechanism: 'KSM-66-Extrakt reduziert in RCTs Serum-Cortisol um 27.9%. Weniger nächtliches Cortisol = weniger Schlafunterbrechungen in der zweiten Nachthälfte.',
      dose: '300–600 mg KSM-66',
      timing: 'Abends, mit Mahlzeit',
      pubmed: 'PMID: 23439798',
      libraryLink: 'library.html#ashwagandha'
    },
    {
      name: 'Glycin',
      benefit: 'Senkt Körperkerntemperatur und kürzt Einschlafzeit — eines der günstigsten Nootropics',
      mechanism: 'Glycin fördert periphere Vasodilatation, was den Wärmeverlust beschleunigt. Sinkende Körperkerntemperatur ist ein primäres Einschlafsignal. 3g zeigten in Studien -9 Min bis Schlafbeginn.',
      dose: '3 g',
      timing: '30 Min vor dem Schlafen, in Wasser gelöst',
      pubmed: 'PMID: 22293292',
      libraryLink: 'library.html#glycin'
    }
  ],
  mood: [
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Klinisch belegte Cortisol-Reduktion — Rückkopplungseffekt auf Stimmung und Resilienz',
      mechanism: 'KSM-66 normalisiert HPA-Achsen-Dysregulation. Drei 2021-Metaanalysen bestätigen signifikante Reduktion von Stress- und Angstskores gegenüber Placebo.',
      dose: '300–600 mg',
      timing: 'Abends oder aufgeteilt morgens/abends',
      pubmed: 'PMID: 31975514',
      libraryLink: 'library.html#ashwagandha'
    },
    {
      name: 'L-Theanin',
      benefit: 'Fördert alpha-Gehirnwellen — entspannte Wachheit ohne Sedierung',
      mechanism: 'L-Theanin passiert die Blut-Hirn-Schranke und erhöht Alpha-Band-Aktivität (8–14 Hz). Alpha-Wellen korrelieren mit entspannter Fokussierung — der Zustand erfahrener Meditierender.',
      dose: '100–400 mg',
      timing: 'Bei Bedarf, wirkt innerhalb 30–60 Min',
      pubmed: 'PMID: 18296328',
      libraryLink: 'library.html#l-theanin'
    },
    {
      name: 'Saffron Extrakt (Affron)',
      benefit: 'Antidepressive Wirkung vergleichbar mit niedrig dosiertem Fluoxetin in frühen Trials',
      mechanism: 'Safranal und Crocine hemmen Serotonin-Wiederaufnahme und MAO-B. Affron (28mg/Tag) zeigte in einer 2018 RCT signifikante Verbesserung auf der Hamilton Depression Scale.',
      dose: '28–30 mg Affron-Extrakt',
      timing: 'Morgens, mit Mahlzeit',
      pubmed: 'PMID: 30036891',
      libraryLink: 'library.html#saffron'
    }
  ],
  memory: [
    {
      name: 'Bacopa Monnieri',
      benefit: 'Verbessert Gedächtniskonsolidierung — nachgewiesen in multiplen RCTs bei gesunden Erwachsenen',
      mechanism: 'Bacosides A und B fördern Dendritenbildung im Hippocampus. Wirkung setzt nach 8–12 Wochen ein (kein kurzfristiger Boost). Wichtigster Langzeit-Stack für Lernende.',
      dose: '300–450 mg (mind. 45% Bacosides)',
      timing: 'Täglich morgens, mit Fett — braucht 8 Wochen Mindestdauer',
      pubmed: 'PMID: 12093601',
      libraryLink: 'library.html#bacopa'
    },
    {
      name: "Lion's Mane (Hericium erinaceus)",
      benefit: 'Stimuliert NGF (Nerve Growth Factor) — einziger bekannter Nahrungsergänzungsstoff mit dieser Wirkung',
      mechanism: "Hericenone und Erinacine überqueren die Blut-Hirn-Schranke und stimulieren NGF-Synthese im Hippocampus. NGF ist essentiell für neuronales Wachstum und synaptische Plastizität.",
      dose: '500–3000 mg (getrocknetes Fruchtfleisch oder Extrakt)',
      timing: 'Täglich morgens, mit Mahlzeit',
      pubmed: 'PMID: 20834180',
      libraryLink: 'library.html#lions-mane'
    },
    {
      name: 'Alpha-GPC',
      benefit: 'Schnellste cholinergene Verbindung — erhöht Acetylcholin-Spiegel rapide im Arbeitsgedächtnis',
      mechanism: 'Alpha-GPC liefert mehr Cholin ans Gehirn als jede andere Cholinquelle (höhere BBB-Permeabilität als CDP-Cholin). Ideal vor kognitiv anspruchsvollen Aufgaben.',
      dose: '300–600 mg',
      timing: '30–60 Min vor Lern- oder Arbeitssession',
      pubmed: 'PMID: 14613462',
      libraryLink: 'library.html#alpha-gpc'
    }
  ]
};
```

### `quiz-result.html` structure

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dein Stack — Noodrop</title>
  <link rel="stylesheet" href="styles-v3.css">
  <link rel="stylesheet" href="quiz-result.css">
</head>
<body class="result-body">

  <nav><!-- same nav as index.html --></nav>

  <div class="result-wrapper">

    <!-- Email capture gate -->
    <section class="email-gate" id="emailGate">
      <div class="email-gate-inner">
        <div class="result-badge">Dein Stack ist fertig</div>
        <h1 class="result-headline">Wohin sollen wir<br><em>deinen Stack schicken?</em></h1>
        <p class="result-sub">Du bekommst dein Protokoll per Mail — plus wöchentliche Compound-Updates. Abmeldung jederzeit.</p>
        <div class="email-form">
          <input type="email" id="emailInput" placeholder="deine@email.de" class="email-input" autocomplete="email">
          <button class="btn-primary" id="emailSubmit">
            Stack erhalten <span class="btn-arrow">→</span>
          </button>
        </div>
        <button class="skip-link" id="skipEmail">Überspringen →</button>
      </div>
    </section>

    <!-- Result content (hidden until email submitted or skipped) -->
    <div class="result-content" id="resultContent" style="display:none">

      <!-- Header -->
      <div class="result-header">
        <div class="result-badge" id="resultBadge">Stack für: Fokus</div>
        <h1 class="result-headline">Dein persönlicher<br><em>Nootropics-Stack</em></h1>
        <p class="result-sub">
          Basierend auf deinen Antworten — jede Empfehlung ist mit PubMed-Studien belegt.
        </p>
      </div>

      <!-- Free compounds -->
      <section class="compounds-free">
        <div class="section-label">
          <span class="label-dot free"></span>
          Deine 3 Kern-Compounds — kostenlos
        </div>
        <div class="compounds-list" id="compoundsList"></div>
      </section>

      <!-- Locked section -->
      <section class="locked-section">
        <div class="section-label">
          <span class="label-dot locked"></span>
          Vollständiges Protokoll
        </div>

        <!-- Blurred preview -->
        <div class="locked-preview">
          <div class="locked-blur">
            <div class="protocol-preview-row">
              <span class="pp-label">Dosierungs-Protokoll</span>
              <span class="pp-value blurred">████ mg morgens · ████ mg vor Training</span>
            </div>
            <div class="protocol-preview-row">
              <span class="pp-label">Timing-Guide</span>
              <span class="pp-value blurred">████████████████████████████</span>
            </div>
            <div class="protocol-preview-row">
              <span class="pp-label">Cycling-Schema</span>
              <span class="pp-value blurred">████ on · ████ off · Reset-Protokoll</span>
            </div>
            <div class="protocol-preview-row">
              <span class="pp-label">Interaktions-Check</span>
              <span class="pp-value blurred">██ Interaktionen geprüft · ██ Warnungen</span>
            </div>
            <div class="protocol-preview-row">
              <span class="pp-label">Kaufempfehlungen</span>
              <span class="pp-value blurred">Beste EU-Quellen · Preis-Leistung</span>
            </div>
          </div>
          <div class="locked-overlay">
            <div class="lock-icon">🔒</div>
            <p>Vollständiges Protokoll freischalten</p>
          </div>
        </div>

        <!-- Pricing -->
        <div class="pricing-block">

          <!-- Pro (show first — price anchoring) -->
          <div class="pricing-card featured">
            <div class="pricing-badge">Beliebteste Wahl</div>
            <div class="pricing-name">Noodrop Pro</div>
            <div class="pricing-price">€4,99 <span>/Monat</span></div>
            <ul class="pricing-features">
              <li>✓ Alle Stack-Protokolle (unbegrenzt)</li>
              <li>✓ Monatliche Stack-Updates</li>
              <li>✓ NooAI Chat — unbegrenzt</li>
              <li>✓ Interaktions-Checker</li>
              <li>✓ Chrome Extension</li>
            </ul>
            <!-- Trust badges DIRECTLY above CTA -->
            <div class="trust-badges">
              <span>✓ PubMed-only</span>
              <span>✓ DSGVO</span>
              <span>✓ Jederzeit kündbar</span>
              <span>✓ Kein Med.-Rat</span>
            </div>
            <button class="btn-primary btn-checkout" data-product="pro" data-price="price_PRO_ID_HERE">
              Jetzt freischalten <span class="btn-arrow">→</span>
            </button>
          </div>

          <!-- One-time -->
          <div class="pricing-card">
            <div class="pricing-name">Dieses Protokoll</div>
            <div class="pricing-price">€9,99 <span>einmalig</span></div>
            <ul class="pricing-features">
              <li>✓ Vollständiges Protokoll für diesen Stack</li>
              <li>✓ PDF-Download</li>
              <li>✓ Interaktions-Check</li>
            </ul>
            <button class="btn-primary btn-outline btn-checkout" data-product="onetime" data-price="price_ONETIME_ID_HERE">
              Einmalig kaufen
            </button>
          </div>

        </div>
      </section>

    </div>
  </div>

  <script src="quiz-result-data.js"></script><!-- STACKS object -->
  <script src="quiz-result.js"></script>
</body>
</html>
```

### `quiz-result.css` (CREATE — key rules)

```css
.result-body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); }

.result-wrapper { max-width: 680px; margin: 0 auto; padding: 60px 20px 80px; }

/* Email gate */
.email-gate { min-height: 70vh; display: flex; align-items: center; }
.email-gate-inner { width: 100%; }

.result-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-orange-dim);
  border: 1px solid var(--color-border-glow);
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-family: var(--font-display);
  color: var(--color-orange);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.result-headline {
  font-family: var(--font-display);
  font-size: clamp(30px, 5vw, 42px);
  font-weight: 600;
  color: var(--color-cream);
  line-height: 1.15;
  margin-bottom: 14px;
}
.result-headline em { font-style: normal; color: var(--color-orange); }

.result-sub { font-size: 16px; color: var(--color-muted); line-height: 1.6; margin-bottom: 28px; max-width: 480px; }

.email-form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
.email-input {
  flex: 1; min-width: 200px;
  padding: 14px 16px;
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color var(--transition-fast);
}
.email-input:focus { outline: none; border-color: var(--color-border-glow); }
.email-input::placeholder { color: var(--color-muted); }

.skip-link { background: none; border: none; color: var(--color-muted); font-size: 13px; cursor: pointer; text-decoration: underline; }
.skip-link:hover { color: var(--color-text); }

/* Compound cards */
.section-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--color-muted); margin-bottom: 16px;
}
.label-dot { width: 8px; height: 8px; border-radius: 50%; }
.label-dot.free { background: var(--color-success); }
.label-dot.locked { background: var(--color-orange); }

.compounds-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }

.compound-card {
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.compound-card:hover { border-color: var(--color-border-glow); box-shadow: var(--shadow-glow); }

.compound-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
.compound-name { font-family: var(--font-display); font-size: 17px; font-weight: 600; color: var(--color-cream); }
.compound-dose-badge {
  font-size: 11px; font-family: var(--font-display);
  padding: 3px 10px;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-muted);
  white-space: nowrap;
}
.compound-benefit { font-size: 14px; color: var(--color-text); margin-bottom: 12px; line-height: 1.5; }

.compound-mechanism-toggle {
  background: none; border: none; cursor: pointer;
  font-size: 13px; color: var(--color-orange);
  padding: 0; display: flex; align-items: center; gap: 6px;
  font-family: var(--font-body);
  transition: opacity var(--transition-fast);
}
.compound-mechanism-toggle:hover { opacity: 0.75; }
.mechanism-body {
  margin-top: 12px;
  padding: 14px 16px;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--color-orange);
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.65;
  display: none;
}
.mechanism-body.open { display: block; animation: fadeIn 200ms ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

.compound-meta { display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; }
.compound-meta-item { font-size: 12px; color: var(--color-muted); }
.compound-meta-item strong { color: var(--color-text); font-weight: 500; }
.compound-pubmed { font-size: 11px; color: var(--color-muted); margin-top: 8px; }
.compound-library-link {
  display: inline-block; margin-top: 10px;
  font-size: 13px; color: var(--color-orange); text-decoration: none;
  transition: opacity var(--transition-fast);
}
.compound-library-link:hover { opacity: 0.75; }

/* Locked section */
.locked-preview {
  position: relative; border-radius: var(--radius-lg); overflow: hidden;
  border: 1px solid var(--color-border); margin-bottom: 28px;
}
.locked-blur { padding: 20px; filter: blur(5px); user-select: none; pointer-events: none; }
.protocol-preview-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--color-border); gap: 20px; }
.protocol-preview-row:last-child { border-bottom: none; }
.pp-label { font-size: 13px; color: var(--color-text); font-family: var(--font-display); font-weight: 500; }
.pp-value { font-size: 13px; color: var(--color-muted); }
.blurred { letter-spacing: -0.04em; }

.locked-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(14,14,14,0.6) 0%, rgba(14,14,14,0.85) 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
}
.lock-icon { font-size: 28px; }
.locked-overlay p { font-family: var(--font-display); font-size: 15px; color: var(--color-cream); }

/* Pricing */
.pricing-block { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 500px) { .pricing-block { grid-template-columns: 1fr; } }

.pricing-card {
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
  display: flex; flex-direction: column; gap: 12px;
}
.pricing-card.featured { border-color: var(--color-border-glow); box-shadow: var(--shadow-glow); }

.pricing-badge {
  display: inline-block; font-size: 11px; font-family: var(--font-display);
  padding: 3px 10px; background: var(--color-orange); color: #0e0e0e;
  border-radius: var(--radius-pill); width: fit-content;
}
.pricing-name { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--color-cream); }
.pricing-price { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--color-orange); }
.pricing-price span { font-size: 14px; color: var(--color-muted); font-weight: 400; }

.pricing-features { list-style: none; display: flex; flex-direction: column; gap: 7px; flex: 1; }
.pricing-features li { font-size: 13px; color: var(--color-text); line-height: 1.4; }

/* Trust badges */
.trust-badges {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 10px 0; border-top: 1px solid var(--color-border);
}
.trust-badges span {
  font-size: 11px; font-family: var(--font-display);
  color: var(--color-muted); letter-spacing: 0.02em;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-orange);
  color: var(--color-orange);
}
.btn-outline:hover { background: var(--color-orange-dim); }
.btn-checkout { width: 100%; justify-content: center; margin-top: auto; }
```

### `quiz-result.js` (CREATE — core logic)

```javascript
// quiz-result.js

const answers = JSON.parse(sessionStorage.getItem('noodrop_quiz') || '{}');
const goal = answers.goal || 'focus';
const stack = STACKS[goal] || STACKS.focus;

const GOAL_LABELS = {
  focus: 'Fokus & Konzentration',
  energy: 'Energie & Ausdauer',
  sleep: 'Schlaf & Erholung',
  mood: 'Stimmung & Resilienz',
  memory: 'Gedächtnis & Lernen'
};

// Email gate
document.getElementById('emailSubmit').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value.trim();
  if (!email || !email.includes('@')) {
    document.getElementById('emailInput').style.borderColor = 'var(--color-danger)';
    return;
  }
  saveEmailLead(email);
  revealResult();
});
document.getElementById('skipEmail').addEventListener('click', revealResult);

function saveEmailLead(email) {
  // Use existing Firebase Firestore write pattern
  if (typeof db !== 'undefined') {
    db.collection('email_leads').add({
      email,
      goal,
      experience: answers.experience,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(console.error);
  }
}

function revealResult() {
  document.getElementById('emailGate').style.display = 'none';
  document.getElementById('resultBadge').textContent = 'Stack für: ' + GOAL_LABELS[goal];
  renderCompounds();
  document.getElementById('resultContent').style.display = 'block';
  document.getElementById('resultContent').scrollIntoView({ behavior: 'smooth' });
}

function renderCompounds() {
  const list = document.getElementById('compoundsList');
  list.innerHTML = stack.map((c, i) => `
    <div class="compound-card" style="animation-delay: ${i * 80}ms">
      <div class="compound-header">
        <span class="compound-name">${c.name}</span>
        <span class="compound-dose-badge">${c.dose}</span>
      </div>
      <p class="compound-benefit">${c.benefit}</p>
      <button class="compound-mechanism-toggle" onclick="toggleMechanism(this)">
        + Wie es wirkt (Mechanismus)
      </button>
      <div class="mechanism-body">${c.mechanism}</div>
      <div class="compound-meta">
        <div class="compound-meta-item"><strong>Timing:</strong> ${c.timing}</div>
      </div>
      <div class="compound-pubmed">Studie: ${c.pubmed}</div>
      <a href="${c.libraryLink}" class="compound-library-link">Im Compound-Archiv ansehen →</a>
    </div>
  `).join('');
}

function toggleMechanism(btn) {
  const body = btn.nextElementSibling;
  body.classList.toggle('open');
  btn.textContent = body.classList.contains('open')
    ? '− Mechanismus ausblenden'
    : '+ Wie es wirkt (Mechanismus)';
}

// Stripe checkout — use same pattern as marketplace.html
document.querySelectorAll('.btn-checkout').forEach(btn => {
  btn.addEventListener('click', () => {
    const priceId = btn.dataset.price;
    if (!priceId || priceId.includes('_HERE')) {
      alert('Stripe noch nicht konfiguriert — Price ID in quiz-result.html eintragen.');
      return;
    }
    // Call existing Stripe checkout function from marketplace.html
    if (typeof initiateCheckout === 'function') {
      initiateCheckout(priceId);
    }
  });
});
```

---

## Feature 4 — `library.html` Ingredient Transparency (MODIFY)

After each compound's existing content block renders (in the Firebase callback), append:

```javascript
// Add after existing compound detail render in library.html JS

function appendTransparencyBlock(compound) {
  const container = document.querySelector('.compound-detail-content');
  if (!container) return;

  const block = document.createElement('div');
  block.className = 'transparency-block';
  block.innerHTML = `
    <div class="tb-divider"></div>
    <div class="tb-row">
      <details class="tb-detail">
        <summary class="tb-summary">Wirkmechanismus</summary>
        <p class="tb-body">${compound.mechanism || 'Wird ergänzt.'}</p>
      </details>
    </div>
    <div class="tb-row">
      <details class="tb-detail">
        <summary class="tb-summary">Typische Dosierung</summary>
        <p class="tb-body">${compound.dosage || 'Sieh die Compound-Seite für Details.'}</p>
      </details>
    </div>
    <div class="tb-row">
      <details class="tb-detail">
        <summary class="tb-summary">Bekannte Interaktionen</summary>
        <p class="tb-body">${compound.interactions?.length
          ? compound.interactions.join(', ')
          : 'Keine bekannten klinisch relevanten Interaktionen.'}</p>
      </details>
    </div>
  `;
  container.appendChild(block);
}
```

```css
/* === Ingredient Transparency Block === */
.transparency-block { margin-top: 24px; }
.tb-divider { height: 1px; background: var(--color-border); margin-bottom: 16px; }
.tb-row { border-bottom: 1px solid var(--color-border); }
.tb-row:last-child { border-bottom: none; }
.tb-detail { width: 100%; }
.tb-summary {
  padding: 13px 0;
  cursor: pointer;
  font-size: 14px;
  font-family: var(--font-display);
  font-weight: 500;
  color: var(--color-text);
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  transition: color var(--transition-fast);
}
.tb-summary:hover { color: var(--color-cream); }
.tb-summary::after { content: '+'; color: var(--color-orange); font-size: 16px; }
.tb-detail[open] .tb-summary::after { content: '−'; }
.tb-body {
  padding: 0 0 14px;
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.65;
}
```

---

## Feature 5 — `styles-v3.css` additions (MODIFY — append only)

```css
/* === Trust Badges === */
.trust-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
}

.trust-badges span {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--color-muted);
  letter-spacing: 0.03em;
  white-space: nowrap;
}

/* Standalone use (not inside pricing card) */
.trust-badges--standalone {
  justify-content: center;
  padding: 14px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  margin: 20px 0;
}

/* === Utility classes used across new pages === */
.text-orange { color: var(--color-orange); }
.text-cream  { color: var(--color-cream); }
.text-muted  { color: var(--color-muted); }
.font-display { font-family: var(--font-display); }

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
```

---

## i18n Keys to Add

Add these to your EN/DE/PT translation objects (matching existing pattern):

```javascript
// DE
hero_sub: "Keine Marketing-Versprechen. Nur Compounds, die in klinischen Studien funktionieren. Dein persönlicher Stack in 2 Minuten.",
hero_cta: "Stack finden",
hero_trust: "Kostenlos · Kein Account nötig · Basiert auf PubMed-Daten",
quiz_step_label: "Schritt {n} von 5",
quiz_next: "Weiter",
quiz_back: "Zurück",
quiz_loading: "Dein Stack wird berechnet...",
result_email_headline: "Wohin sollen wir deinen Stack schicken?",
result_email_cta: "Stack erhalten",
result_skip: "Überspringen →",

// EN
hero_sub: "No marketing claims. Only compounds proven in clinical studies. Your personal stack in 2 minutes.",
hero_cta: "Find my stack",
hero_trust: "Free · No account required · Based on PubMed data",
// ... etc
```

---

## Stripe Products — Create in Dashboard

| Product | Price ID variable | Amount | Type |
|---|---|---|---|
| Vollständiges Stack-Protokoll | `price_ONETIME_ID_HERE` | €9.99 | one_time |
| Noodrop Pro | `price_PRO_ID_HERE` | €4.99 | recurring monthly |

After creating in Stripe Dashboard, replace the placeholder strings in `quiz-result.html`.

---

## File Summary

| File | Action | Touch existing logic? |
|---|---|---|
| `quiz.html` | CREATE | No |
| `quiz.css` | CREATE | No |
| `quiz.js` | CREATE | No |
| `quiz-result.html` | CREATE | No |
| `quiz-result.css` | CREATE | No |
| `quiz-result.js` | CREATE | No |
| `quiz-result-data.js` | CREATE | No |
| `index.html` | MODIFY — hero CTA block only | No |
| `library.html` | MODIFY — append JS + CSS for transparency block | No — appends after existing Firebase callback |
| `styles-v3.css` | MODIFY — append at bottom | No |

**Zero existing Firebase, Stripe, or auth logic is modified.**
