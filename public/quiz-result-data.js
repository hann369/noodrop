/* ═══════════════════════════════════════════════════════════════
   NOODROP — quiz-result-data.js
   Hardcoded stack recommendations per goal.
   Will move to Firebase later — for now this is the source of truth.
   ═══════════════════════════════════════════════════════════════ */

const STACKS = {
  focus: [
    {
      name: 'L-Tyrosin',
      benefit: 'Erhöht Dopamin- und Norepinephrin-Vorstufen bei kognitivem Stress',
      mechanism: 'L-Tyrosin ist der direkte Vorläufer von Dopamin. Unter Stress erschöpft das Gehirn Katecholamine — Tyrosin füllt den Pool wieder auf und verhindert den stressbedingten Leistungsabfall.',
      dose: '500–2000 mg',
      timing: '30–60 Min vor Fokus-Session',
      pubmed: 'PMID: 15729188',
      cid: null /* not in library yet */
    },
    {
      name: 'Citicoline (CDP-Cholin)',
      benefit: 'Erhöht Acetylcholin und unterstützt neuronale Membranintegrität',
      mechanism: 'Citicolin liefert sowohl Cholin (Acetylcholin-Vorläufer) als auch Cytidine (→ Uridin → Phosphatidylcholin). Zwei synergistische Effekte in einem Compound.',
      dose: '250–500 mg',
      timing: 'Morgens, mit oder ohne Essen',
      pubmed: 'PMID: 22071706',
      cid: 169272 /* Citicoline Sodium */
    },
    {
      name: 'Koffein + L-Theanin',
      benefit: 'Schärft Aufmerksamkeit ohne Nervosität — das meistbelegte Nootropics-Stack',
      mechanism: 'L-Theanin (GABA-Modulator, alpha-Wellen-Induktor) puffert den anxiogenen Effekt von Koffein. Das Ergebnis: fokussierte Wachheit ohne Jitter oder Crash.',
      dose: '100 mg Koffein + 200 mg L-Theanin (1:2 Ratio)',
      timing: 'Morgens oder vor Aufgaben',
      pubmed: 'PMID: 18681988',
      cid: 145 /* Caffeine */
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
      cid: null
    },
    {
      name: 'Coenzym Q10 (Ubiquinol)',
      benefit: 'Mitochondriales Antioxidans — reduziert oxidativen Stress, verbessert ATP-Produktion',
      mechanism: 'CoQ10 ist ein essentieller Kofaktor in der mitochondrialen Elektronentransportkette (Komplex I–III). Ubiquinol ist die reduzierte, bioverfügbarere Form.',
      dose: '100–300 mg Ubiquinol',
      timing: 'Morgens, mit fetthaltiger Mahlzeit',
      pubmed: 'PMID: 14595471',
      cid: null
    },
    {
      name: 'Rhodiola Rosea',
      benefit: 'Adaptogen gegen Erschöpfung — reduziert mentale Müdigkeit in klinischen Trials',
      mechanism: 'Rosavine und Salidroside beeinflussen Monoaminoxidase, COMT und HPA-Achse. Eine 2009 Plazebo-Studie an Ärzten im Nachtdienst zeigte signifikant weniger Burnout-Symptome.',
      dose: '200–400 mg (mind. 3% Rosavine)',
      timing: 'Morgens oder vor Belastungsphasen, nicht abends',
      pubmed: 'PMID: 19016404',
      cid: null
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
      cid: null
    },
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Senkt Cortisol nachweislich — direkte Auswirkung auf Einschlafzeit und Schlafqualität',
      mechanism: 'KSM-66-Extrakt reduziert in RCTs Serum-Cortisol um 27.9%. Weniger nächtliches Cortisol = weniger Schlafunterbrechungen in der zweiten Nachthälfte.',
      dose: '300–600 mg KSM-66',
      timing: 'Abends, mit Mahlzeit',
      pubmed: 'PMID: 23439798',
      cid: null
    },
    {
      name: 'Glycin',
      benefit: 'Senkt Körperkerntemperatur und kürzt Einschlafzeit — eines der günstigsten Nootropics',
      mechanism: 'Glycin fördert periphere Vasodilatation, was den Wärmeverlust beschleunigt. Sinkende Körperkerntemperatur ist ein primäres Einschlafsignal. 3g zeigten in Studien -9 Min bis Schlafbeginn.',
      dose: '3 g',
      timing: '30 Min vor dem Schlafen, in Wasser gelöst',
      pubmed: 'PMID: 22293292',
      cid: null
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
      cid: null
    },
    {
      name: 'L-Theanin',
      benefit: 'Fördert alpha-Gehirnwellen — entspannte Wachheit ohne Sedierung',
      mechanism: 'L-Theanin passiert die Blut-Hirn-Schranke und erhöht Alpha-Band-Aktivität (8–14 Hz). Alpha-Wellen korrelieren mit entspannter Fokussierung — der Zustand erfahrener Meditierender.',
      dose: '100–400 mg',
      timing: 'Bei Bedarf, wirkt innerhalb 30–60 Min',
      pubmed: 'PMID: 18296328',
      cid: 277 /* L-Theanine */
    },
    {
      name: 'Saffron Extrakt (Affron)',
      benefit: 'Antidepressive Wirkung vergleichbar mit niedrig dosiertem Fluoxetin in frühen Trials',
      mechanism: 'Safranal und Crocine hemmen Serotonin-Wiederaufnahme und MAO-B. Affron (28mg/Tag) zeigte in einer 2018 RCT signifikante Verbesserung auf der Hamilton Depression Scale.',
      dose: '28–30 mg Affron-Extrakt',
      timing: 'Morgens, mit Mahlzeit',
      pubmed: 'PMID: 30036891',
      cid: null
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
      cid: 303 /* Bacopa Monnieri */
    },
    {
      name: "Lion's Mane (Hericium erinaceus)",
      benefit: 'Stimuliert NGF (Nerve Growth Factor) — einziger bekannter Nahrungsergänzungsstoff mit dieser Wirkung',
      mechanism: "Hericenone und Erinacine überqueren die Blut-Hirn-Schranke und stimulieren NGF-Synthese im Hippocampus. NGF ist essentiell für neuronales Wachstum und synaptische Plastizität.",
      dose: '500–3000 mg (getrocknetes Fruchtfleisch oder Extrakt)',
      timing: 'Täglich morgens, mit Mahlzeit',
      pubmed: 'PMID: 20834180',
      cid: null
    },
    {
      name: 'Alpha-GPC',
      benefit: 'Schnellste cholinergene Verbindung — erhöht Acetylcholin-Spiegel rapide im Arbeitsgedächtnis',
      mechanism: 'Alpha-GPC liefert mehr Cholin ans Gehirn als jede andere Cholinquelle (höhere BBB-Permeabilität als CDP-Cholin). Ideal vor kognitiv anspruchsvollen Aufgaben.',
      dose: '300–600 mg',
      timing: '30–60 Min vor Lern- oder Arbeitssession',
      pubmed: 'PMID: 14613462',
      cid: 91 /* Alpha-GPC */
    }
  ]
};

/* English translations for compounds (used for EN locale) */
const STACKS_EN = {
  focus: [
    {
      name: 'L-Tyrosine',
      benefit: 'Boosts dopamine and norepinephrine precursors under cognitive stress',
      mechanism: 'L-Tyrosine is the direct precursor of dopamine. Under stress, the brain depletes catecholamines — tyrosine replenishes the pool and prevents stress-related performance drops.',
      dose: '500–2000 mg',
      timing: '30–60 min before focus session',
      pubmed: 'PMID: 15729188',
      cid: null
    },
    {
      name: 'CDP-Choline (Citicoline)',
      benefit: 'Increases acetylcholine and supports neuronal membrane integrity',
      mechanism: 'Citicoline delivers both choline (acetylcholine precursor) and cytidine (→ uridine → phosphatidylcholine). Two synergistic effects in one compound.',
      dose: '250–500 mg',
      timing: 'Morning, with or without food',
      pubmed: 'PMID: 22071706',
      cid: 169272
    },
    {
      name: 'Caffeine + L-Theanine',
      benefit: 'Sharpens attention without jitters — the most evidence-backed nootropic stack',
      mechanism: 'L-Theanine (GABA modulator, alpha-wave inducer) buffers the anxiogenic effect of caffeine. The result: focused alertness without jitter or crash.',
      dose: '100 mg caffeine + 200 mg L-Theanine (1:2 ratio)',
      timing: 'Morning or before tasks',
      pubmed: 'PMID: 18681988',
      cid: 145
    }
  ],
  energy: [
    {
      name: 'Creatine Monohydrate',
      benefit: 'Increases cerebral ATP resynthesis — also proven cognitive benefits',
      mechanism: 'Creatine increases the phosphocreatine pool in the brain. A 2003 Oxford study showed 14% better working memory performance after 6 weeks (5g/day) vs placebo.',
      dose: '3–5 g daily',
      timing: 'Daily, timing doesn\'t matter (saturation is key)',
      pubmed: 'PMID: 12631461',
      cid: null
    },
    {
      name: 'Coenzyme Q10 (Ubiquinol)',
      benefit: 'Mitochondrial antioxidant — reduces oxidative stress, improves ATP production',
      mechanism: 'CoQ10 is an essential cofactor in the mitochondrial electron transport chain (complex I–III). Ubiquinol is the reduced, more bioavailable form.',
      dose: '100–300 mg Ubiquinol',
      timing: 'Morning, with a fatty meal',
      pubmed: 'PMID: 14595471',
      cid: null
    },
    {
      name: 'Rhodiola Rosea',
      benefit: 'Adaptogen against fatigue — reduces mental fatigue in clinical trials',
      mechanism: 'Rosavins and salidroside affect monoamine oxidase, COMT, and the HPA axis. A 2009 placebo study on night-shift physicians showed significantly fewer burnout symptoms.',
      dose: '200–400 mg (min. 3% rosavins)',
      timing: 'Morning or before stress periods, not in the evening',
      pubmed: 'PMID: 19016404',
      cid: null
    }
  ],
  sleep: [
    {
      name: 'Magnesium Glycinate',
      benefit: 'Relaxes the nervous system and supports deep slow-wave sleep',
      mechanism: 'Magnesium is a cofactor for GABA synthesis and NMDA receptor modulation. The glycinate form has high GI tolerability and crosses the blood-brain barrier well.',
      dose: '300–400 mg elemental magnesium',
      timing: '60 min before sleep',
      pubmed: 'PMID: 23853635',
      cid: null
    },
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Proven cortisol reduction — direct impact on sleep onset and quality',
      mechanism: 'KSM-66 extract reduces serum cortisol by 27.9% in RCTs. Less nighttime cortisol = fewer sleep interruptions in the second half of the night.',
      dose: '300–600 mg KSM-66',
      timing: 'Evening, with meal',
      pubmed: 'PMID: 23439798',
      cid: null
    },
    {
      name: 'Glycine',
      benefit: 'Lowers core body temperature and shortens sleep onset — one of the cheapest nootropics',
      mechanism: 'Glycine promotes peripheral vasodilation, accelerating heat loss. Dropping core body temperature is a primary sleep onset signal. 3g showed -9 min to sleep onset in studies.',
      dose: '3 g',
      timing: '30 min before sleep, dissolved in water',
      pubmed: 'PMID: 22293292',
      cid: null
    }
  ],
  mood: [
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Clinically proven cortisol reduction — feedback effect on mood and resilience',
      mechanism: 'KSM-66 normalizes HPA axis dysregulation. Three 2021 meta-analyses confirm significant reduction of stress and anxiety scores vs placebo.',
      dose: '300–600 mg',
      timing: 'Evening or split morning/evening',
      pubmed: 'PMID: 31975514',
      cid: null
    },
    {
      name: 'L-Theanine',
      benefit: 'Promotes alpha brain waves — relaxed alertness without sedation',
      mechanism: 'L-Theanine crosses the blood-brain barrier and increases alpha-band activity (8–14 Hz). Alpha waves correlate with relaxed focus — the state of experienced meditators.',
      dose: '100–400 mg',
      timing: 'As needed, works within 30–60 min',
      pubmed: 'PMID: 18296328',
      cid: 277
    },
    {
      name: 'Saffron Extract (Affron)',
      benefit: 'Antidepressant effect comparable to low-dose fluoxetine in early trials',
      mechanism: 'Safranal and crocins inhibit serotonin reuptake and MAO-B. Affron (28mg/day) showed significant improvement on the Hamilton Depression Scale in a 2018 RCT.',
      dose: '28–30 mg Affron extract',
      timing: 'Morning, with meal',
      pubmed: 'PMID: 30036891',
      cid: null
    }
  ],
  memory: [
    {
      name: 'Bacopa Monnieri',
      benefit: 'Improves memory consolidation — proven in multiple RCTs in healthy adults',
      mechanism: 'Bacosides A and B promote dendrite formation in the hippocampus. Effects kick in after 8–12 weeks (not a short-term boost). Most important long-term stack for learners.',
      dose: '300–450 mg (min. 45% bacosides)',
      timing: 'Daily morning, with fat — needs 8 weeks minimum',
      pubmed: 'PMID: 12093601',
      cid: 303
    },
    {
      name: "Lion's Mane (Hericium erinaceus)",
      benefit: 'Stimulates NGF (Nerve Growth Factor) — only known supplement with this effect',
      mechanism: "Hericenones and erinacines cross the blood-brain barrier and stimulate NGF synthesis in the hippocampus. NGF is essential for neuronal growth and synaptic plasticity.",
      dose: '500–3000 mg (dried fruiting body or extract)',
      timing: 'Daily morning, with meal',
      pubmed: 'PMID: 20834180',
      cid: null
    },
    {
      name: 'Alpha-GPC',
      benefit: 'Fastest cholinergic compound — rapidly increases acetylcholine in working memory',
      mechanism: 'Alpha-GPC delivers more choline to the brain than any other choline source (higher BBB permeability than CDP-Choline). Ideal before cognitively demanding tasks.',
      dose: '300–600 mg',
      timing: '30–60 min before learning or work session',
      pubmed: 'PMID: 14613462',
      cid: 91
    }
  ]
};
