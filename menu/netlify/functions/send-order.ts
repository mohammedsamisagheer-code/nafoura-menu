// Netlify Function: sends order to WhatsApp Cloud API (Meta)
// Falls back to wa.me deep link if API credentials are not configured.
// Set env vars in Netlify dashboard or .env:
//   WHATSAPP_TOKEN=your_permanent_access_token
//   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
//   WHATSAPP_TO_NUMBER=21891XXXXXXX

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

  const mapLink = `https://www.openstreetmap.org/?mlat=${p.customer.lat}&mlon=${p.customer.lng}#map=16/${p.customer.lat}/${p.customer.lng}`

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

  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const toNumber = process.env.WHATSAPP_TO_NUMBER

  // Try WhatsApp Cloud API when credentials are configured
  if (token && phoneNumberId && toNumber) {
    try {
      const itemsList = payload.items
        .map((i) => `• ${i.name} ×${i.qty} = ${i.price * i.qty} د.ل`)
        .join("\n")

      const messageBody = [
        `👤 ${payload.customer.name}`,
        `📞 ${payload.customer.phone}`,
        `📍 ${payload.customer.address}`,
        payload.customer.notes ? `📝 ${payload.customer.notes}` : "",
        "",
        "--- الطلبات ---",
        itemsList,
        "---",
        `المجموع: ${payload.subtotal} د.ل`,
        `التوصيل: ${payload.deliveryFee} د.ل`,
        `الإجمالي: ${payload.total} د.ل`,
      ]
        .filter(Boolean)
        .join("\n")

      const resp = await fetch(
        `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: toNumber,
            type: "template",
            template: {
              name: "order_notification",
              language: { code: "ar" },
              components: [
                {
                  type: "body",
                  parameters: [{ type: "text", text: messageBody }],
                },
              ],
            },
          }),
        },
      )

      const data = await resp.json()

      if (data.error) {
        console.error("WhatsApp API error:", JSON.stringify(data.error))
        // Fall through to wa.me
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        }
      }
    } catch (err) {
      console.error("WhatsApp API network error:", String(err))
      // Fall through to wa.me
    }
  }

  // Fallback: return wa.me deep link data so the frontend can open it
  const waMeNumber = toNumber || "218000000000"
  const waMeText = formatOrderMessage(payload)
  const waMeUrl = `https://wa.me/${waMeNumber}?text=${encodeURIComponent(waMeText)}`

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      useWaMe: true,
      waMeUrl,
    }),
  }
}
