{
  "functions": {
    "source": "functions"
  },
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/create-checkout-session",
        "function": "createCheckoutSession"
      },
      {
        "source": "/stripe-webhook",
        "function": "stripeWebhook"
      }
    ]
  }
}
