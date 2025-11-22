//checkout.ts
export async function checkout(amount: number, productId: string) {
  try {
    const res = await fetch(
      "https://tbgmfgkuhawgzseokvap.supabase.co/functions/v1/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, productId }),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Chuyển người dùng sang trang thanh toán Stripe
    window.location.href = data.url;
  } catch (err) {
    console.error("Checkout failed:", err);
    alert("Không thể thanh toán, thử lại sau.");
  }
}
