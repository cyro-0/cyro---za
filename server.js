require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your files are in a 'public' folder

// The endpoint our front-end will call
app.post('/create-checkout-session', async (req, res) => {
  const { productName, price } = req.body;

  if (!productName || !price) {
    return res.status(400).json({ error: 'Product name and price are required.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: price * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // These URLs are where Stripe will redirect the user after payment
      success_url: `${req.protocol}://${req.get('host')}/purchase.html?success=true`,
      cancel_url: `${req.protocol}://${req.get('host')}/purchase.html?canceled=true`,
    });

    res.json({ id: session.id });
  } catch (e) {
    console.error("Error creating checkout session:", e.message);
    res.status(500).json({ error: e.message });
  }
});

// Handle all other GET requests to serve the main files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.url));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
