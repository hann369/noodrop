const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);

admin.initializeApp();

// Create Stripe Checkout Session
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  
  try {
    const { productId, productName, amount, userId } = req.body;
    
    // Validate user
    if (!userId) {
      res.status(400).send('User ID is required');
      return;
    }
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/marketplace?success=true&productId=${productId}&userId=${userId}`,
      cancel_url: `${req.headers.origin}/marketplace?canceled=true`,
      client_reference_id: userId,
      metadata: {
        productId: productId,
        userId: userId
      }
    });
    
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Webhook to handle successful payments
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = functions.config().stripe.webhook_secret;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Store purchase information in Firestore
      const userId = session.client_reference_id;
      const productId = session.metadata.productId;
      
      if (userId && productId) {
        await admin.firestore().collection('users')
          .doc(userId)
          .collection('purchases')
          .add({
            productId: productId,
            amount: session.amount_total,
            currency: session.currency,
            status: 'completed',
            purchaseDate: admin.firestore.FieldValue.serverTimestamp(),
            sessionId: session.id
          });
        
        console.log(`Purchase recorded for user ${userId}, product ${productId}`);
      }
    } catch (error) {
      console.error('Error recording purchase:', error);
    }
  }
  
  res.json({ received: true });
});
