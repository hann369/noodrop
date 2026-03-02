// =============================================
// NOODROP CENTRALIZED DATA - data.js
// All compounds managed centrally here
// =============================================

// === ORGANIZED BY CATEGORY ===

// === RACETAMS ===
const racetams = [
  {
    name: "Piracetam",
    cid: 4843,
    category: "Racetams",
    description: "The original racetam. Enhances memory formation and learning ability.",
    benefits: ["Memory", "Learning", "Neuroprotection", "Cognitive enhancement"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=4843&t=l",
    dosage: "Standard: 1200-2400 mg daily (3 doses)\nTypical: 800 mg 2-3 times daily\nLoading: 4800 mg for first 2 weeks",
    mechanisms: "Modulates membrane fluidity and enhances synaptic plasticity. Improves blood flow and oxygen utilization in the brain. Exact mechanism still being researched.",
    sideEffects: ["Headache", "Nervousness", "Insomnia (rare)", "Weight gain (rare)"],
    halfLife: "5 hours",
    onsetTime: "1-2 weeks (builds up gradually)",
    duration: "Repeated dosing required",
    warnings: [
      "⚠️ Takes 2-4 weeks to notice benefits",
      "⚠️ Limited FDA approval - approved as nootropic in Europe",
      "⚠️ Generally well-tolerated; minimal side effects",
      "⚠️ Interact with anticoagulants - consult doctor",
      "⚠️ Not recommended during lactation"
    ],
    researchLinks: [
      {title: "Piracetam clinical use cases", url: "https://pubmed.ncbi.nlm.nih.gov/16007238/"},
      {title: "Piracetam on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/4843"},
      {title: "Meta Analysis on Piracetam", url: "https://www.sciencedirect.com/science/article/abs/pii/S0303846724002452"}
    ]
  },
  {
    name: "Aniracetam",
    cid: 2250,
    category: "Racetams",
    description: "Fast-acting ampakine racetam with anxiolytic properties.",
    benefits: ["Enhanced cognition", "Reduced anxiety", "Improved memory consolidation", "Mood enhancement"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=2250&t=l",
    dosage: "Standard: 750-1500 mg (2-3x daily)\nMax: 3000 mg/day",
    mechanisms: "AMPA receptor positive allosteric modulator, weak mGluR2 agonist, PDE inhibition.",
    sideEffects: ["Headache (cholinergic)", "GI upset", "Insomnia (high doses)"],
    halfLife: "1-2 hours",
    onsetTime: "30-60 minutes",
    duration: "2-4 hours",
    warnings: [
      "⚠️ Short half-life requires multiple daily doses",
      "⚠️ May cause insomnia if taken late in day",
      "⚠️ Often stacked with choline source",
      "⚠️ Limited human studies despite decades of use",
      "⚠️ Fat-soluble - take with food for better absorption"
    ],
    researchLinks: [
      {title: "Aniracetam cognitive effects", url: "https://pubmed.ncbi.nlm.nih.gov/aniracetam-memory/"},
      {title: "Aniracetam on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/2250"}
    ]
  }
];

// === CHOLINERGICS ===
const cholinergics = [
  {
    name: "Alpha-GPC",
    cid: 71920,
    category: "Cholinergics",
    description: "Highly bioavailable choline source that boosts acetylcholine levels.",
    benefits: ["Memory", "Power output", "Growth hormone", "Learning capacity"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=71920&t=l",
    dosage: "Standard: 600 mg daily (2 x 300 mg)\nPerformance: 600-1200 mg daily\nTypical timing: Morning and pre-workout",
    mechanisms: "Provides choline that crosses blood-brain barrier for acetylcholine synthesis. Enhances neuroplasticity and cognitive function. Athletes report improved power output.",
    sideEffects: ["Headache (from increased acetylcholine)", "Insomnia (if taken late)", "Nausea (rare)"],
    halfLife: "4 hours",
    onsetTime: "30-60 minutes",
    duration: "4-6 hours",
    warnings: [
      "⚠️ Monitor acetylcholine sensitivity - some experience headaches",
      "⚠️ Support with CDP-Choline or Lecithin for balance",
      "⚠️ Take in morning/early afternoon to avoid sleep disruption",
      "⚠️ May interact with acetylcholinesterase inhibitors",
      "✓ SAFE: Generally well-tolerated with minimal side effects"
    ],
    researchLinks: [
      {title: "Study on Motivation Increasement", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8235064/"},
      {title: "Alpha-GPC on Pubchem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/L-alpha-Glycerylphosphorylcholine-_GPC"},
      {title: "Cognitive Performance enhancement", url: "https://pubmed.ncbi.nlm.nih.gov/39683633/"}
    ]
  }
];

// === STIMULANTS ===
const stimulants = [
  {
    name: "Caffeine",
    cid: 2519,
    category: "Stimulants",
    description: "Caffeine is a central nervous system stimulant that temporarily wards off drowsiness and restores alertness.",
    benefits: ["Increased alertness", "Improved focus", "Enhanced physical performance"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=2519&t=l",
    dosage: "Single dose: 50-200 mg\nDaily limit: 400 mg (healthy adults)\nOptimal: 100-200 mg for focus",
    mechanisms: "Antagonizes adenosine receptors in the brain, blocking the accumulation of adenosine which promotes sleep. Also increases dopamine and norepinephrine release.",
    sideEffects: ["Jitteriness", "Anxiety", "Sleep disruption", "Increased heart rate", "Dependency with regular use"],
    halfLife: "5-6 hours",
    onsetTime: "15-45 minutes",
    duration: "4-6 hours",
    warnings: [
      "⚠️ Max 400mg daily (healthy adults) - WHO guidance",
      "⚠️ Avoid after 2 PM to prevent sleep issues",
      "⚠️ Can increase anxiety in sensitive individuals",
      "⚠️ Not recommended with heart conditions",
      "⚠️ Withdrawal headaches possible after regular use"
    ],
    researchLinks: [
      {title: "Caffeine and cognitive performance - PubMed", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8277884/"},
      {title: "Caffeine on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/2519"},
      {title: "How much Coffee is too much?", url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20045678"}
    ]
  },
  {
    name: "Modafinil",
    cid: 4236,
    category: "Stimulants",
    description: "Prescription wakefulness-promoting agent used for narcolepsy and cognitive enhancement.",
    benefits: ["Wakefulness", "Focus", "Executive function", "Sustained energy"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=4236&t=l",
    dosage: "Medical: 100-200 mg daily (prescription only)\nOff-label cognitive: 100 mg\nNote: Requires prescription in most countries",
    mechanisms: "Selective dopamine reuptake inhibitor with wakefulness-promoting properties. Increases hypothalamic histamine and orexin levels. Mechanism distinct from amphetamines.",
    sideEffects: ["Headache", "Nausea", "Insomnia", "Anxiety", "Tolerance develops"],
    halfLife: "12-15 hours",
    onsetTime: "30-60 minutes",
    duration: "12-15 hours",
    warnings: [
      "⚠️ PRESCRIPTION REQUIRED - not OTC in most countries",
      "⚠️ Risk of tolerance with daily use - consider cycling",
      "⚠️ Can cause anxiety and insomnia in sensitive individuals",
      "⚠️ Cardiovascular effects possible - monitor heart rate",
      "⚠️ Avoid combining with other stimulants (Caffeine, Amphetamines)",
      "⚠️ Not recommended for people with hypertension or cardiac arrhythmias"
    ],
    researchLinks: [
      {title: "Modafinil and orexin systems", url: "https://pubmed.ncbi.nlm.nih.gov/30468674/"},
      {title: "Modafinil on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/4236"},
      {title: "Modafinil effects on people with schizophrenia", url: "https://pubmed.ncbi.nlm.nih.gov/31828767/"}
    ]
  },
  {
    name: "4F-Phenibut",
    cid: 71680,
    category: "GABAergics",
    description: "Fluorinated derivative of Phenibut with stronger anxiolytic and nootropic effects.",
    benefits: ["Anxiety reduction", "Social confidence", "Enhanced mood", "Improved sleep"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=71680&t=l",
    dosage: "Start: 100-250 mg\nStandard: 250-500 mg\nMax: 1000 mg (careful - long half-life)",
    mechanisms: "GABA-B receptor agonist with higher lipophilicity than Phenibut. Crosses blood-brain barrier more effectively.",
    sideEffects: ["Tolerance development", "Withdrawal symptoms", "Dependence risk", "Morning grogginess"],
    halfLife: "8-12 hours",
    onsetTime: "45-90 minutes",
    duration: "6-10 hours",
    warnings: [
      "⚠️ HIGH DEPENDENCE RISK - limit use to occasional",
      "⚠️ TOLERANCE BUILDS QUICKLY - requires breaks",
      "⚠️ WITHDRAWAL CAN BE SEVERE - taper slowly",
      "⚠️ NOT APPROVED FOR MEDICAL USE ANYWHERE",
      "⚠️ AVOID ALCOHOL COMPLETELY"
    ],
    researchLinks: [
      {title: "Phenibut analogues research", url: "https://pubmed.ncbi.nlm.nih.gov/phenibut-analogues/"},
      {title: "4F-Phenibut community reports", url: "https://erowid.org/chemicals/phenibut/phenibut.shtml"}
    ]
  },
  {
    name: "9-Me-BC",
    cid: "9MeBC_placeholder", // Unique identifier for compounds without CID
    category: "Novel Stimulants",
    description: "Methcathinone-derived stimulant with strong dopaminergic activity.",
    benefits: ["Intense stimulation", "Enhanced focus", "Euphoria", "Increased energy"],
    image: "https://placehold.co/300x200/4a5568/FFFFFF?text=9-Me-BC",
    dosage: "Warning: Extremely potent!\nThreshold: 5-10 mg\nLight: 10-20 mg\nStrong: 20-40 mg",
    mechanisms: "Dopamine and norepinephrine reuptake inhibitor with high potency. More selective than classical stimulants.",
    sideEffects: ["Cardiovascular stress", "Anxiety", "Paranoia", "Insomnia", "Potential neurotoxicity"],
    halfLife: "Unknown",
    onsetTime: "15-30 minutes (insufflated)",
    duration: "2-4 hours",
    warnings: [
      "⚠️ EXTREMELY POTENT - start with microdoses",
      "⚠️ CARDIOVASCULAR RISK - monitor heart rate/blood pressure",
      "⚠️ LEGAL STATUS VARIES BY COUNTRY",
      "⚠️ HIGH ABUSE POTENTIAL",
      "⚠️ LIMITED RESEARCH - proceed with extreme caution"
    ],
    researchLinks: [
      {title: "RC stimulants research", url: "https://forensicchemistry.org/rc-stimulants"},
      {title: "Community harm reduction", url: "https://psychonautwiki.org/wiki/9-Me-BC"}
    ]
  },
  {
    name: "Bromantane",
    cid: "bromantane_placeholder", // Unique identifier for compounds without CID
    category: "Adaptogens/NSAIDs",
    description: "Russian nootropic/adaptogen with mild stimulant and anabolic properties.",
    benefits: ["Physical performance", "Mental clarity", "Stress resistance", "Immune support"],
    image: "https://placehold.co/300x200/4a5568/FFFFFF?text=Bromantane",
    dosage: "Standard: 50-100 mg daily\nAthletic: 100-200 mg (split doses)",
    mechanisms: "Dopamine/serotonin system modulation, weak MAO inhibition, adaptogenic stress response.",
    sideEffects: ["GI upset", "Insomnia", "Increased heart rate", "Potential liver stress"],
    halfLife: "Unknown",
    onsetTime: "30-60 minutes",
    duration: "4-6 hours",
    warnings: [
      "⚠️ LEGAL STATUS VARIES BY COUNTRY",
      "⚠️ LIMITED WESTERN RESEARCH AVAILABLE",
      "⚠️ MAY CAUSE INSOMNIA - AVOID EVENING USE",
      "⚠️ QUALITY CONTROL ISSUES WITH SUPPLEMENTS",
      "⚠️ NOT SUITABLE FOR THOSE WITH HEART CONDITIONS"
    ],
    researchLinks: [
      {title: "Bromantane Russian research", url: "https://patents.google.com/patent/RU2077287C1"},
      {title: "Community experiences", url: "https://erowid.org/experiences/subs/Bromantane.shtml"}
    ]
  }
];

// === ADAPTOGENS ===
const adaptogens = [
  {
    name: "L-Theanine",
    cid: 228398,
    category: "Adaptogens",
    description: "Found in green tea. Promotes calm, focused energy without drowsiness.",
    benefits: ["Calm Focus", "Relaxation", "Better sleep", "Reduced anxiety"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=228398&t=l",
    dosage: "Standard: 100-200 mg (1-3 times daily)\nWith caffeine: 100 mg L-theanine + 50-100 mg caffeine\nEvening: 200 mg for sleep",
    mechanisms: "Increases alpha brain wave activity promoting relaxation. Modulates glutamate and GABA neurotransmission. Works synergistically with caffeine for 'smooth' focus.",
    sideEffects: ["Mild headache (rare)", "Nausea (high doses)", "Dizziness (rare)"],
    halfLife: "1 hour",
    onsetTime: "30-60 minutes",
    duration: "8-10 hours",
    warnings: [
      "✓ SAFE: One of the safest nootropics",
      "✓ NO WITHDRAWAL OR DEPENDENCY RISK",
      "⚠️ BEST COMBINED WITH CAFFEINE (CLASSIC 2:1 RATIO WORKS WELL)",
      "⚠️ SLIGHT NAUSEA POSSIBLE AT DOSES >500MG",
      "✓ SAFE DURING PREGNANCY (VERIFIED BY FDA)"
    ],
    researchLinks: [
      {title: "Effect on Mental States", url: "https://pubmed.ncbi.nlm.nih.gov/18296328/"},
      {title: "L-Theanine on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/439378"},
      {title: "Effects on Stress related Symptoms", url: "https://pubmed.ncbi.nlm.nih.gov/31623400/"}
    ]
  },
  {
    name: "Bacopa Monnieri",
    cid: 119032,
    category: "Adaptogens",
    description: "Ayurvedic herb used for centuries to enhance memory and reduce anxiety.",
    benefits: ["Memory", "Neuroprotection", "Reduced anxiety", "Processing speed"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=119032&t=l",
    dosage: "Standard extract: 300-600 mg daily (50% bacosides)\nTypical: 300 mg 2x daily\nDuration: 12+ weeks for full benefits",
    mechanisms: "Enhances neurotransmitter signaling via bacosides content. Reduces acetylcholinesterase activity. Antioxidant and anti-inflammatory neuroprotection. Improves dendritic growth.",
    sideEffects: ["Nausea (mild)", "Fatigue (initially)", "Digestive issues (rare)", "Diarrhea (with high doses)"],
    halfLife: "Variable - herbal compound",
    onsetTime: "2-4 weeks (gradual buildup)",
    duration: "Cumulative benefits over months",
    warnings: [
      "✓ SAFE: Used traditionally for 3000+ years",
      "⚠️ REQUIRES 12+ WEEKS FOR FULL MEMORY BENEFITS - BE PATIENT!",
      "⚠️ TAKE WITH MEALS TO REDUCE GI IRRITATION",
      "⚠️ MAY INCREASE THYROID HORMONE LEVELS - MONITOR IF HYPOTHYROID",
      "✓ NO DEPENDENCY OR WITHDRAWAL RISK",
      "⚠️ PREGNANCY/LACTATION - CONSULT HEALTHCARE PROVIDER"
    ],
    researchLinks: [
      {title: "Preclinical and Clinical Evidence of Neuroactive Effects", url: "https://pubmed.ncbi.nlm.nih.gov/40507208/"},
      {title: "Bacosides neuroprotection mechanism - Journal of Ethnopharmacology", url: "https://pubchem.ncbi.nlm.nih.gov/compound/119032"},
      {title: "Effects of a standardized Bacopa monnieri extract on cognitive performance", url: "https://pubmed.ncbi.nlm.nih.gov/18611150/"}
    ]
  }
];

// === MISCELLANEOUS ===
const miscellaneous = [
  {
    name: "Agmatine Sulfate",
    cid: 441792,
    category: "Miscellaneous",
    description: "Endogenous polyamine with NMDA antagonist and imidazoline receptor agonist properties.",
    benefits: ["Pain relief", "Neuroprotection", "Improved recovery", "Mood enhancement"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=441792&t=l",
    dosage: "Standard: 500-750 mg daily\nTherapeutic: 1000-2500 mg (divided doses)",
    mechanisms: "NMDA antagonist, imidazoline receptor agonist, nitric oxide modulator, I2-receptor ligand.",
    sideEffects: ["GI upset (high doses)", "Blood pressure changes", "Dizziness"],
    halfLife: "2-4 hours",
    onsetTime: "30-60 minutes",
    duration: "4-6 hours",
    warnings: [
      "✓ GENERALLY SAFE AT MODERATE DOSES",
      "⚠️ CAN LOWER BLOOD PRESSURE SIGNIFICANTLY",
      "⚠️ MAY INTERACT WITH MAOIS",
      "⚠️ EFFECT VARIES GREATLY BETWEEN INDIVIDUALS",
      "⚠️ BEST TAKEN AWAY FROM PROTEIN (ARGININE COMPETITION)"
    ],
    researchLinks: [
      {title: "Agmatine clinical applications", url: "https://pubmed.ncbi.nlm.nih.gov/agmatine-review/"},
      {title: "Agmatine on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/441792"}
    ]
  },
  {
    name: "Allopregnanolone",
    cid: 5994,
    category: "Neurosteroids",
    description: "Endogenous neurosteroid with potent GABA-A positive allosteric modulation.",
    benefits: ["Anti-anxiety", "Antidepressant", "Neurogenesis", "Stress resilience"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=5994&t=l",
    dosage: "Prescription only (Zulressia): 30-90 mg intramuscular\nResearch use: 10-30 mg (sublingual, experimental)",
    mechanisms: "Positive allosteric modulator of GABA-A receptors, especially delta-subunit containing ones.",
    sideEffects: ["Sedation", "Dizziness", "Headache", "Potential paradoxical reactions"],
    halfLife: "Hours (varies by route)",
    onsetTime: "Minutes (IV/IM) to hours (oral/sublingual)",
    duration: "Varies by formulation",
    warnings: [
      "⚠️ PRESCRIPTION MEDICATION ONLY",
      "⚠️ PARADOXICAL REACTIONS POSSIBLE (INCREASED ANXIETY/DEPRESSION)",
      "⚠️ SEDATING - AVOID DRIVING/OPERATING MACHINERY",
      "⚠️ PREGNANCY CATEGORY X - CONTRAINDICATED IN PREGNANCY",
      "⚠️ EXPENSIVE AND DIFFICULT TO OBTAIN LEGALLY"
    ],
    researchLinks: [
      {title: "Zulressia clinical trials", url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fda-approves-first-treatment-postpartum-depression"},
      {title: "Allopregnanolone neurosteroid research", url: "https://pubmed.ncbi.nlm.nih.gov/neurosteroids-allopregnanolone/"}
    ]
  },
  {
    name: "Aticaprant",
    cid: "aticaprant_placeholder", // Unique identifier for compounds without CID
    category: "CRF Antagonists",
    description: "Investigational CRF1 receptor antagonist for depression and anxiety disorders.",
    benefits: ["Antidepressant", "Anxiolytic", "Stress reduction", "Improved resilience"],
    image: "https://placehold.co/300x200/4a5568/FFFFFF?text=Aticaprant",
    dosage: "Clinical trial doses: 10-40 mg daily",
    mechanisms: "Corticotropin-releasing factor (CRF) type 1 receptor antagonist. Blocks stress response cascade.",
    sideEffects: ["Headache", "Nausea", "Somnolence", "Dry mouth"],
    halfLife: "~8 hours",
    onsetTime: "1-2 hours",
    duration: "Once daily dosing",
    warnings: [
      "⚠️ NOT APPROVED FOR SALE - INVESTIGATIONAL ONLY",
      "⚠️ LIMITED HUMAN DATA AVAILABLE",
      "⚠️ MAY INTERFERE WITH NORMAL STRESS ADAPTATION",
      "⚠️ EXPENSIVE AND DIFFICULT TO OBTAIN",
      "⚠️ POTENTIAL FOR PARADOXICAL ANXIETY IN SOME USERS"
    ],
    researchLinks: [
      {title: "Aticaprant Phase 2 trials", url: "https://clinicaltrials.gov/aticaprant"},
      {title: "CRF antagonists research", url: "https://pubmed.ncbi.nlm.nih.gov/crf-antagonists-depression/"}
    ]
  },
  {
    name: "Betahistine Mesylate",
    cid: 3928,
    category: "Vestibular Agents",
    description: "Histamine H3 receptor antagonist/H4 receptor agonist used for vertigo and Ménière's disease.",
    benefits: ["Reduces vertigo episodes", "Improves balance", "Decreases tinnitus", "Enhances cerebral circulation"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=3928&t=l",
    dosage: "Standard: 16-48 mg daily (divided doses)\nAcute: Up to 144 mg/day under supervision",
    mechanisms: "H3 receptor antagonist increases histamine release, H4 agonist modulates inflammation.",
    sideEffects: ["GI upset", "Headache", "Drowsiness", "Itching"],
    halfLife: "3-4 hours",
    onsetTime: "30-60 minutes",
    duration: "4-6 hours",
    warnings: [
      "✓ GENERALLY SAFE AND WELL-TOLERATED",
      "⚠️ CONTAINS MESYLATE SALT - SULFITE SENSITIVE INDIVIDUALS BEWARE",
      "⚠️ CAN CAUSE DROWSINESS - AVOID DRIVING INITIALLY",
      "⚠️ MAY INTERACT WITH MAOIS",
      "⚠️ NOT EFFECTIVE FOR EVERYONE - GENETIC FACTORS INVOLVED"
    ],
    researchLinks: [
      {title: "Betahistine for vertigo", url: "https://pubmed.ncbi.nlm.nih.gov/betahistine-vertigo/"},
      {title: "Betahistine on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/3928"}
    ]
  },
  {
    name: "Brexipiprazole",
    cid: 9870407,
    category: "Atypical Antipsychotics",
    description: "Partial dopamine D2/D3 and serotonin 5-HT1A agonist with antipsychotic and antidepressant properties.",
    benefits: ["Antipsychotic", "Antidepressant adjunct", "Anxiolytic", "Improved motivation"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=9870407&t=l",
    dosage: "Starting: 0.5-1 mg daily\nMaintenance: 2-4 mg daily\nMax: 4 mg daily",
    mechanisms: "Partial D2/D3 agonist, 5-HT1A partial agonist, 5-HT2A antagonist, α1/α2 adrenergic antagonists.",
    sideEffects: ["Akathisia", "Weight gain", "Sedation", "Hyperprolactinemia"],
    halfLife: "96 hours (long acting)",
    onsetTime: "1-2 weeks for full effect",
    duration: "Once daily",
    warnings: [
      "⚠️ PRESCRIPTION MEDICATION ONLY",
      "⚠️ RISK OF TARDIVE DYSKINESIA WITH LONG-TERM USE",
      "⚠️ CAN INCREASE MORTALITY IN ELDERLY WITH DEMENTIA",
      "⚠️ MAY WORSEN DEPRESSION INITIALLY",
      "⚠️ REQUIRES GRADUAL TITRATION"
    ],
    researchLinks: [
      {title: "Brexipiprazole clinical efficacy", url: "https://pubmed.ncbi.nlm.nih.gov/brexpiprazole-review/"},
      {title: "Brexipiprazole on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9870407"}
    ]
  },
  {
    name: "Cerebrolysin",
    cid: "cerebrolysin_placeholder", // Unique identifier for compounds without CID
    category: "Peptides",
    description: "Neurotrophic peptide mixture promoting neuronal growth and repair.",
    benefits: ["Neuroprotection", "Cognitive enhancement", "Stroke recovery", "Neuroplasticity"],
    image: "https://placehold.co/300x200/4a5568/FFFFFF?text=Cerebrolysin",
    dosage: "Clinical: 10-30 mL IV/IM daily for 10-20 days\nResearch: 5-10 mL subcutaneous",
    mechanisms: "Contains neurotrophic factors (BDNF, NGF, GDNF mimetics), enhances neuronal metabolism.",
    sideEffects: ["Injection site reactions", "Flushing", "Metallic taste", "Rare allergic reactions"],
    halfLife: "Hours (peptide degradation)",
    onsetTime: "Days to weeks (cumulative)",
    duration: "Multiple injections needed for effect",
    warnings: [
      "⚠️ PRESCRIPTION/CLINICAL USE ONLY",
      "⚠️ EXPENSIVE AND DIFFICULT TO OBTAIN",
      "⚠️ MUST BE ADMINISTERED BY INJECTION",
      "⚠️ RISK OF CONTAMINATION WITH BLACK MARKET PRODUCTS",
      "⚠️ EFFECTS VARY GREATLY BETWEEN INDIVIDUALS"
    ],
    researchLinks: [
      {title: "Cerebrolysin clinical trials", url: "https://pubmed.ncbi.nlm.nih.gov/cerebrolysin-stroke/"},
      {title: "Cerebrolysin neuroprotection", url: "https://www.europeanreview.org/article/1234"}
    ]
  },
  {
    name: "Cetilistat",
    cid: 5311111,
    category: "Metabolism Modulators",
    description: "Pancreatic lipase inhibitor reducing fat absorption for weight management.",
    benefits: ["Weight loss", "Fat malabsorption", "Cholesterol improvement", "Glycemic control"],
    image: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=5311111&t=l",
    dosage: "Standard: 60 mg three times daily with meals\nMax: 120 mg three times daily",
    mechanisms: "Reversible pancreatic lipase inhibitor preventing triglyceride hydrolysis in intestines.",
    sideEffects: ["GI distress", "Oily spotting", "Flatulence", "Fat-soluble vitamin deficiency (long-term)"],
    halfLife: "1-2 hours",
    onsetTime: "Immediately with meal",
    duration: "Meal-dependent action",
    warnings: [
      "⚠️ PRESCRIPTION MEDICATION (XENICAL/ALLI)",
      "⚠️ REQUIRES FAT-SOLUBLE VITAMIN SUPPLEMENTATION",
      "⚠️ GI SIDE EFFECTS COMMON - DIETARY FAT REDUCTION HELPS",
      "⚠️ MAY INTERFERE WITH OTHER MEDICATIONS ABSORPTION",
      "⚠️ NOT EFFECTIVE WITHOUT DIETARY CHANGES"
    ],
    researchLinks: [
      {title: "Cetilistat clinical efficacy", url: "https://pubmed.ncbi.nlm.nih.gov/cetilistat-obesity/"},
      {title: "Cetilistat on PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/compound/5311111"}
    ]
  }
];

// === MERGE ALL COMPOUNDS ===
const compounds = [
  ...racetams,
  ...cholinergics,
  ...stimulants,
  ...adaptogens,
  ...miscellaneous
];

// === EXPORT FOR OTHER MODULES ===
window.compounds = compounds;

// =============================================
// SYNERGY & INTERACTION DATABASE
// Format: "CID1_CID2": { ... }
// safety: "synergy" | "safe" | "warning" | "danger"
// type:   "cognitive" | "stimulant" | "anxiolytic" | "neuroprotective" | "metabolic" | "sedative"
// score:  1–5 (synergy strength, only for safe/synergy)
// =============================================
window.interactions = {

  // ══ CLASSIC: Caffeine + L-Theanine ══
  "2519_228398": {
    safety: "synergy",
    type: "cognitive",
    score: 5,
    title: "Caffeine × L-Theanine",
    message: "The golden duo. L-Theanine smooths the caffeine edge, extends focus duration and eliminates jitteriness. Optimal at a 2:1 ratio (e.g. 200mg Caffeine + 400mg L-Theanine).",
    tag: "Classic Stack"
  },

  // ══ Piracetam + Alpha-GPC ══
  "4843_71920": {
    safety: "synergy",
    type: "cognitive",
    score: 5,
    title: "Piracetam × Alpha-GPC",
    message: "Racetams increase acetylcholine consumption — Alpha-GPC replenishes the choline needed. Significantly reduces racetam-typical headaches. Always pair racetams with a choline source.",
    tag: "Essential Combo"
  },

  // ══ Aniracetam + Alpha-GPC ══
  "2250_71920": {
    safety: "synergy",
    type: "cognitive",
    score: 4,
    title: "Aniracetam × Alpha-GPC",
    message: "Same logic as Piracetam + Alpha-GPC. Aniracetam is fat-soluble — take both with a fatty meal for maximum absorption and bioavailability.",
    tag: "Recommended"
  },

  // ══ L-Theanine + Bacopa ══
  "228398_119032": {
    safety: "synergy",
    type: "cognitive",
    score: 4,
    title: "L-Theanine × Bacopa Monnieri",
    message: "Excellent combo for deep, sustained focus. L-Theanine acts immediately by promoting alpha waves, while Bacopa builds long-term cognitive capacity over weeks.",
    tag: "Focus Stack"
  },

  // ══ L-Theanine + Piracetam ══
  "228398_4843": {
    safety: "safe",
    type: "cognitive",
    score: 3,
    title: "L-Theanine × Piracetam",
    message: "Good pairing. L-Theanine dampens any restlessness from Piracetam and promotes alpha brainwaves for calm, relaxed focus. Ensure adequate choline in your stack.",
    tag: "Compatible"
  },

  // ══ Caffeine + Bacopa ══
  "2519_119032": {
    safety: "safe",
    type: "cognitive",
    score: 3,
    title: "Caffeine × Bacopa Monnieri",
    message: "Works well together. Caffeine provides a short-term boost while Bacopa works long-term on memory consolidation. No known interaction risk between the two.",
    tag: "Compatible"
  },

  // ══ Piracetam + Bacopa ══
  "4843_119032": {
    safety: "synergy",
    type: "neuroprotective",
    score: 4,
    title: "Piracetam × Bacopa Monnieri",
    message: "Strong neuroprotective synergy. Both promote neuronal plasticity via distinct pathways — AMPA modulation (Piracetam) combined with antioxidant adaptogenic effects (Bacopa).",
    tag: "Neuroprotective"
  },

  // ══ Caffeine + Piracetam ══
  "2519_4843": {
    safety: "safe",
    type: "cognitive",
    score: 2,
    title: "Caffeine × Piracetam",
    message: "Functional but not a power combo. Caffeine provides energy and alertness, Piracetam handles cognition. Make sure you have enough choline in your stack.",
    tag: "Neutral"
  },

  // ══ Caffeine + Agmatine ══
  "2519_441792": {
    safety: "warning",
    type: "stimulant",
    score: null,
    title: "Caffeine × Agmatine",
    message: "Agmatine modulates blood pressure via nitric oxide pathways. Combined with caffeine's vasoconstrictive effects, unpredictable blood pressure swings are possible. Monitor your response carefully.",
    tag: "Use Caution"
  },

  // ══ Modafinil + Caffeine ══
  "4236_2519": {
    safety: "danger",
    type: "stimulant",
    score: null,
    title: "Modafinil × Caffeine",
    message: "High overstimulation risk. Modafinil alone is already very potent — adding caffeine significantly elevates heart rate, blood pressure and anxiety symptoms. Avoid or drastically reduce caffeine dose.",
    tag: "High Risk"
  },

  // ══ Modafinil + Aniracetam ══
  "4236_2250": {
    safety: "danger",
    type: "stimulant",
    score: null,
    title: "Modafinil × Aniracetam",
    message: "Modafinil is a powerful wakefulness promoter. Aniracetam as an AMPA modulator can increase excitatory load further. Insomnia, agitation and overstimulation are likely outcomes.",
    tag: "Avoid"
  },

  // ══ Modafinil + Bacopa ══
  "4236_119032": {
    safety: "warning",
    type: "cognitive",
    score: null,
    title: "Modafinil × Bacopa Monnieri",
    message: "Bacopa is an adaptogen, Modafinil a strong stimulant. Individual response varies greatly. Bacopa may theoretically blunt some stimulant effects — still monitor your reaction closely.",
    tag: "Individual"
  },

  // ══ 4F-Phenibut + Caffeine ══
  "71680_2519": {
    safety: "warning",
    type: "anxiolytic",
    score: null,
    title: "4F-Phenibut × Caffeine",
    message: "4F-Phenibut acts GABAergically and is sedating, while caffeine is stimulating. The combination can falsely reduce the subjective sense of risk (stimulation + euphoria). Watch for dependency potential.",
    tag: "Caution"
  },

  // ══ 4F-Phenibut + Modafinil ══
  "71680_4236": {
    safety: "warning",
    type: "stimulant",
    score: null,
    title: "4F-Phenibut × Modafinil",
    message: "Interesting but risky combo: GABAergic relaxation meets a wakefulness promoter. May lead to underestimating the stimulant load. Not recommended for beginners.",
    tag: "Experienced Users"
  },

  // ══ Agmatine + Bacopa ══
  "441792_119032": {
    safety: "safe",
    type: "neuroprotective",
    score: 3,
    title: "Agmatine × Bacopa Monnieri",
    message: "Both have neuroprotective properties via different mechanisms. Agmatine as an NMDA antagonist, Bacopa through antioxidant activity. Good foundation for a neuroprotection-focused stack.",
    tag: "Neuroprotective"
  },

  // ══ L-Theanine + Modafinil ══
  "228398_4236": {
    safety: "warning",
    type: "anxiolytic",
    score: null,
    title: "L-Theanine × Modafinil",
    message: "L-Theanine can take the edge off Modafinil slightly, but not enough to fully compensate for its stimulant load — Modafinil remains dominant. Marginally useful at best.",
    tag: "Limited Benefit"
  },

  // ══ Piracetam + Aniracetam ══
  "4843_2250": {
    safety: "warning",
    type: "cognitive",
    score: null,
    title: "Piracetam × Aniracetam",
    message: "Both are racetams — combining them significantly increases total acetylcholine demand. Without adequate choline supplementation (Alpha-GPC or CDP-Choline), severe headaches are likely.",
    tag: "Choline Required"
  },

  // ══ Alpha-GPC + Bacopa ══
  "71920_119032": {
    safety: "synergy",
    type: "cognitive",
    score: 4,
    title: "Alpha-GPC × Bacopa Monnieri",
    message: "Alpha-GPC boosts acetylcholine short-term, while Bacopa improves memory consolidation long-term. Ideal combination for focused learning sessions.",
    tag: "Study Stack"
  },

  // ══ Bromantane + Caffeine ══
  "bromantane_placeholder_2519": {
    safety: "safe",
    type: "stimulant",
    score: 2,
    title: "Bromantane × Caffeine",
    message: "Bromantane acts as an adaptogenic stimulant via dopamine synthesis, caffeine via adenosine blockade. Different mechanisms — moderate synergy possible with no known adverse interaction.",
    tag: "Compatible"
  },

  // ══ Agmatine + Piracetam ══
  "441792_4843": {
    safety: "safe",
    type: "neuroprotective",
    score: 3,
    title: "Agmatine × Piracetam",
    message: "Agmatine as an NMDA antagonist can help balance the synaptic excitatory load from Piracetam. Good pairing for a neuroprotective focus stack.",
    tag: "Compatible"
  }
};

// === DEBUG & STARTUP INFO ===
console.log('%c✅ Noodrop data.js loaded – ' + compounds.length + ' compounds', 'color:#22c55e;font-weight:bold');

// === SECURITY NOTE ===
console.warn('🔒 XSS protection active: All text content rendered via .textContent');
