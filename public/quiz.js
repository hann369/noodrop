/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz.js  v2
   11-Schritte Quiz: MC, Slider, Freitext.
   Sendet alle Antworten an NooAI API → personalisierter Stack.
   ═══════════════════════════════════════════════════════════════ */

/* Alle 11 Schritte — welche brauchen Auswahl, welche nicht */
const SELECT_STEPS = [1, 2, 3, 4, 5, 6, 7];  /* MC — Auswahl required */
const SLIDER_STEPS = [8, 9];                  /* Slider — haben Default-Wert */
const TEXT_STEPS = [10, 11];                   /* Freitext — optional */
const STEP_COUNT = 11;

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

/* ── Slider Setup ── */
const sleepSlider = document.getElementById('sleepSlider');
const sleepValue  = document.getElementById('sleepValue');
const stressSlider = document.getElementById('stressSlider');
const stressValue  = document.getElementById('stressValue');

if (sleepSlider) {
  sleepSlider.addEventListener('input', function() {
    sleepValue.textContent = sleepSlider.value + ' / 10';
    answers.sleep_quality = parseInt(sleepSlider.value);
    refreshNextBtn();
  });
  answers.sleep_quality = parseInt(sleepSlider.value);
}

if (stressSlider) {
  stressSlider.addEventListener('input', function() {
    stressValue.textContent = stressSlider.value + ' / 10';
    answers.stress_level = parseInt(stressSlider.value);
    refreshNextBtn();
  });
  answers.stress_level = parseInt(stressSlider.value);
}

/* ── Freitext Counter ── */
const notesInput = document.getElementById('notesInput');
const notesCount = document.getElementById('notesCount');
if (notesInput) {
  notesInput.addEventListener('input', function() {
    notesCount.textContent = notesInput.value.length;
    answers.notes = notesInput.value.trim();
    refreshNextBtn(); /* Freitext ist optional — Button immer aktiv ab Schritt 10 */
  });
  answers.notes = '';
}

const expectationsInput = document.getElementById('expectationsInput');
const expectationsCount = document.getElementById('expectationsCount');
if (expectationsInput) {
  expectationsInput.addEventListener('input', function() {
    expectationsCount.textContent = expectationsInput.value.length;
    answers.expectations = expectationsInput.value.trim();
  });
  answers.expectations = '';
}

/* ── Progress ── */
function setProgress(step) {
  const pct = ((step - 1) / STEP_COUNT) * 100;
  progressFill.style.width = pct + '%';
  stepLabel.textContent = `Frage ${step} von ${STEP_COUNT}`;
  backBtn.style.display  = step > 1 ? 'block' : 'none';
}

/* ── Step Navigation ── */
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

    /* Letzter Schritt: Button-Text ändern */
    if (currentStep === 11) {
      nextBtn.innerHTML = 'Deinen Stack generieren <span class="btn-arrow">→</span>';
    } else {
      nextBtn.innerHTML = 'Weiter <span class="btn-arrow">→</span>';
    }
  }, 120);
}

function refreshNextBtn() {
  if (TEXT_STEPS.includes(currentStep)) {
    /* Freitext ist optional — immer weiter */
    nextBtn.disabled = false;
    return;
  }
  if (SLIDER_STEPS.includes(currentStep)) {
    /* Slider hat immer einen Wert */
    nextBtn.disabled = false;
    return;
  }
  /* MC steps — brauchen Auswahl */
  const stepKey = getStepKey(currentStep);
  const hasAnswer = !!answers[stepKey];
  nextBtn.disabled = !hasAnswer;
}

function getStepKey(step) {
  const keys = ['goal', 'experience', 'problem', 'lifestyle', 'medication', 'caffeine', 'budget', 'sleep_quality', 'stress_level', 'notes', 'expectations'];
  return keys[step - 1];
}

/* ── MC Option Selection ── */
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

/* ── Next Button ── */
nextBtn.addEventListener('click', () => {
  if (nextBtn.disabled) return;

  if (currentStep < STEP_COUNT) {
    showStep(currentStep + 1);
  } else {
    startNooAIGeneration();
  }
});

/* ── Back Button ── */
backBtn.addEventListener('click', () => {
  if (currentStep > 1) showStep(currentStep - 1);
});

/* ── NooAI Generation ── */
function startNooAIGeneration() {
  const loadingEl = document.querySelector('.quiz-step[data-step="loading"]');
  const current   = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);

  answers.goal_label = GOAL_LABELS[answers.goal] || answers.goal;

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
      /* Quiz-Antworten speichern und zur Result-Seite */
      sessionStorage.setItem('noodrop_quiz', JSON.stringify(answers));
      setTimeout(() => { window.location.href = 'quiz-result.html'; }, 600);
    }
  }, 480);
}

/* ── Init ── */
setProgress(1);
quizBottom.style.display = 'flex';
