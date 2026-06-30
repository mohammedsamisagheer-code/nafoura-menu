import { useState } from "react"
import { useCart } from "../store/cart-context"
import { useUi } from "../store/ui-store"
import { CONFIG } from "../config"
import MapPicker from "./MapPicker"

export default function DeliveryForm() {
  const { items, subtotal, clearCart } = useCart()
  const { deliveryModalOpen, setDeliveryModalOpen, setSuccessOpen } = useUi()
  const total = subtotal + CONFIG.deliveryFee

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [position, setPosition] = useState(CONFIG.mapCenter)
  const [address, setAddress] = useState("طرابلس، ليبيا")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")

  const handlePositionChange = (pos: { lat: number; lng: number }, addr: string) => {
    setPosition(pos)
    setAddress(addr)
  }

  const handleSubmit = async () => {
    setError("")

    if (!name.trim()) { setError("يرجى إدخال الاسم الكامل"); return }
    if (!phone.trim()) { setError("يرجى إدخال رقم الهاتف"); return }

    setSending(true)

    try {
      const payload = {
        customer: { name: name.trim(), phone: phone.trim(), notes: notes.trim(), lat: position.lat, lng: position.lng, address },
        items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        subtotal,
        deliveryFee: CONFIG.deliveryFee,
        total,
      }

      const resp = await fetch("/.netlify/functions/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await resp.json()

      if (!resp.ok || !data.success) {
        throw new Error()
      }

      clearCart()
      setName("")
      setPhone("")
      setNotes("")
      setPosition(CONFIG.mapCenter)
      setAddress("طرابلس، ليبيا")
      setDeliveryModalOpen(false)
      setSuccessOpen(true)
    } catch {
      setError("فشل إرسال الطلب")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div
        onClick={() => setDeliveryModalOpen(false)}
        className={`fixed inset-0 bg-black/55 z-[1000] flex items-center justify-center p-5 transition-opacity duration-200 ${
          deliveryModalOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-[480px] max-h-[92vh] overflow-y-auto transition-transform duration-200"
          style={{ transform: deliveryModalOpen ? "scale(1)" : "scale(0.95)" }}
        >
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-surface-border">
            <h3 className="font-bold">🏠 معلومات التوصيل</h3>
            <button
              onClick={() => setDeliveryModalOpen(false)}
              className="w-8 h-8 bg-surface border border-surface-border rounded-full flex items-center justify-center text-sm text-fg-muted hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-6 flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-fg-muted">الاسم الكامل *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أحمد محمد"
                className="px-3.5 py-2.5 border border-surface-border rounded-xl text-sm text-fg bg-surface focus:outline-none focus:border-brand-400 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-fg-muted">رقم الهاتف *</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912345678"
                type="tel"
                className="px-3.5 py-2.5 border border-surface-border rounded-xl text-sm text-fg bg-surface focus:outline-none focus:border-brand-400 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-fg-muted">
                حدد موقع التوصيل على الخريطة
                <span className="text-[0.6rem] text-fg-muted mr-1">(اسحب العلامة أو اضغط على الخريطة)</span>
              </label>
              <MapPicker position={position} onChange={handlePositionChange} />
              {address && (
                <div className="text-[0.65rem] text-fg-muted mt-1 truncate" title={address}>
                  📍 {address}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-fg-muted">ملاحظات إضافية (اختياري)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي طلبات خاصة؟"
                rows={2}
                className="px-3.5 py-2.5 border border-surface-border rounded-xl text-sm text-fg bg-surface focus:outline-none focus:border-brand-400 focus:bg-white transition-colors resize-vertical min-h-[60px]"
              />
            </div>

            {error && (
              <div className="text-red-500 text-xs font-semibold text-center">{error}</div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-surface-border">
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full bg-brand-400 text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-500 transition-colors disabled:opacity-60"
            >
              {sending ? "جارٍ الإرسال..." : "📱 تأكيد الطلب عبر التيليغرام"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
