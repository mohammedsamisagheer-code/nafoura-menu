// Netlify Function: sends order to Telegram Bot API
// Set env vars in Netlify dashboard or .env:
//   TELEGRAM_BOT_TOKEN=your_bot_token
//   TELEGRAM_CHAT_ID=your_chat_id

interface OrderPayload {
  customer: {
    name: string
    phone: string
    notes: string
    lat: number
    lng: number
    address: string
  }
  items: { name: string; qty: number; price: number }[]
  subtotal: number
  deliveryFee: number
  total: number
}

function formatOrderMessage(p: OrderPayload): string {
  const itemsText = p.items
    .map((i) => `• ${i.name} × ${i.qty} = ${i.price * i.qty} د.ل`)
    .join("\n")

  const mapLink = `https://www.google.com/maps?q=${p.customer.lat},${p.customer.lng}`

  return [
    "السلام عليكم، طلب جديد من مطعم النافورة 🍽",
    "",
    `👤 الاسم: ${p.customer.name}`,
    `📞 الهاتف: ${p.customer.phone}`,
    `📍 العنوان: ${p.customer.address}`,
    `🗺 الموقع: ${mapLink}`,
    p.customer.notes ? `📝 ملاحظات: ${p.customer.notes}` : "",
    "",
    "الطلبات:",
    itemsText,
    "---",
    `المجموع الفرعي: ${p.subtotal} د.ل`,
    `رسوم التوصيل: ${p.deliveryFee} د.ل`,
    `الإجمالي: ${p.total} د.ل`,
    "",
    "شكراً لكم 🙏",
  ]
    .filter(Boolean)
    .join("\n")
}

export async function handler(event: { body: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Telegram credentials not configured" }),
    }
  }

  let payload: OrderPayload
  try {
    payload = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) }
  }

  if (!payload.customer.name || !payload.customer.phone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    }
  }

  const message = formatOrderMessage(payload)

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      },
    )

    const data = await resp.json()

    if (!data.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Telegram API error", detail: data }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Network error", detail: String(err) }),
    }
  }
}
