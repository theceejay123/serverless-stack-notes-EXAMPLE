import handler from "./libs/handler";
import stripePackage from "stripe";
import { calculatedCost } from "./libs/billing";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculatedCost(storage);
  const description = "Note storage charge";

  // Load our secret key from the environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "cad",
  });

  return { status: true };
});
