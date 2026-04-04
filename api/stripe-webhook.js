// api/stripe-webhook.js — Vercel Serverless Function
// Empfängt Stripe Events und speichert Käufe in Firestore.
// Stripe → POST hier → Firestore document erstellt.

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Stripe Webhook Secret — findest du im Stripe Dashboard → Webhooks → dein Endpoint
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET; // whsec_xxxxx

// Firebase Admin SDK initialisieren (nur wenn noch nicht geschehen)
let db;
try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Local dev: service account JSON als env var
    throw new Error('No service account');
  }
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({ credential: cert(serviceAccount) });
  db = getFirestore();
} catch (e) {
  // Fallback: falls schon initialisiert (z.B. auf Vercel mit FIREBASE_ADMIN_CREDENTIAL)
  try {
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    db = admin.firestore();
  } catch (e2) {
    console.error('[Webhook] Firebase init failed:', e2.message);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing Stripe signature');

  let event;

  try {
    // Stripe-Signatur verifizieren
    const crypto = require('crypto');

    // Raw body parsen
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const timestamp = sig.match(/t=([^,]+)/)?.[1];
    const signature = sig.match(/v1=([^,]+)/)?.[1];

    if (!timestamp || !signature) {
      return res.status(400).send('Invalid signature format');
    }

    const signedPayload = `${timestamp}.${rawBody}`;
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(signedPayload)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Signature verification failed');
    }

    event = JSON.parse(rawBody);

  } catch (err) {
    console.error('[Webhook] Verification error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ── Events verarbeiten ──
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const metadata = session.metadata || {};

      // Metadata parsen (wurde als JSON-String gespeichert)
      let parsedMeta = {};
      try {
        parsedMeta = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
      } catch (e) {
        parsedMeta = metadata;
      }

      const purchase = {
        stripeSessionId: session.id,
        stripeCustomerId: session.customer || null,
        customerEmail: session.customer_email || parsedMeta.email || null,
        amountTotal: session.amount_total, // in cents
        currency: session.currency,
        goal: parsedMeta.goal || null,
        productType: parsedMeta.product_type || null, // 'pro' oder 'onetime'
        status: 'completed',
        createdAt: new Date().toISOString(),
      };

      // In Firestore speichern
      if (db) {
        try {
          await db.collection('purchases').add(purchase);

          // Wenn Email bekannt: auch in email_leads updaten
          if (purchase.customerEmail) {
            const leadsRef = db.collection('email_leads');
            const existing = await leadsRef.where('email', '==', purchase.customerEmail).get();
            if (existing.empty) {
              await leadsRef.add({
                email: purchase.customerEmail,
                goal: purchase.goal,
                hasPurchased: true,
                timestamp: new Date().toISOString(),
              });
            } else {
              // Existierenden Lead updaten
              existing.forEach(async (doc) => {
                await doc.ref.update({ hasPurchased: true });
              });
            }
          }

          console.log('[Webhook] Purchase saved:', session.id);
        } catch (dbErr) {
          console.error('[Webhook] Firestore error:', dbErr);
        }
      } else {
        console.warn('[Webhook] No DB connection — purchase not saved:', session.id);
      }

      break;
    }

    case 'invoice.payment_succeeded': {
      // Für Subscription renewals
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      if (db && subscriptionId) {
        try {
          const subsRef = db.collection('subscriptions');
          const existing = await subsRef.where('stripeSubscriptionId', '==', subscriptionId).get();

          if (!existing.empty) {
            existing.forEach(async (doc) => {
              await doc.ref.update({
                lastPaymentAt: new Date().toISOString(),
                status: 'active',
              });
            });
          }
        } catch (e) {
          console.error('[Webhook] Subscription update error:', e);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      if (db) {
        try {
          const subsRef = db.collection('subscriptions');
          const existing = await subsRef.where('stripeSubscriptionId', '==', subscription.id).get();
          existing.forEach(async (doc) => {
            await doc.ref.update({ status: 'cancelled', cancelledAt: new Date().toISOString() });
          });
        } catch (e) {
          console.error('[Webhook] Subscription cancel error:', e);
        }
      }
      break;
    }

    default:
      console.log('[Webhook] Unhandled event:', event.type);
  }

  res.status(200).json({ received: true });
};
