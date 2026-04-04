# Noodrop Website — Feature Update Brief
> For: Qwen Coder / Terminal AI  
> Repo: `github.com/hann369/noodrop`  
> Live: `noodrop.vercel.app`  
> Stack: Vanilla HTML/CSS/JS · Firebase Auth + Firestore · Stripe · Cloudinary · Vercel

---

## CRITICAL: What NOT to change

The following must be preserved exactly as-is. Do not refactor, rename, or redesign these:

- **Design system tokens** — primary color `#E8541A` (orange), cream/off-white palette, dark backgrounds `#111111`
- **Typography** — Clash Display (headings) + Tabular (body), loaded via Fontshare CDN
- **particles.js** background on the landing hero — keep it, don't remove it
- **Firebase config** — do not touch `firebase-config.js` or any auth/Firestore logic
- **Existing page structure** — `index.html`, `library.html`, `stack-builder.html`, `marketplace.html`, `profile.html` stay as-is unless a specific section is listed below
- **i18n system** — EN/DE/PT language switching must continue to work
- **Stripe integration** — existing checkout flows must not break
- **Service worker** — `sw.js` must not be modified
- **CSS variables in `styles-v3.css`** — do not rename or remove existing variables, only add new ones

---

## Context: What we're building

Noodrop is a nootropics research and optimization platform for the German/European market.  
We are adding a **Medvi-inspired conversion funnel** (AI quiz → personalized report → Stripe paywall) on top of the existing design system.  
Additionally, we are adding **LMTLS-inspired trust and transparency UI blocks** to existing product/compound pages.

The goal is **not a redesign** — it's adding new sections and one new page while keeping everything else identical.

---

## New Features to Build

### 1. AI Stack Quiz Flow — `quiz.html` (new page)

**What it is:** A 5-step quiz that leads users to a personalized stack recommendation. Inspired by Medvi's intake flow. The quiz is the primary entry point from the homepage CTA.

**UI requirements:**
- Full-page layout, same dark background as `index.html` (`#111111`)
- Progress bar at top using `#E8541A` orange fill
- One question per step, large centered layout
- Step 1: "Was ist dein Hauptziel?" — options: Fokus, Energie, Schlaf, Stimmung, Gedächtnis
- Step 2: "Wie erfahren bist du mit Nootropics?" — options: Anfänger, Etwas Erfahrung, Fortgeschritten
- Step 3: "Was ist dein größtes Problem?" — options: Brain Fog, Prokrastination, Schlechter Schlaf, Niedriges Energieniveau, Motivation
- Step 4: "Wie ist dein Lifestyle?" — options: Student, Bürojob, Sportler, Kreativer
- Step 5: "Nimmst du aktuell Medikamente oder andere Supplemente?" — options: Nein, Ja (nur Basis-Supps), Ja (Rezeptpflichtig)
- Each option is a clickable card (not a radio button) — active state uses `#E8541A` border
- "Weiter" button advances steps, "Zurück" goes back
- Final step shows a loading animation ("Dein Stack wird berechnet...") for 1.5s, then redirects to `quiz-result.html`
- Store quiz answers in `sessionStorage` as JSON: `{ goal, experience, problem, lifestyle, medication }`
- All text must be wrapped in i18n spans matching the existing i18n pattern in the codebase

**Files to create:** `quiz.html`  
**Files to modify:** `index.html` — change the main hero CTA button to link to `quiz.html` instead of `library.html`

---

### 2. Quiz Result Page — `quiz-result.html` (new page)

**What it is:** The personalized stack report page. Shows a "free" preview of the recommended stack, with key details locked behind a Stripe paywall.

**UI requirements:**
- Same dark layout as rest of site
- Header section: "Dein persönlicher Stack" with the user's goal shown (pulled from `sessionStorage`)
- **Free section** (always visible):
  - Show 2–3 compound names as cards (based on goal mapping below)
  - Each compound card: name, one-line benefit, link to the compound's library page
  - Small "Warum dieses Compound?" toggle that expands a 2-sentence mechanism explanation
- **Locked section** (blurred/locked UI below the free section):
  - Shows a blurred preview of: full dosing protocol, timing guide, cycling schedule, interaction check
  - Overlay with lock icon and CTA: "Vollständiges Protokoll freischalten — €9.99"
  - Stripe Checkout button — use existing Stripe integration pattern from `marketplace.html`
  - Below that: "Oder: Noodrop Pro für €4.99/Monat — enthält alle Protokolle + NooAI"
- **Trust badges row** directly above the CTA: "Nur PubMed-Studien", "Keine versteckten Affiliates", "Impressum vorhanden", "Kein medizinischer Rat"
- After successful Stripe payment: unlock the full content (use Firebase to store purchase state on user's profile)

**Goal → Compound mapping (hardcoded for now):**
```
Fokus      → L-Tyrosin, CDP-Cholin, Koffein+L-Theanin
Energie    → Creatin, Coenzym Q10, Rhodiola Rosea
Schlaf     → Magnesium Glycinat, Ashwagandha, Glycin
Stimmung   → Ashwagandha, L-Theanin, Saffron Extract
Gedächtnis → Bacopa Monnieri, Lion's Mane, Alpha-GPC
```

**Files to create:** `quiz-result.html`

---

### 3. Homepage Hero Section Update — `index.html`

**What to change (section only, not full page):**
- Replace the current secondary CTA (if any) with a single primary CTA: "Finde deinen Stack in 2 Minuten →" linking to `quiz.html`
- Add below the hero headline a small trust line: `"500+ Stacks erstellt · Nur wissenschaftlich belegte Compounds · Kostenlos starten"`
- Do NOT change the particles.js background, the headline text, or the nav

---

### 4. Ingredient Transparency Block — add to `library.html` compound detail sections

**What to add (LMTLS-inspired):**
Each compound detail card/section should gain a new collapsible block at the bottom:

```
[+] Wie es wirkt — Mechanismus
    <short 2-sentence mechanism text, already exists in Firebase data>

[+] Typische Dosierung
    <dosage range from existing data>

[+] Bekannte Interaktionen
    <link to interaction checker or "Keine bekannten Interaktionen" if empty>
```

Use an `<details><summary>` HTML pattern. Style with existing CSS variables.  
Do not touch the Firebase fetch logic — just add the UI block after the existing compound content renders.

---

### 5. Trust Badges Component — new reusable CSS + HTML snippet

**Create a reusable `.trust-badges` component** to be used on `quiz-result.html` and optionally `marketplace.html`:

```html
<div class="trust-badges">
  <span>✓ Nur PubMed-Studien</span>
  <span>✓ Keine versteckten Affiliates</span>
  <span>✓ DSGVO-konform</span>
  <span>✓ Kein medizinischer Rat</span>
</div>
```

CSS: small pill-style badges, muted color (not orange), inline-flex row, wraps on mobile.  
Add the styles to the bottom of `styles-v3.css` under a `/* === Trust Badges === */` comment.

---

### 6. Email Capture before Result Reveal — `quiz-result.html`

**Before showing the free compound cards**, show a one-field email capture:

```
"Wohin sollen wir deinen Stack schicken?"
[email input] [Stack erhalten →]
```

- On submit: store email in Firestore collection `email_leads` with fields `{ email, goal, timestamp }`
- Use existing Firebase Firestore write pattern from the codebase
- After submit (or if user clicks "Überspringen"): reveal the free compound cards
- Do NOT make the email mandatory — "Überspringen" skips this and shows the result anyway

---

## Stripe Products to Create (do manually in Stripe Dashboard)

| Product | Price | Type | Notes |
|---|---|---|---|
| Vollständiges Stack-Protokoll | €9.99 | one-time | per goal type, or one universal product |
| Noodrop Pro | €4.99/Monat | subscription | replaces/supplements existing "Premium Subscription" |

> Note: existing Stripe product IDs are:  
> `prod_U8Ohc1b89z3IWu` (Test Abo)  
> `prod_U83bpgAU5OYuvO` (Premium Subscription)  
> `prod_U81v50Z6UYh0X1` (Basic Guide)

---

## File Summary

| File | Action |
|---|---|
| `quiz.html` | CREATE |
| `quiz-result.html` | CREATE |
| `index.html` | MODIFY — hero CTA + trust line only |
| `library.html` | MODIFY — add ingredient transparency blocks |
| `styles-v3.css` | MODIFY — add `.trust-badges` component at bottom |

---

## Design Rules for New Pages

- Background: `#111111` (matches existing dark pages)
- Primary accent: `#E8541A` (orange)
- Secondary surface: `#1a1a1a` or `#161616` for cards
- Border color for cards: `rgba(232, 84, 26, 0.15)` (orange at low opacity)
- Active/selected state: `#E8541A` border + slight orange tint background
- Font: Clash Display for headings (already loaded globally), system sans-serif fallback for body
- Border radius: `12px` for cards, `8px` for buttons (matches existing)
- All new pages must include the existing `<nav>` and `<footer>` partials/HTML
- Mobile-first: quiz steps must work on 375px width
