/* ═══════════════════════════════════════════════════════════════
   Metacognition — quiz-result-data.js  v2
   Erweiterte Compound-Daten mit dynamischen Werten für:
   - Dosierung (nach Erfahrungslevel)
   - Timing (nach Lifestyle)
   - Cycling (nach Erfahrungslevel)
   - Warnungen (nach Medikamenten-Status)
   - Einkaufsliste (konkrete EU-Marken)
   ═══════════════════════════════════════════════════════════════ */

const STACKS = {
  /* ═══════════════════════════════════════════════════════════════
     FOKUS
     ═══════════════════════════════════════════════════════════════ */
  focus: [
    {
      name: 'L-Tyrosin',
      benefit: 'Erhöht Dopamin- und Norepinephrin-Vorstufen bei kognitivem Stress',
      mechanism: 'L-Tyrosin ist der direkte Vorläufer von Dopamin. Unter Stress erschöpft das Gehirn Katecholamine — Tyrosin füllt den Pool wieder auf und verhindert den stressbedingten Leistungsabfall.',
      dose: {
        beginner: '500 mg',
        intermediate: '1000–1500 mg',
        advanced: '2000 mg'
      },
      timing: {
        student: 'Morgens nüchtern + 45 Min vor Lernsessions/Klausuren',
        office: 'Morgens nüchtern + 45 Min vor Deep-Work-Blöcken',
        athlete: 'Morgens nüchtern + 30 Min vor dem Training',
        creative: 'Morgens nüchtern für kreativen Flow-State'
      },
      cycling: {
        beginner: '4 Tage einnehmen, 3 Tage Pause — 4 Wochen wiederholen',
        intermediate: '5 Tage einnehmen, 2 Tage Pause — 6 Wochen, dann 1 Woche Reset',
        advanced: '8 Wochen durchgängig, dann 2 Wochen vollständige Pause (Reset-Toleranz)'
      },
      warnings: {
        none: 'Auf nüchternen Magen einnehmen — Protein konkurriert um Aufnahme',
        basic: 'Nicht gleichzeitig mit Magnesium (mind. 2h Abstand). Vitamin D ist unproblematisch.',
        prescription: '⚠️ NICHT mit MAO-Hemmern kombinieren (Gefahr von hypertensiver Krise). Bei SSRIs: ärztliche Rücksprache erforderlich.'
      },
      purchase: {
        brand: 'Nootropics Depot L-Tyrosin',
        price: '€19.99 / 100g (~200 Portionen à 500mg)',
        quality: 'USP-geprüft, heavy-metal getestet',
        url: 'https://www.nootropicsdepot.com'
      }
    },
    {
      name: 'Citicoline (CDP-Cholin)',
      benefit: 'Erhöht Acetylcholin und unterstützt neuronale Membranintegrität',
      mechanism: 'Citicolin liefert sowohl Cholin (Acetylcholin-Vorläufer) als auch Cytidine (→ Uridin → Phosphatidylcholin). Zwei synergistische Effekte in einem Compound.',
      dose: {
        beginner: '250 mg',
        intermediate: '300–500 mg',
        advanced: '500 mg'
      },
      timing: {
        student: 'Morgens zum Frühstück — ganzjähriger Lernsupport',
        office: 'Morgens zum Frühstück — ganztägige kognitive Basis',
        athlete: 'Morgens — unterstützt auch neuronale Muskelkoordination',
        creative: 'Morgens zum Frühstück — fördert neuronale Plastizität für Ideenfluss'
      },
      cycling: {
        beginner: '5 Tage einnehmen, 2 Tage frei — 4 Wochen evaluieren',
        intermediate: 'Durchgängig nutzbar — alle 8 Wochen 1 Woche Pause',
        advanced: 'Durchgängig 500mg/Tag — quartalsweise Leberwerte checken'
      },
      warnings: {
        none: 'Kann initial leichte Kopfschmerzen verursachen — Zeichen von erhöhtem Acetylcholin',
        basic: 'Omega-3-Fischöl verstärkt die Wirkung (synergistisch für Membranfluidität).',
        prescription: 'Bei Anticholinergika (z.B. Antihistaminika der 1. Gen.) kann Citicolin die Wirkung antagonisieren.'
      },
      purchase: {
        brand: 'Nootropics Depot Cognizin Citicoline',
        price: '€34.99 / 60 Kapseln (30 Tage à 500mg)',
        quality: 'Kyowa Hakko Bio — patentiert, klinisch getestet',
        url: 'https://www.nootropicsdepot.com'
      }
    },
    {
      name: 'Koffein + L-Theanin',
      benefit: 'Schärft Aufmerksamkeit ohne Nervosität — das meistbelegte Nootropics-Stack',
      mechanism: 'L-Theanin (GABA-Modulator, alpha-Wellen-Induktor) puffert den anxiogenen Effekt von Koffein. Das Ergebnis: fokussierte Wachheit ohne Jitter oder Crash.',
      dose: {
        beginner: '50 mg Koffein + 100 mg L-Theanin (1:2)',
        intermediate: '100 mg Koffein + 200 mg L-Theanin (1:2)',
        advanced: '200 mg Koffein + 400 mg L-Theanin (1:2)'
      },
      timing: {
        student: '90 Min nach dem Aufwachen (Cortisol-Nadir) + vor Lernsessions',
        office: '90 Min nach dem Aufwachen + nach dem Mittagstief (14:00)',
        athlete: '30 Min vor dem Training — synergistisch mit Creatin',
        creative: 'Morgens nach der ersten kreativen Warm-up-Phase (90 Min nach Aufwachen)'
      },
      cycling: {
        beginner: 'Nur an Arbeitstagen — Wochenende koffeinfrei',
        intermediate: '5 Tage/Week — Wochenende reduzieren (max 100mg)',
        advanced: '2 Wochen On, 1 Woche Off (Koffein-Toleranz-Reset). Theanin kann durchgängig bleiben.'
      },
      warnings: {
        none: 'Letzte Dosis spätestens 14:00 — Halbwertszeit von Koffein: 5-6h',
        basic: 'Nicht mit Magnesium-Glycinat gleichzeitig (Koffein antagonisiert GABA).',
        prescription: '⚠️ Bei Bluthochdruck-Medikamenten: Koffein kann die Wirkung beeinträchtigen. Bei ADHS-Medikamenten (Ritalin): massive Überstimulation möglich.'
      },
      purchase: {
        brand: 'Koffein: Filterkaffee oder Bulletproof Koffein-Tabletten | L-Theanin: Nootropics Depot Suntheanine',
        price: 'Koffein: ~€0.10/Tasse | Suntheanine: €24.99 / 60 Kapseln',
        quality: 'Suntheanine = patentiertes L-Theanin (nur L-Isomer, kein D-Theanin)',
        url: 'https://www.nootropicsdepot.com'
      }
    }
  ],

  /* ═══════════════════════════════════════════════════════════════
     ENERGIE
     ═══════════════════════════════════════════════════════════════ */
  energy: [
    {
      name: 'Creatin Monohydrat',
      benefit: 'Erhöht zerebrale ATP-Resynthese — auch kognitive Leistung nachgewiesen',
      mechanism: 'Creatin erhöht den Phosphocreatinpool im Gehirn. Eine 2003 Oxford-Studie zeigte 14% bessere Arbeitsgedächtnisleistung nach 6 Wochen (5g/Tag) gegenüber Placebo.',
      dose: {
        beginner: '3 g täglich',
        intermediate: '5 g täglich',
        advanced: '5 g täglich + 20g Loading-Woche optional'
      },
      timing: {
        student: 'Morgens zum Frühstück — jeden Tag, unabhängig von Lernphasen',
        office: 'Morgens zum Frühstück oder Kaffee — Sättigung ist entscheidend, nicht Timing',
        athlete: 'Post-Workout mit Protein + Carb-Shake (beste Aufnahme)',
        creative: 'Morgens — gleichmäßige Hirnversorgung für konstante Energie'
      },
      cycling: {
        beginner: 'Durchgängig — kein Cycling nötig (Sättigungs-Supplement)',
        intermediate: 'Durchgängig — Loading nicht nötig, 5g/Tag reichen',
        advanced: 'Durchgängig. Nach 12 Wochen optional 1 Woche Pause zum "Reset" (wissenschaftlich nicht belegt, aber praktisch verbreitet)'
      },
      warnings: {
        none: 'Viel trinken! Creatin zieht Wasser in die Zellen — mind. 2.5L/Tag.',
        basic: 'Perfekt kombinierbar mit Omega-3 und Vitamin D. Kein Konflikt mit Basis-Supps.',
        prescription: 'Bei Niereninsuffizienz oder Lithium-Einnahme: ärztliche Rücksprache zwingend.'
      },
      purchase: {
        brand: 'Creapure Creatin Monohydrat (AlzChem Deutschland)',
        price: '€14.99 / 500g (100 Portionen à 5g)',
        quality: 'Creapure = deutscher Goldstandard, GMP-zertifiziert, heavy-metal frei',
        url: 'https://www.ostrovit.com oder Amazon'
      }
    },
    {
      name: 'Coenzym Q10 (Ubiquinol)',
      benefit: 'Mitochondriales Antioxidans — reduziert oxidativen Stress, verbessert ATP-Produktion',
      mechanism: 'CoQ10 ist ein essentieller Kofaktor in der mitochondrialen Elektronentransportkette (Komplex I–III). Ubiquinol ist die reduzierte, bioverfügbarere Form.',
      dose: {
        beginner: '100 mg Ubiquinol',
        intermediate: '200 mg Ubiquinol',
        advanced: '200–300 mg Ubiquinol'
      },
      timing: {
        student: 'Morgens zum Frühstück — MUSS mit Fett eingenommen werden (fettlöslich)',
        office: 'Morgens mit fettreicher Mahlzeit (Eier, Avocado, Nüsse)',
        athlete: 'Pre-Workout mit etwas Fett — verbessert mitochondriale Energie während Belastung',
        creative: 'Morgens mit Frühstück — mitochondriale Basis für ganztägige Energie'
      },
      cycling: {
        beginner: '3 Monate einnehmen, 1 Monat Pause',
        intermediate: 'Durchgängig — Ubiquinol ist körpereigen und sicher',
        advanced: 'Durchgängig 200mg. Quartalweise CoQ10-Spiegel im Blut checken'
      },
      warnings: {
        none: 'Fettlöslich — IMMER mit einer fetthaltigen Mahlzeit einnehmen, sonst nahezu 0 Bioverfügbarkeit.',
        basic: 'Synergistisch mit Omega-3-Fischöl (beide fettlöslich, beide mitochondrial).',
        prescription: '⚠️ Bei Blutverdünnern (Warfarin/Marcumar): CoQ10 kann die Wirkung antagonisieren. Bei Statinen: sinnvoll (Statine senken körpereigenes CoQ10).'
      },
      purchase: {
        brand: 'Life Extension Super Ubiquinol CoQ10',
        price: '€38.00 / 60 Softgels (100mg)',
        quality: 'Kaneka Ubiquinol — patentiert, höchstmögliche Bioverfügbarkeit',
        url: 'https://www.lifeextension.com'
      }
    },
    {
      name: 'Rhodiola Rosea',
      benefit: 'Adaptogen gegen Erschöpfung — reduziert mentale Müdigkeit in klinischen Trials',
      mechanism: 'Rosavine und Salidroside beeinflussen Monoaminoxidase, COMT und HPA-Achse. Eine 2009 Plazebo-Studie an Ärzten im Nachtdienst zeigte signifikant weniger Burnout-Symptome.',
      dose: {
        beginner: '100 mg (standardisiert auf 3% Rosavine)',
        intermediate: '200–300 mg (3% Rosavine, 1% Salidroside)',
        advanced: '400 mg (3% Rosavine)'
      },
      timing: {
        student: 'Morgens nüchtern — 30 Min vor der ersten Lerneinheit. Nicht nach 14:00.',
        office: 'Morgens nüchtern — 30 Min vor Arbeitsbeginn. Idealerweise vor stressigen Meetings.',
        athlete: '30 Min vor dem Training — verbessert Ausdauer und mentale Frische',
        creative: 'Morgens nüchtern — unterstützt Stressresilienz bei Projekt-Deadlines'
      },
      cycling: {
        beginner: '2 Wochen einnehmen, 1 Woche Pause — sonst Toleranz',
        intermediate: '4 Wochen einnehmen, 1 Woche Pause',
        advanced: '8 Wochen einnehmen, 2 Wochen Pause. Toleranz-Entwicklung ab Woche 6 möglich.'
      },
      warnings: {
        none: 'Nicht abends einnehmen — kann Einschlafstörungen verursachen. Immer morgens.',
        basic: 'Nicht gleichzeitig mit Magnesium-Glycinat (Rhodiola stimulierend, Magnesium sedierend).',
        prescription: '⚠️ NICHT mit SSRIs/SNRIs kombinieren (Serotonin-Syndrom-Risiko). Bei bipolaren Störungen: kann Manie triggern.'
      },
      purchase: {
        brand: 'Nootropics Depot Rhodiola Rosea Extrakt (3% Rosavine)',
        price: '€22.99 / 60 Kapseln',
        quality: 'Standardisiert auf 3% Rosavine + 1% Salidroside — HPLC-verifiziert',
        url: 'https://www.nootropicsdepot.com'
      }
    }
  ],

  /* ═══════════════════════════════════════════════════════════════
     SCHLAF
     ═══════════════════════════════════════════════════════════════ */
  sleep: [
    {
      name: 'Magnesium Glycinat',
      benefit: 'Entspannt das Nervensystem und unterstützt tiefen Slow-Wave-Schlaf',
      mechanism: 'Magnesium ist Kofaktor für GABA-Synthese und NMDA-Rezeptor-Modulation. Glycinat-Form hat hohe GI-Verträglichkeit und passiert gut die Blut-Hirn-Schranke.',
      dose: {
        beginner: '200 mg elementares Magnesium (als Glycinat)',
        intermediate: '300 mg elementares Magnesium',
        advanced: '400 mg elementares Magnesium'
      },
      timing: {
        student: '60 Min vor der geplanten Schlafenszeit — konsistente Routine!',
        office: '60 Min vor dem Schlafen — idealerweise nach dem Abendessen',
        athlete: 'Nach dem Abendessen + 60 Min vor dem Schlafen — unterstützt Muskelregeneration',
        creative: '60 Min vor dem Schlafen — kann mit leichtem Stretching kombiniert werden'
      },
      cycling: {
        beginner: 'Durchgängig — Magnesium ist ein essentieller Mineralstoff',
        intermediate: 'Durchgängig — bei Durchfall Dosis halbieren',
        advanced: 'Durchgängig 400mg. Rote-Blutkörperchen-Magnesium alle 6 Monate checken'
      },
      warnings: {
        none: 'Nicht auf nüchternen Magen — kann GI-Beschwerden verursachen. Mit etwas Essen.',
        basic: 'Vitamin D benötigt Magnesium als Kofaktor — gute Kombination. Omega-3: kein Konflikt.',
        prescription: 'Bei Niereninsuffizienz: Magnesium-Supplementierung nur ärztlich überwacht.'
      },
      purchase: {
        brand: 'Doctor\'s Best High Absorption Magnesium Glycinate Lysinate',
        price: '€17.99 / 240 Tabletten (100mg elementares Mg pro Tablette)',
        quality: 'Albion Minerals TRAACS — chelatiert, höchste Bioverfügbarkeit',
        url: 'https://www.iherb.com'
      }
    },
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Senkt Cortisol nachweislich — direkte Auswirkung auf Einschlafzeit und Schlafqualität',
      mechanism: 'KSM-66-Extrakt reduziert in RCTs Serum-Cortisol um 27.9%. Weniger nächtliches Cortisol = weniger Schlafunterbrechungen in der zweiten Nachthälfte.',
      dose: {
        beginner: '300 mg KSM-66',
        intermediate: '300–600 mg KSM-66',
        advanced: '600 mg KSM-66'
      },
      timing: {
        student: 'Abends zum Abendessen — Cortisol-Reduktion für bessere Regeneration',
        office: 'Abends 19:00-20:00 — nach dem Arbeitsstress, vor dem Schlafen',
        athlete: 'Abends nach dem Training — unterstützt Cortisol-Reset und Muskelregeneration',
        creative: 'Abends — hilft beim "Abschalten" nach intensiven kreativen Phasen'
      },
      cycling: {
        beginner: '8 Wochen einnehmen, 2 Wochen Pause',
        intermediate: '12 Wochen einnehmen, 4 Wochen Pause',
        advanced: '16 Wochen einnehmen, 4 Wochen Pause. Alle 3 Monate Schilddrüsenwerte checken (TSH, fT3, fT4)'
      },
      warnings: {
        none: 'Kann Antriebslosigkeit verursachen — bei "emotionaler Bluntness" sofort absetzen.',
        basic: 'Nicht mit beruhigenden Kräutern (Baldrian, Passionsblume) kombinieren — additive Sedierung.',
        prescription: '⚠️ Bei Schilddrüsenmedikamenten (L-Thyroxin): Ashwagandha erhöht T3/T4 — Dosisanpassung nötig. Bei Sedativa: additive Wirkung.'
      },
      purchase: {
        brand: 'Nootropics Depot KSM-66 Ashwagandha',
        price: '€19.99 / 90 Kapseln (300mg pro Kapsel)',
        quality: 'Ixon Laboratories — original KSM-66, klinisch getestet',
        url: 'https://www.nootropicsdepot.com'
      }
    },
    {
      name: 'Glycin',
      benefit: 'Senkt Körperkerntemperatur und kürzt Einschlafzeit — eines der günstigsten Nootropics',
      mechanism: 'Glycin fördert periphere Vasodilatation, was den Wärmeverlust beschleunigt. Sinkende Körperkerntemperatur ist ein primäres Einschlafsignal. 3g zeigten in Studien -9 Min bis Schlafbeginn.',
      dose: {
        beginner: '2 g',
        intermediate: '3 g',
        advanced: '3–5 g'
      },
      timing: {
        student: '30 Min vor dem Schlafen — in 100ml Wasser gelöst, leicht süßlich',
        office: '30 Min vor dem Schlafen — im Glas Wasser, direkt vor dem Zähneputzen',
        athlete: '30 Min vor dem Schlafen — unterstützt zusätzlich die nächtliche GH-Ausschüttung',
        creative: '30 Min vor dem Schlafen — im warmen Kräutertee (Kamille) gelöst'
      },
      cycling: {
        beginner: 'Durchgängig — körpereigene Aminosäure, sicher',
        intermediate: 'Durchgängig — kein Toleranz-Problem',
        advanced: 'Durchgängig 3g. Optional: 5g an besonders stressigen Tagen'
      },
      warnings: {
        none: 'In Wasser lösen — nicht trocken schlucken (Pulver kann klumpen). Schmeckt leicht süß.',
        basic: 'Perfekt kombinierbar mit Magnesium-Glycinat (synergistisch für Schlaf).',
        prescription: 'Keine bekannten Interaktionen mit verschreibungspflichtigen Medikamenten.'
      },
      purchase: {
        brand: 'Nootropics Depot Glycin Pulver',
        price: '€9.99 / 250g (~83 Portionen à 3g)',
        quality: 'USP-Grade, Food-Grade, schwermetallgeprüft',
        url: 'https://www.nootropicsdepot.com'
      }
    }
  ],

  /* ═══════════════════════════════════════════════════════════════
     STIMMUNG
     ═══════════════════════════════════════════════════════════════ */
  mood: [
    {
      name: 'Ashwagandha (KSM-66)',
      benefit: 'Klinisch belegte Cortisol-Reduktion — Rückkopplungseffekt auf Stimmung und Resilienz',
      mechanism: 'KSM-66 normalisiert HPA-Achsen-Dysregulation. Drei 2021-Metaanalysen bestätigen signifikante Reduktion von Stress- und Angstskores gegenüber Placebo.',
      dose: {
        beginner: '300 mg KSM-66',
        intermediate: '300–600 mg KSM-66',
        advanced: '600 mg KSM-66'
      },
      timing: {
        student: 'Morgens ODER abends — bei Prüfungsangst: 30 Min vor der Prüfungssituation',
        office: 'Abends — wenn arbeitsbedingter Stress der Hauptfaktor ist',
        athlete: 'Abends nach dem Training — Cortisol-Reset nach körperlichem Stress',
        creative: 'Abends — unterstützt emotionale Verarbeitung nach intensiven kreativen Phasen'
      },
      cycling: {
        beginner: '8 Wochen einnehmen, 2 Wochen Pause',
        intermediate: '12 Wochen einnehmen, 4 Wochen Pause',
        advanced: '16 Wochen einnehmen, 4 Wochen Pause. Schilddrüsenwerte alle 3 Monate.'
      },
      warnings: {
        none: 'Bei "emotionaler Bluntness" oder Antriebslosigkeit: sofort absetzen. Kommt bei ~5% der User vor.',
        basic: 'Nicht gleichzeitig mit stimulierenden Supplementen (Rhodiola, Koffein >200mg).',
        prescription: '⚠️ Bei Schilddrüsenmedikamenten: T3/T4-Erhöhung. Bei SSRIs: theoretisch additive serotonerge Wirkung — Monitor.'
      },
      purchase: {
        brand: 'Nootropics Depot KSM-66 Ashwagandha',
        price: '€19.99 / 90 Kapseln',
        quality: 'Ixon Laboratories — original KSM-66',
        url: 'https://www.nootropicsdepot.com'
      }
    },
    {
      name: 'L-Theanin',
      benefit: 'Fördert alpha-Gehirnwellen — entspannte Wachheit ohne Sedierung',
      mechanism: 'L-Theanin passiert die Blut-Hirn-Schranke und erhöht Alpha-Band-Aktivität (8–14 Hz). Alpha-Wellen korrelieren mit entspannter Fokussierung — der Zustand erfahrener Meditierender.',
      dose: {
        beginner: '100 mg',
        intermediate: '200 mg',
        advanced: '200–400 mg'
      },
      timing: {
        student: 'Nachmittags bei Prüfungsangst oder abends beim "Runterkommen" vom Lernen',
        office: 'Mittags (13:00) oder nach stressigen Meetings — 200mg für sofortige Entspannung',
        athlete: 'Abends vor dem Schlafen — unterstützt parasympathischen Switch',
        creative: 'Morgens — fördert den kreativen Flow-Zustand durch Alpha-Wellen'
      },
      cycling: {
        beginner: 'Bei Bedarf — kein tägliches Cycling nötig',
        intermediate: 'Durchgängig 200mg/Tag — sehr sicher',
        advanced: 'Durchgängig 200-400mg. Kein Toleranz-Problem bekannt.'
      },
      warnings: {
        none: 'Eines der sichersten Nootropics — FDA GRAS (Generally Recognized As Safe).',
        basic: 'Perfekt mit Koffein kombinierbar (1:2 Ratio). Kein Konflikt mit Basis-Supps.',
        prescription: 'Bei Blutdrucksenkern: theoretisch additive blutdrucksenkende Wirkung (minimal).'
      },
      purchase: {
        brand: 'Nootropics Depot Suntheanine (patentiertes L-Theanin)',
        price: '€24.99 / 60 Kapseln (100mg)',
        quality: 'Suntheanine = nur L-Isomer (kein billiges D-Theanin mit unbekannter Wirkung)',
        url: 'https://www.nootropicsdepot.com'
      }
    },
    {
      name: 'Saffron Extrakt (Affront)',
      benefit: 'Antidepressive Wirkung vergleichbar mit niedrig dosiertem Fluoxetin in frühen Trials',
      mechanism: 'Safranal und Crocine hemmen Serotonin-Wiederaufnahme und MAO-B. Affront (28mg/Tag) zeigte in einer 2018 RCT signifikante Verbesserung auf der Hamilton Depression Scale.',
      dose: {
        beginner: '14 mg Affront-Extrakt',
        intermediate: '28 mg Affront-Extrakt',
        advanced: '28–30 mg Affront-Extrakt'
      },
      timing: {
        student: 'Morgens zum Frühstück — gleichmäßige Stimmung über den Tag',
        office: 'Morgens zum Frühstück — stabilisiert die Stressantwort am Arbeitsplatz',
        athlete: 'Morgens — unterstützt mentale Resilienz im Trainingsalltag',
        creative: 'Morgens — stabilisiert die emotionale Basis für kreative Arbeit'
      },
      cycling: {
        beginner: '8 Wochen einnehmen, 2 Wochen evaluieren',
        intermediate: '12 Wochen einnehmen, 4 Wochen Pause',
        advanced: 'Durchgängig 28mg — quartalsweise evaluieren. Kann langfristiger sein als andere Stimmungs-Supps.'
      },
      warnings: {
        none: 'Nur Affront-patentierten Extrakt kaufen — generische Safran-Extrakte haben oft keine标准化的 Safranal/Crocin-Werte.',
        basic: 'Nicht mit anderen serotonergen Substanzen (Johanniskraut, 5-HTP) kombinieren.',
        prescription: '⚠️ NICHT mit SSRIs/SNRIs/MAO-Hemmern kombinieren (Serotonin-Syndrom-Risiko). Bei bipolarer Störung: Manie-Risiko.'
      },
      purchase: {
        brand: 'Life Extension Optimized Saffron (Affront)',
        price: '€28.00 / 30 Kapseln (28mg Affront)',
        quality: 'Original Affront-Extrakt von Pharmexa — standardisiert auf >3.5% Safranal',
        url: 'https://www.lifeextension.com'
      }
    }
  ],

  /* ═══════════════════════════════════════════════════════════════
     GEDÄCHTNIS
     ═══════════════════════════════════════════════════════════════ */
  memory: [
    {
      name: 'Bacopa Monnieri',
      benefit: 'Verbessert Gedächtniskonsolidierung — nachgewiesen in multiplen RCTs bei gesunden Erwachsenen',
      mechanism: 'Bacosides A und B fördern Dendritenbildung im Hippocampus. Wirkung setzt nach 8–12 Wochen ein (kein kurzfristiger Boost). Wichtigster Langzeit-Stack für Lernende.',
      dose: {
        beginner: '300 mg (standardisiert auf 45% Bacoside)',
        intermediate: '300–450 mg (45% Bacoside)',
        advanced: '450 mg (55% Bacoside)'
      },
      timing: {
        student: 'Morgens ZUM FRÜHSTÜCK (fettlöslich) — jeden Tag, mind. 8 Wochen durchhalten',
        office: 'Morgens zum Frühstück — Langzeit-Investition in kognitive Gesundheit',
        athlete: 'Morgens — unterstützt auch motorisches Lernen und Gedächtniskonsolidierung',
        creative: 'Morgens zum Frühstück — fördert neuronale Plastizität für langfristiges Lernen'
      },
      cycling: {
        beginner: '12 Wochen einnehmen, 2 Wochen Pause — Geduld, Wirkung setzt langsam ein!',
        intermediate: '16 Wochen einnehmen, 4 Wochen Pause',
        advanced: 'Durchgängig — Bacopa ist einer der sichersten Langzeit-Compounds. Alle 6 Monate evaluieren.'
      },
      warnings: {
        none: 'MUSS mit Fett eingenommen werden. Kann initiale Müdigkeit verursachen (erste 2 Wochen) — normal, geht vorbei!',
        basic: 'Nicht auf nüchternen Magen (GI-Beschwerden). Omega-3-Fischöl verbessert die Aufnahme.',
        prescription: 'Bei Schilddrüsenmedikamenten: Bacopa kann T4 erhöhen — Monitor. Bei Anticholinergika: antagonistische Wirkung.'
      },
      purchase: {
        brand: 'Nootropics Depot Bacopa Monnieri Extrakt (45% Bacoside)',
        price: '€19.99 / 60 Kapseln',
        quality: 'HPLC-verifiziert auf 45% Bacoside A+B — keine "KeenMind"-Verdünnung',
        url: 'https://www.nootropicsdepot.com'
      }
    },
    {
      name: "Lion's Mane (Hericium erinaceus)",
      benefit: 'Stimuliert NGF (Nerve Growth Factor) — einziger bekannter Nahrungsergänzungsstoff mit dieser Wirkung',
      mechanism: "Hericenone und Erinacine überqueren die Blut-Hirn-Schranke und stimulieren NGF-Synthese im Hippocampus. NGF ist essentiell für neuronales Wachstum und synaptische Plastizität.",
      dose: {
        beginner: '500 mg Fruchtkörper-Pulver oder Extrakt',
        intermediate: '1000 mg Extrakt (8:1)',
        advanced: '2000–3000 mg Extrakt (8:1)'
      },
      timing: {
        student: 'Morgens und abends — aufgeteilte Dosis für gleichmäßige NGF-Stimulation',
        office: 'Morgens zum Frühstück — unterstützt kognitive Langzeitgesundheit',
        athlete: 'Morgens + abends — NGF unterstützt auch periphere Nervenregeneration',
        creative: 'Morgens und abends — fördert neuronale Vernetzung für kreatives Denken'
      },
      cycling: {
        beginner: '8 Wochen einnehmen, 2 Wochen Pause',
        intermediate: '12 Wochen einnehmen, 4 Wochen Pause',
        advanced: 'Durchgängig — kein bekanntes Toleranz- oder Abhängigkeitsrisiko'
      },
      warnings: {
        none: 'Fruchtkörper-Pulver < Extrakt — immer Extrakt (8:1 oder höher) kaufen für ausreichende Hericenone-Dosis.',
        basic: 'Keine bekannten Konflikte mit Basis-Supps. Omega-3 kann synergistisch sein.',
        prescription: 'Bei Immunsuppressiva: Lion\'s Mane stimuliert das Immunsystem — theoretischer Konflikt.'
      },
      purchase: {
        brand: 'Real Mushrooms Lion\'s Mane Extrakt (oder Oriveda)',
        price: '€34.99 / 60 Kapseln (500mg 8:1 Extrakt)',
        quality: 'Oriveda = Goldstandard (NGF- und BDNF-Verifikation durch Dritttests). Real Mushrooms = gute Budget-Option.',
        url: 'https://www.oriveda.com'
      }
    },
    {
      name: 'Alpha-GPC',
      benefit: 'Schnellste cholinergene Verbindung — erhöht Acetylcholin-Spiegel rapide im Arbeitsgedächtnis',
      mechanism: 'Alpha-GPC liefert mehr Cholin ans Gehirn als jede andere Cholinquelle (höhere BBB-Permeabilität als CDP-Cholin). Ideal vor kognitiv anspruchsvollen Aufgaben.',
      dose: {
        beginner: '300 mg',
        intermediate: '300–600 mg',
        advanced: '600 mg'
      },
      timing: {
        student: '45 Min vor Lernsessions/Klausuren — akut wirksam, kein Langzeit-Cycling nötig',
        office: '45 Min vor Deep-Work-Blöcken oder wichtigen Meetings',
        athlete: '30 Min vor dem Training — erhöht nachweislich GH-Ausschüttung + kognitive Wachheit',
        creative: '45 Min vor intensiven kreativen Sessions — fördert assoziatives Denken'
      },
      cycling: {
        beginner: 'Nur nach Bedarf (akute Session) — nicht täglich',
        intermediate: '3–4x/Woche — an intensiven kognitiven Tagen',
        advanced: '5x/Woche — an arbeitsintensiven Tagen. 2 Tage Pause für Cholin-Homöostase.'
      },
      warnings: {
        none: 'Kann bei Überdosierung depressive Verstimmung verursachen (zu viel Acetylcholin). Bei "Brain Fog" oder Niedergeschlagenheit: sofort absetzen.',
        basic: 'Nicht mit Citicolin kombinieren (doppelte Cholin-Quelle = Überlastung).',
        prescription: 'Bei Acetylcholinesterase-Hemmern (Donepezil, Rivastigmin): nicht kombinieren.'
      },
      purchase: {
        brand: 'Nootropics Depot Alpha-GPC (50% oder 99%)',
        price: '€29.99 / 60 Kapseln (300mg, 50%)',
        quality: '99%-Version verfügbar — aber 50% reicht für die meisten User',
        url: 'https://www.nootropicsdepot.com'
      }
    }
  ]
};
