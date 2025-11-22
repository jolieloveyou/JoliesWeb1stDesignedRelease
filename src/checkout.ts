// src/checkout.ts
export async function checkout(amountInCents: number, productName: string, email?: string) {
  // Thay URL bằng function URL thực tế của bạn (Edge Function)
  const FUNCTION_URL = "https://tbgmfgkuhawgzseokvap.supabase.co/functions/v1/checkout";

  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: amountInCents,
      product_name: productName,
      email
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Failed to create checkout session");
  }

  const data = await res.json();

  // data.url là URL Checkout của Stripe
  if (!data.url) throw new Error("No checkout URL returned");
  // redirect
  window.location.href = data.url;
}
