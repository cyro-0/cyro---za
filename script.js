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
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Replace with your actual key

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

document.addEventListener('DOMContentLoaded', () => {
  // Simple sparkle effect on click
  document.body.addEventListener('click', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    document.body.appendChild(sparkle);

    const size = Math.random() * 20 + 5;
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

  // Stripe Integration
  const purchaseButtons = document.querySelectorAll('.buy-button');
  const modal = document.getElementById('purchase-modal');
  const modalProductName = document.getElementById('modal-product-name');
  const modalPrice = document.getElementById('modal-price');
  const closeButton = document.querySelector('.close-button');
  const paymentForm = document.getElementById('payment-form');

  // Load Stripe with your publishable key
  const stripe = Stripe('pk_live_51RvSdLCPJOFxdAiD046f9l7msOLzbUzBe9uMKR8lvqGQHmY9T1sDbPivodxsiGmycSDOW6zGL9urAoJ4ZyuweuWA00QY0xebJ9');

  purchaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      const productPrice = parseFloat(button.getAttribute('data-price'));

      modalProductName.textContent = productName;
      modalPrice.textContent = `${productPrice.toFixed(2)}`;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // We will handle the actual Stripe payment logic here,
      // but for now, we'll let the user fill in the form.
      // The Stripe redirection will happen on form submission.
    });
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Handle form submission to create a checkout session
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = modalProductName.textContent;
    const productPrice = parseFloat(modalPrice.textContent.substring(1)); // Remove the '$'

    try {
      // Send a request to your server to create the Checkout Session
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          price: productPrice,
        }),
      });

      const session = await response.json();

      if (response.ok) {
        // Redirect to Stripe's secure Checkout page
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
          alert('An error occurred. Please try again.');
        }
      } else {
        console.error(session.error);
        alert('An error occurred while creating the payment session. Please try again.');
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('A network error occurred. Please check your connection and try again.');
    }
  });
});
