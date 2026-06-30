/* eslint-disable */
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

  const { customer, items, subtotal, deliveryFee, total } = payload

  if (!customer.name || !customer.phone) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) }
  }

  const itemsText = items
    .map((i) => `• ${i.name} × ${i.qty} = ${i.price * i.qty} د.ل`)
    .join("\n")

  const mapLink = `https://www.openstreetmap.org/?mlat=${customer.lat}&mlon=${customer.lng}#map=16/${customer.lat}/${customer.lng}`

  const message = `
السلام عليكم، طلب جديد من مطعم النافورة 🍽

👤 الاسم: ${customer.name}
📞 الهاتف: ${customer.phone}
📍 العنوان: ${customer.address}
🗺 الموقع: ${mapLink}
${customer.notes ? `📝 ملاحظات: ${customer.notes}` : ""}

الطلبات:
${itemsText}
---
المجموع الفرعي: ${subtotal} د.ل
رسوم التوصيل: ${deliveryFee} د.ل
الإجمالي: ${total} د.ل

شكراً لكم 🙏
  `.trim()

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
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
