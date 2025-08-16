import Stripe from "stripe";
import { ErrorHandler } from "../../../utils/errorHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      description: "brandify payment",
      metadata: { integration_check: "accept_a_payment" },
    });
    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(new ErrorHandler(400, error.message));
  }
};

export const sendStripeApiKey = (req, res) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
}