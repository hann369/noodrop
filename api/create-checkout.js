// api/create-checkout.js — Vercel Serverless Function
// Erstellt Stripe Checkout Session mit Quiz-Metadata.
// Wird von quiz-result.html aufgerufen.

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY; // sk_test_... oder sk_live_...
const DOMAIN = process.env.NOODROP_URL || 'https://noodrop.vercel.app';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!STRIPE_SECRET) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY not configured in Vercel env vars' });
  }

  const { priceId, mode, goal, email, firebaseUid } = req.body || {};

  if (!priceId) {
    return res.status(400).json({ error: 'priceId required' });
  }

  const sessionMode = mode === 'subscription' ? 'subscription' : 'payment';

  try {
    /* Stripe braucht x-www-form-urlencoded mit FLACHEN Keys */
    const params = new URLSearchParams();
    params.set('mode', sessionMode);
    params.set('line_items[0][price]', priceId);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', `${DOMAIN}/quiz-result-unlocked.html?session_id={CHECKOUT_SESSION_ID}&goal=${encodeURIComponent(goal || 'focus')}`);
    params.set('cancel_url', `${DOMAIN}/quiz-result.html?canceled=1`);

    /* Metadata als flache keys — inkl. firebase uid */
    params.set('metadata[goal]', goal || '');
    params.set('metadata[email]', email || '');
    params.set('metadata[product_type]', mode === 'subscription' ? 'pro' : 'onetime');
    if (firebaseUid) params.set('metadata[firebase_uid]', firebaseUid);

    /* customer_email nur wenn vorhanden */
    if (email) params.set('customer_email', email);

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('[Stripe Create Error]', JSON.stringify(data));
      return res.status(stripeRes.status).json({ error: data?.error?.message || 'Stripe error' });
    }

    return res.status(200).json({ url: data.url });

  } catch (err) {
    console.error('[Checkout Error]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
