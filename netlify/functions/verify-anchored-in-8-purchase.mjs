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
  const expectedProductId = process.env.STRIPE_ANCHORED_IN_8_PRODUCT_ID;

  if (!sessionId) {
    return verificationFailed("missing_session_id", { sessionId, secretKey, expectedPriceId });
  }

  if (!secretKey) {
    return verificationFailed("missing_secret_key", { sessionId, secretKey, expectedPriceId });
  }

  if (!expectedPriceId) {
    return verificationFailed("missing_expected_price_id", { sessionId, secretKey, expectedPriceId });
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
      return verificationFailed("stripe_api_error", { sessionId, secretKey, expectedPriceId });
    }

    const session = await response.json();
    const lineItems = session.line_items?.data ?? [];
    const purchasedPriceId = lineItems.find((item) => item.price?.id)?.price?.id;
    const purchasedProductId = lineItems.find((item) => item.price?.product)?.price?.product;

    const diagnostic = {
      sessionId,
      secretKey,
      expectedPriceId,
      expectedProductId,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      purchasedPriceId,
      purchasedProductId,
    };

    if (session.payment_status !== "paid") {
      return verificationFailed("payment_not_paid", diagnostic);
    }

    if (session.amount_total !== EXPECTED_AMOUNT) {
      return verificationFailed("amount_mismatch", diagnostic);
    }

    if (session.currency !== EXPECTED_CURRENCY) {
      return verificationFailed("currency_mismatch", diagnostic);
    }

    if (purchasedPriceId !== expectedPriceId) {
      return verificationFailed("price_id_mismatch", diagnostic);
    }

    if (expectedProductId && purchasedProductId !== expectedProductId) {
      return verificationFailed("product_id_mismatch", diagnostic);
    }

    logDiagnostic("verified", diagnostic);
    return json({ verified: true }, 200);
  } catch {
    return verificationFailed("unknown_error", { sessionId, secretKey, expectedPriceId, expectedProductId });
  }
}

function verificationFailed(reason, diagnostic) {
  logDiagnostic(reason, diagnostic);
  return json({ verified: false, reason }, 200);
}

function logDiagnostic(reason, diagnostic) {
  console.info("Anchored In 8 purchase verification", {
    reason,
    hasSessionId: Boolean(diagnostic.sessionId),
    hasStripeSecretKey: Boolean(diagnostic.secretKey),
    hasExpectedPriceId: Boolean(diagnostic.expectedPriceId),
    paymentStatus: diagnostic.paymentStatus,
    amountTotal: diagnostic.amountTotal,
    currency: diagnostic.currency,
    purchasedPriceId: diagnostic.purchasedPriceId,
    expectedPriceId: diagnostic.expectedPriceId,
    purchasedProductId: diagnostic.purchasedProductId,
    failedCheck: reason,
  });
}

function json(body, statusCode) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
