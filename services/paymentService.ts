import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// 💳 Crear pago
export async function createPayment(amount: number) {
  if (!amount || amount <= 0) {
    throw new Error("Monto inválido");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe usa centavos
    currency: "usd",
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
}
