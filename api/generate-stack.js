// api/generate-stack.js — Vercel Serverless Function
// NooAI generiert aus 11 Quiz-Antworten einen personalisierten Stack.
// Nutzt Groq (Llama 3.3 70B) mit Metacognition Compound Database als Kontext.

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are NooAI, the expert nootropics engine for Metacognition.

TASK: Generate a personalized nootropics stack based on user quiz answers.

OUTPUT FORMAT — ONLY valid JSON, no markdown, no explanation:
{
  "compounds": [
    {
      "name": "Compound Name",
      "dose": "exact dose for this user",
      "timing": "exact timing for this user's lifestyle",
      "benefit": "why THIS compound for THIS user (1 sentence)",
      "mechanism": "2-3 sentences mechanism explanation",
      "cycling": "specific cycling protocol for their experience level"
    }
  ],
  "dailySchedule": [
    {"time": "07:00", "compound": "Name", "instruction": "how to take it"},
    ...
  ],
  "warnings": ["specific warnings based on their medication/conditions"],
  "budget": { "total": "estimated monthly cost in EUR", "items": ["item1: ~€X", ...] },
  "reasoning": "2-3 sentences explaining WHY this exact stack for THIS user"
}

RULES:
- Generate 3-5 compounds MAXIMUM (beginners: 3, intermediate: 3-4, advanced: 4-5)
- Doses MUST match experience level (beginner = lowest, advanced = highest)
- Timing MUST match their lifestyle (student = study-focused, athlete = training-focused, etc.)
- If caffeine intake is high, DO NOT add more caffeine to stack
- If sleep_quality < 4, prioritize sleep compounds
- If stress_level > 7, prioritize adaptogens
- If budget = low, only recommend the most cost-effective compounds
- If budget = high, can include premium compounds (Lion's Mane, etc.)
- NEVER recommend dangerous combinations
- If user takes prescription meds, ALWAYS include interaction warnings
- Output ONLY JSON, no markdown formatting, no code blocks.

COMPOUND DATABASE — choose from these based on the user's goal:
FOCUS: L-Tyrosin, Citicoline/CDP-Cholin, Koffein+L-Theanin, Alpha-GPC
ENERGY: Creatin Monohydrat, Coenzym Q10 (Ubiquinol), Rhodiola Rosea
SLEEP: Magnesium Glycinat, Ashwagandha (KSM-66), Glycin
MOOD: Ashwagandha (KSM-66), L-Theanin, Saffron Extrakt (Affront)
MEMORY: Bacopa Monnieri, Lion's Mane, Alpha-GPC

DOSING RANGES:
- L-Tyrosin: beginner 500mg, intermediate 1000-1500mg, advanced 2000mg
- Citicoline: beginner 250mg, intermediate 300-500mg, advanced 500mg
- Koffein+L-Theanin: beginner 50mg+100mg, intermediate 100mg+200mg, advanced 200mg+400mg (1:2 ratio)
- Creatin: 3-5g daily (all levels)
- CoQ10: beginner 100mg, intermediate 200mg, advanced 200-300mg
- Rhodiola: beginner 100mg, intermediate 200-300mg, advanced 400mg
- Magnesium Glycinat: beginner 200mg, intermediate 300mg, advanced 400mg
- Ashwagandha KSM-66: beginner 300mg, intermediate 300-600mg, advanced 600mg
- Glycin: beginner 2g, intermediate 3g, advanced 3-5g
- L-Theanin: beginner 100mg, intermediate 200mg, advanced 200-400mg
- Saffron Affront: beginner 14mg, intermediate 28mg, advanced 28-30mg
- Bacopa: beginner 300mg (45% bacosides), intermediate 300-450mg, advanced 450mg
- Lion's Mane: beginner 500mg, intermediate 1000mg, advanced 2000-3000mg
- Alpha-GPC: beginner 300mg, intermediate 300-600mg, advanced 600mg

COST ESTIMATES (monthly):
- L-Tyrosin: ~€3-5, Citicoline: ~€15-20, Creatin: ~€3-5, Magnesium Glycinat: ~€5-8
- Ashwagandha KSM-66: ~€10-15, L-Theanin: ~€10-15, Glycin: ~€3-5
- Rhodiola: ~€10-15, CoQ10: ~€20-30, Bacopa: ~€10-15, Lion's Mane: ~€20-35
- Alpha-GPC: ~€15-20, Saffron: ~€25-30
- Koffein: ~€1-3 (coffee or tablets)`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { answers } = req.body || {};
  if (!answers || !answers.goal) {
    return res.status(400).json({ error: 'answers object with goal required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  /* Build user profile prompt */
  const userPrompt = buildUserPrompt(answers);

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        temperature: 0.3,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('[NooAI Stack] Groq error:', data);
      return res.status(groqRes.status).json({ error: data?.error?.message || 'Groq API error' });
    }

    const reply = data.choices?.[0]?.message?.content || '';

    /* Parse JSON aus der Antwort (kann markdown code blocks enthalten) */
    let parsed;
    try {
      /* Markdown Code-Block entfernen falls vorhanden */
      const cleanJson = reply.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('[NooAI Stack] JSON parse error:', parseErr, 'Raw reply:', reply);
      return res.status(500).json({ error: 'Invalid response from AI', raw: reply });
    }

    return res.status(200).json({ stack: parsed });

  } catch (err) {
    console.error('[NooAI Stack] Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function buildUserPrompt(a) {
  let prompt = `Generate my personalized nootropics stack based on these quiz answers:\n\n`;
  prompt += `1. Hauptziel: ${a.goal_label || a.goal} (${a.goal})\n`;
  prompt += `2. Erfahrungslevel: ${a.experience}\n`;
  prompt += `3. Größtes Problem: ${a.problem || 'nicht angegeben'}\n`;
  prompt += `4. Lifestyle: ${a.lifestyle}\n`;
  prompt += `5. Medikamente/Supplemente: ${a.medication}\n`;
  prompt += `6. Koffein-Konsum: ${a.caffeine || 'nicht angegeben'}\n`;
  prompt += `7. Budget: ${a.budget || 'nicht angegeben'} pro Monat\n`;
  prompt += `8. Schlafqualität: ${a.sleep_quality || 5}/10\n`;
  prompt += `9. Stresslevel: ${a.stress_level || 5}/10\n`;

  if (a.notes) {
    prompt += `10. Besonderheiten: ${a.notes}\n`;
  }
  if (a.expectations) {
    prompt += `11. Erwartungen: ${a.expectations}\n`;
  }

  prompt += `\nGenerate the JSON output now. ONLY output valid JSON, nothing else.`;
  return prompt;
}
