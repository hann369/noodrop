/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz.js
   Stack Quiz flow logic.
   ═══════════════════════════════════════════════════════════════ */

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

// ── Option selection ──
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

// ── Next ──
nextBtn.addEventListener('click', () => {
  if (nextBtn.disabled) return;

  if (currentStep < STEP_COUNT) {
    showStep(currentStep + 1);
  } else {
    startLoading();
  }
});

// ── Back ──
backBtn.addEventListener('click', () => {
  if (currentStep > 1) showStep(currentStep - 1);
});

// ── Loading sequence ──
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

// ── Init ──
setProgress(1);
quizBottom.style.display = 'flex';
