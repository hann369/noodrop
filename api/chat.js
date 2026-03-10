// api/chat.js — Vercel Serverless Function
// Proxies requests to Groq. GROQ_API_KEY stays server-side, never exposed.

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL        = 'llama-3.3-70b-versatile'; // free on Groq

// ── Full Noodrop compound + interaction context ────────────────────
const COMPOUND_CONTEXT = `=== NOODROP COMPOUND DATABASE ===

## Piracetam (Racetams)
Description: The original racetam. Enhances memory formation and learning ability.
Mechanism: Modulates membrane fluidity and enhances synaptic plasticity. Improves blood flow and oxygen utilization in the brain.
Dosage: Standard: 1200-2400 mg daily (3 doses) | Typical: 800 mg 2-3 times daily | Loading: 4800 mg for first 2 weeks
Benefits: Memory, Learning, Neuroprotection, Cognitive enhancement
Side effects: Headache, Nervousness, Insomnia (rare)
Warnings: Takes 2-4 weeks to notice benefits | Interacts with anticoagulants | Not recommended during lactation

## Aniracetam (Racetams)
Description: Fast-acting ampakine racetam with anxiolytic properties.
Mechanism: AMPA receptor positive allosteric modulator, weak mGluR2 agonist, PDE inhibition.
Dosage: Standard: 750-1500 mg (2-3x daily) | Max: 3000 mg/day
Benefits: Enhanced cognition, Reduced anxiety, Improved memory consolidation, Mood enhancement
Side effects: Headache (cholinergic), GI upset, Insomnia (high doses)
Warnings: Short half-life requires multiple doses | Fat-soluble - take with food | Stack with choline source

## Alpha-GPC (Cholinergics)
Description: Highly bioavailable choline source that boosts acetylcholine levels.
Mechanism: Provides choline that crosses blood-brain barrier for acetylcholine synthesis.
Dosage: Standard: 600 mg daily (2 x 300 mg) | Performance: 600-1200 mg daily
Benefits: Memory, Power output, Learning capacity
Side effects: Headache (high acetylcholine), Insomnia if taken late
Warnings: Take morning/early afternoon | May interact with acetylcholinesterase inhibitors

## Caffeine (Stimulants)
Description: CNS stimulant that wards off drowsiness and restores alertness.
Mechanism: Antagonizes adenosine receptors. Increases dopamine and norepinephrine release.
Dosage: Single dose: 50-200 mg | Daily limit: 400 mg | Optimal focus: 100-200 mg
Benefits: Alertness, Focus, Physical performance
Side effects: Jitteriness, Anxiety, Sleep disruption, Dependency
Warnings: Max 400mg/day | Avoid after 2 PM | Can increase anxiety in sensitive individuals

## Modafinil (Stimulants)
Description: Prescription wakefulness-promoting agent.
Mechanism: Selective dopamine reuptake inhibitor. Increases histamine and orexin. Not an amphetamine.
Dosage: Medical: 100-200 mg daily (prescription) | Off-label: 100 mg
Benefits: Wakefulness, Focus, Executive function, Sustained energy
Side effects: Headache, Nausea, Insomnia, Anxiety, Tolerance
Warnings: PRESCRIPTION REQUIRED | Cycle to avoid tolerance | Avoid with other stimulants

## 4F-Phenibut (GABAergics)
Description: Fluorinated Phenibut derivative with stronger anxiolytic effects.
Mechanism: GABA-B receptor agonist, higher lipophilicity than Phenibut.
Dosage: Start: 100-250 mg | Standard: 250-500 mg | Max: 1000 mg
Benefits: Anxiety reduction, Social confidence, Sleep improvement
Side effects: Tolerance, Withdrawal, Dependence, Grogginess
Warnings: HIGH DEPENDENCE RISK - use max 1-2x/week | Severe withdrawal possible | AVOID ALCOHOL completely

## 9-Me-BC (Novel Stimulants)
Description: Beta-carboline with strong dopaminergic and neuroprotective activity.
Mechanism: MAO inhibitor, dopamine synthesis enhancer.
Dosage: Very potent - start 5-10 mg | Light: 10-20 mg
Side effects: Cardiovascular stress, Anxiety, Limited research
Warnings: EXTREMELY POTENT | CARDIOVASCULAR RISK | MAOI properties - dangerous interactions | HIGH ABUSE POTENTIAL

## Bromantane (Adaptogens)
Description: Russian nootropic/adaptogen with mild stimulant and anabolic properties.
Mechanism: Dopamine/serotonin modulation, weak MAO inhibition.
Dosage: Standard: 50-100 mg daily
Benefits: Physical performance, Mental clarity, Stress resistance
Warnings: Legal status varies by country | Limited western research

## L-Theanine (Adaptogens)
Description: Green tea amino acid. Calm, focused energy without drowsiness.
Mechanism: Increases alpha brain waves. Modulates glutamate/GABA. Synergistic with caffeine.
Dosage: Standard: 100-200 mg | With caffeine: 100-200 mg theanine + 50-100 mg caffeine (2:1 ratio)
Benefits: Calm focus, Relaxation, Better sleep, Reduced anxiety
Side effects: Very rare - mild headache, nausea at high doses
Warnings: VERY SAFE | No withdrawal or dependency | FDA safe during pregnancy

## Bacopa Monnieri (Adaptogens)
Description: Ayurvedic herb for memory enhancement and anxiety.
Mechanism: Enhances neurotransmitter signaling via bacosides. Antioxidant. Reduces acetylcholinesterase.
Dosage: Standard: 300-600 mg daily (50% bacosides) | Minimum 12 weeks for full effect
Benefits: Memory consolidation, Neuroprotection, Anxiety reduction
Side effects: Mild nausea, Initial fatigue, GI issues
Warnings: SAFE - 3000+ years use | Takes 12 weeks - be patient | Take with food

## Agmatine Sulfate (Miscellaneous)
Description: Endogenous polyamine with NMDA antagonist properties.
Mechanism: NMDA antagonist, imidazoline receptor agonist, nitric oxide modulator.
Dosage: Standard: 500-750 mg | Therapeutic: 1000-2500 mg
Benefits: Pain relief, Neuroprotection, Mood
Side effects: GI upset, Blood pressure changes
Warnings: Lowers blood pressure | May interact with MAOIs | Take away from protein

## Allopregnanolone (Neurosteroids)
Description: Endogenous neurosteroid with potent GABA-A positive allosteric modulation.
Dosage: Prescription only (Zulresso)
Benefits: Anti-anxiety, Antidepressant, Neurogenesis
Warnings: PRESCRIPTION ONLY | Paradoxical reactions possible | PREGNANCY CONTRAINDICATED

## Cerebrolysin (Peptides)
Description: Neurotrophic peptide mixture promoting neuronal growth.
Mechanism: Contains BDNF/NGF/GDNF mimetics.
Warnings: CLINICAL USE ONLY | Injection required | Expensive

## Coluracetam (Racetams)
Description: Potent racetam with unique high-affinity choline uptake enhancement (HACU).
Mechanism: Enhances HACU in neurons, increasing acetylcholine synthesis. Also modulates AMPA receptors.
Dosage: Standard: 20-80 mg daily (divided doses) | Max: 240 mg/day (3 doses)
Benefits: Memory enhancement, Mood improvement, Visual acuity, Neuroprotection
Side effects: Headache (cholinergic), GI upset, Insomnia (high doses)
Warnings: Potent cholinergic — start low | Pair with choline source | Short half-life (1-2h), multiple doses needed

## Citicoline Sodium / CDP-Choline (Cholinergics)
Description: Precursor to phosphatidylcholine and acetylcholine, highly bioavailable choline source.
Mechanism: Provides choline for ACh synthesis, supports neuronal membrane phospholipids, enhances cerebral blood flow.
Dosage: Standard: 250-500 mg daily | Therapeutic: up to 2000 mg/day (divided)
Benefits: Cognitive enhancement, Neuroprotection, Memory support, Focus
Side effects: GI upset, Headache, Insomnia (rare), Dizziness (rare)
Warnings: Generally safe | May cause GI discomfort at high doses

## Aticaprant (CRF Antagonists)
Description: Investigational CRF1 receptor antagonist for depression and anxiety. Not approved for sale.
Mechanism: Corticotropin-releasing factor type 1 receptor antagonist — blocks the stress response cascade.
Dosage: Clinical trial doses only: 10-40 mg daily
Benefits: Antidepressant, Anxiolytic, Stress reduction, Resilience
Side effects: Headache, Nausea, Somnolence, Dry mouth
Warnings: NOT APPROVED — INVESTIGATIONAL ONLY | Very limited human data | May interfere with normal stress adaptation

## Betahistine Mesylate (Vestibular Agents)
Description: Histamine H3 antagonist / H4 agonist used clinically for vertigo and Ménière's disease.
Mechanism: H3 antagonism increases histamine release in vestibular nuclei; H4 agonism modulates inflammation.
Dosage: Standard: 16-48 mg/day (divided) | Acute: up to 144 mg/day under supervision
Benefits: Reduces vertigo episodes, Improves balance, Decreases tinnitus, Cerebral circulation
Side effects: GI upset, Headache, Drowsiness, Itching
Warnings: Generally well-tolerated | Contains mesylate salt — sulfite-sensitive individuals beware | May cause drowsiness initially

## Brexipiprazole (Atypical Antipsychotics)
Description: Partial D2/D3 and 5-HT1A agonist. Prescription antipsychotic/antidepressant adjunct (Rexulti).
Mechanism: Partial D2/D3 agonist, 5-HT1A partial agonist, 5-HT2A antagonist, α1/α2 adrenergic antagonist.
Dosage: Starting: 0.5-1 mg/day | Maintenance: 2-4 mg/day | Max: 4 mg/day
Benefits: Antipsychotic, Antidepressant adjunct, Anxiolytic, Improved motivation
Side effects: Akathisia, Weight gain, Sedation, Hyperprolactinemia
Warnings: PRESCRIPTION ONLY | Risk of tardive dyskinesia long-term | Increased mortality risk in elderly with dementia | Very long half-life (96h)

## Chlodantan (Novel Compounds)
Description: Bromantane derivative with enhanced stimulant and anxiolytic properties. Research chemical.
Mechanism: Modulates dopamine/serotonin neurotransmitter systems; exact mechanism not fully characterized.
Dosage: Orally or sublingually: 50 mg once daily
Benefits: Stimulant effects, Anxiolytic, Improved focus
Side effects: Mild headaches, Gum irritation (sublingual)
Warnings: RESEARCH CHEMICAL — NOT FDA APPROVED | Very little published research | Unknown long-term toxicity profile

## Didesoymodafinil (Novel Stimulants)
Description: Modafinil derivative with potentially longer-lasting wakefulness effects. Unscheduled research chemical.
Mechanism: Similar to Modafinil (DAT inhibition/dopamine modulation) but modified structure may extend duration.
Dosage: Experimental: start 25 mg | Max: 150 mg
Benefits: Extended wakefulness, Improved focus, Cognitive performance
Side effects: Headache, Nausea, Insomnia, Anxiety
Half-life: Unknown (potentially 12-24h)
Warnings: RESEARCH CHEMICAL — NOT APPROVED | Very limited safety data | Assume Modafinil-class interactions apply

## Cetilistat (Metabolism Modulators)
Description: Reversible pancreatic lipase inhibitor for weight management. Prescription in most markets.
Mechanism: Prevents triglyceride hydrolysis in intestines, reducing dietary fat absorption by ~30%.
Dosage: Standard: 60 mg three times daily with meals | Max: 120 mg three times daily
Benefits: Weight loss, Fat malabsorption, Cholesterol improvement, Glycemic control
Side effects: GI distress, Oily spotting, Flatulence, Fat-soluble vitamin deficiency (long-term)
Warnings: PRESCRIPTION MEDICATION | Requires fat-soluble vitamin supplementation | Reduce dietary fat to minimize GI effects | Not primarily a nootropic

## Dihexa (Peptides)
Description: Experimental peptide derived from angiotensin IV with potent neurotrophic effects. Preclinical only.
Mechanism: Binds hepatocyte growth factor (HGF) receptor c-Met, promoting synaptogenesis and neuroplasticity.
Dosage: Experimental: 1-10 mg daily — research use only, no established human dosing
Benefits: Neuroprotection, Cognitive enhancement, Synaptogenesis, Memory improvement
Side effects: Largely unknown — very limited human data
Warnings: RESEARCH CHEMICAL — NOT APPROVED | Primarily preclinical data | Powerful growth factor modulation — unknown long-term oncology risk | Half-life potentially >24h

=== KNOWN STACK INTERACTIONS ===

[Classic Stack ⭐] Caffeine × L-Theanine: The golden duo. 2:1 ratio (200mg Caffeine + 400mg L-Theanine). Smooth focus, no jitters.

[Essential] Piracetam × Alpha-GPC: Always pair racetams with choline. Prevents racetam headaches. Must-have combo.

[Recommended] Aniracetam × Alpha-GPC: Fat-soluble - take both with food. Same choline logic as Piracetam.

[Focus Stack] L-Theanine × Bacopa Monnieri: Immediate alpha-wave calm (theanine) + long-term memory building (bacopa).

[Study Stack] Alpha-GPC × Bacopa Monnieri: Short-term acetylcholine boost + long-term memory consolidation. Best for learning.

[Neuroprotective] Piracetam × Bacopa Monnieri: AMPA modulation + antioxidant adaptogenic effects. Strong synergy.

[Compatible] L-Theanine × Piracetam: Theanine dampens racetam restlessness. Needs choline in stack.

[Choline Required!] Piracetam × Aniracetam: Both racetams = double acetylcholine demand. Must add Alpha-GPC or CDP-Choline.

[Compatible] Agmatine × Piracetam: NMDA antagonism balances Piracetam's excitatory load. Good neuroprotection.

[Use Caution ⚠️] Caffeine × Agmatine: Unpredictable blood pressure swings. Monitor carefully.

[HIGH RISK 🚨] Modafinil × Caffeine: Very high overstimulation risk. Elevated HR, BP, anxiety. Avoid or drastically reduce caffeine dose.

[Avoid ❌] Modafinil × Aniracetam: Insomnia and overstimulation likely. Not recommended.

[Caution] 4F-Phenibut × Caffeine: Sedation + stimulation masks risk perception. Dependency risk.

[MAOI Warning 🚨] 9-Me-BC × any stimulant: 9-Me-BC has MAOI properties. Combining with stimulants, caffeine, or tyramine-rich foods can cause hypertensive crisis. DANGEROUS.`;

const SYSTEM_PROMPT = `You are NooAI, the intelligent research assistant for Noodrop — a nootropics research platform at noodrop.vercel.app.

You are an expert in cognitive enhancement compounds, neuroscience, pharmacology, and harm reduction. Your tone is like a knowledgeable friend with a PhD in pharmacology: direct, specific, honest about risks, evidence-aware.

FORMATTING:
- Use **bold** for compound names and key points
- Use bullet lists for dosages, effects, stacks
- Use ### headings for sections in longer responses
- Keep responses focused and scannable — no unnecessary padding

CRITICAL SAFETY RULES:
1. Always add a disclaimer for clinical/prescription compounds (Modafinil, Allopregnanolone, Brexpiprazole, Cerebrolysin)
2. Flag HIGH RISK interactions clearly with 🚨
3. For 9-Me-BC: always warn about MAOI properties and hypertensive crisis risk
4. For 4F-Phenibut: always warn about dependency and withdrawal severity
5. Never encourage obtaining prescription drugs without a prescription
6. Prioritize harm reduction above everything

STACK RECOMMENDATIONS:
- Consider the user's goal (focus, anxiety, sleep, memory, energy)
- Mention timing (morning vs evening, with/without food)
- Always check the interaction matrix for risks
- Start simple: 2-3 compounds for beginners
- Mention how long until effects are noticeable

DATABASE:
Use the Noodrop compound database below as your primary source. For questions outside the database, use general pharmacology knowledge but say so.

${COMPOUND_CONTEXT}

End responses with a brief reminder that this is not medical advice when discussing dosages or stacks.`;

// ── Handler ────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // CORS — allow your Vercel domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured in Vercel environment variables' });
  }

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-12), // last 12 turns to stay within context
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return res.status(groqRes.status).json({ error: data?.error?.message || 'Groq API error' });
    }

    const reply = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[NooAI]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
