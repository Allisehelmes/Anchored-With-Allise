const STRIPE_API_VERSION = "2025-06-30.basil";
const EXPECTED_AMOUNT = 13500;
const EXPECTED_CURRENCY = "usd";

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json({ verified: false, error: "Method not allowed" }, 405);
  }

  const sessionId = event.queryStringParameters?.session_id;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const expectedPriceId = process.env.STRIPE_ANCHORED_IN_8_PRICE_ID;

  if (!sessionId || !secretKey || !expectedPriceId) {
    return json({ verified: false }, 200);
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=line_items.data.price`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Stripe-Version": STRIPE_API_VERSION,
        },
      }
    );

    if (!response.ok) {
      return json({ verified: false }, 200);
    }

    const session = await response.json();
    const lineItems = session.line_items?.data ?? [];
    const purchasedExpectedPrice = lineItems.some((item) => item.price?.id === expectedPriceId);
    const productMatches =
      !process.env.STRIPE_ANCHORED_IN_8_PRODUCT_ID ||
      lineItems.some((item) => item.price?.product === process.env.STRIPE_ANCHORED_IN_8_PRODUCT_ID);

    const verified =
      session.payment_status === "paid" &&
      session.amount_total === EXPECTED_AMOUNT &&
      session.currency === EXPECTED_CURRENCY &&
      purchasedExpectedPrice &&
      productMatches;

    return json({ verified }, 200);
  } catch {
    return json({ verified: false }, 200);
  }
}

function json(body, statusCode) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
