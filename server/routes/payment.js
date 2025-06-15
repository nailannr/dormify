const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Application = require('../models/Application');

// Create Stripe Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { studentId, studentName } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: 'Dormitory Admission Fee',
              description: `One-time payment for ${studentName || 'student'}`,
            },
            unit_amount: 2100 * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/user/applicationStatus`,
      metadata: {
        studentId,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

// Confirm payment and update application as paid
router.post('/confirm', async (req, res) => {
  const { session_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
      const studentId = session.metadata.studentId;
      await Application.findByIdAndUpdate(studentId, {
        paid: true,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
      });
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Payment not completed." });
    }
  } catch (err) {
    console.error("Stripe confirm error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
