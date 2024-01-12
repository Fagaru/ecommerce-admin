import Stripe from "stripe";

const key : string = process.env.STRIPE_API_KEY as string;
export const stripe = new Stripe(key, {
    apiVersion: "2023-10-16",
    typescript: true,
});

// apiVersion: "2022-11-15",