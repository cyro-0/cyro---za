@@ -0,0 +1,44 @@
document.addEventListener('DOMContentLoaded', () => {
  // Simple sparkle effect on click
  document.body.addEventListener('click', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    document.body.appendChild(sparkle);

    const size = Math.random() * 20 + 5; // size between 5px and 25px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${e.clientX - size / 2}px`;
    sparkle.style.top = `${e.clientY - size / 2}px`;

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  });

  // Adding the sparkle CSS dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .sparkle {
      position: absolute;
      background-color: #0077c2;
      border-radius: 35%;
      opacity: 0;
      pointer-events: none;
      animation: sparkle-fade-out 1s forwards cubic-bezier(0.19, 1, 0.22, 1);
      box-shadow: 0 0 5px #00aaff, 0 0 10px #00aaff, 0 0 15px #00aaff;
    }

    @keyframes sparkle-fade-out {
      0% {
        opacity: 1;
        transform: scale(0.5);
      }
      100% {
        opacity: 0;
        transform: scale(2);
      }
    }
  `;
  document.head.appendChild(style);
});

  - package-ecosystem: "maven"
    directory: "/server/java/"
    schedule:
      interval: "weekly"
      day: "thursday"
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-patch"]
const express = require('express');
const app = express();
const stripe = require('stripe')('pk_live_51RvSdLCPJOFxdAiD046f9l7msOLzbUzBe9uMKR8lvqGQHmY9T1sDbPivodxsiGmycSDOW6zGL9urAoJ4ZyuweuWA00QY0xebJ9'); // Replace with your actual key

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Your Product Name',
        },
        unit_amount: 2000, // $20.00
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yourdomain.com/success',
    cancel_url: 'https://yourdomain.com/cancel',
  });

  res.json({ id: session.id });
});
