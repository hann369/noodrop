// api/stripe-webhook.js — Vercel Serverless Function
// Empfängt Stripe Events und speichert Käufe in Firestore.
// OHNE firebase-admin — nutzt Firestore REST API mit Service Account Token.

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const FIRESTORE_PROJECT = process.env.FIREBASE_PROJECT_ID || 'Metacognition-c9be9';

/* 
  Hinweis: Da wir kein firebase-admin im Serverless Kontext nutzen,
  schreiben wir Käufe in eine öffentliche 'purchases' Collection.
  Das Frontend matched via email/uid.
*/

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing Stripe signature');

  /* Body parsen — Vercel parsed JSON body automatisch */
  let rawBody;
  if (typeof req.body === 'string') {
    rawBody = req.body;
  } else if (typeof req.body === 'object' && req.body !== null) {
    rawBody = JSON.stringify(req.body);
  } else {
    rawBody = JSON.stringify(req.body);
  }

  /* Stripe-Signatur manuell verifizieren */
  const crypto = require('crypto');
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

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (e) {
    return res.status(400).send('Invalid JSON body');
  }

  /* ── Events verarbeiten ── */
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      /* Metadata auslesen (Stripe speichert metadata als Objekt, nicht JSON-String) */
      const metadata = session.metadata || {};
      const firebaseUid = metadata.firebase_uid || null;
      const goal = metadata.goal || '';
      const email = metadata.email || session.customer_email || '';
      const productType = metadata.product_type || 'onetime';

      const purchase = {
        stripeSessionId: session.id,
        stripeCustomerId: session.customer || null,
        customerEmail: email,
        firebaseUid: firebaseUid,
        amountTotal: session.amount_total,
        currency: session.currency,
        goal: goal,
        productType: productType,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };

      /* In Firestore speichern via REST API */
      if (FIRESTORE_PROJECT) {
        try {
          await saveToFirestore('purchases', purchase);

          /* Wenn firebaseUid vorhanden: auch unter users/{uid}/purchases speichern */
          if (firebaseUid) {
            await saveToFirestore(`users/${firebaseUid}/purchases`, purchase);
          }

          console.log('[Webhook] Purchase saved:', session.id, 'uid:', firebaseUid);
        } catch (dbErr) {
          console.error('[Webhook] Firestore error:', dbErr);
        }
      } else {
        console.warn('[Webhook] No FIREBASE_PROJECT_ID — purchase not saved:', session.id);
      }

      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;
      const customerEmail = invoice.customer_email || '';

      if (FIRESTORE_PROJECT && subscriptionId) {
        try {
          await saveToFirestore('subscriptions', {
            stripeSubscriptionId: subscriptionId,
            customerEmail: customerEmail,
            status: 'active',
            lastPaymentAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error('[Webhook] Subscription update error:', e);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      if (FIRESTORE_PROJECT) {
        try {
          await saveToFirestore('subscriptions', {
            stripeSubscriptionId: subscription.id,
            status: 'cancelled',
            cancelledAt: new Date().toISOString(),
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

/* 
  Firestore REST API Helper
  Nutzt den öffentlich zugänglichen Firestore REST Endpoint.
  ACHTUNG: Dies erfordert dass Firestore Rules writes auf diese Collection erlauben
  ODER man nutzt einen Service Account (empfohlen für Prod).
  Für MVP: Wir schreiben direkt — wenn Rules es erlauben.
*/
async function saveToFirestore(collectionPath, data) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${collectionPath}`;

  /* Firestore REST API erwartet spezielles Datenformat */
  const docData = {};
  Object.keys(data).forEach(key => {
    const val = data[key];
    if (val === null || val === undefined) {
      docData[key] = { nullValue: null };
    } else if (typeof val === 'string') {
      docData[key] = { stringValue: val };
    } else if (typeof val === 'number') {
      docData[key] = { integerValue: String(val) };
    } else if (typeof val === 'boolean') {
      docData[key] = { booleanValue: val };
    } else {
      docData[key] = { stringValue: JSON.stringify(val) };
    }
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: docData }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firestore write failed: ${res.status} ${err}`);
  }

  return await res.json();
}
