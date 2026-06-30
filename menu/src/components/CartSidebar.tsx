import { useCart } from "../store/cart-context"
import { useUi } from "../store/ui-store"
import { CONFIG } from "../config"

export default function CartSidebar() {
  const { items, subtotal, updateQty, removeItem } = useCart()
  const { cartOpen, setCartOpen, setDeliveryModalOpen } = useUi()
  const total = subtotal + CONFIG.deliveryFee

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-[950] transition-opacity duration-200 ${
          cartOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[440px] max-w-[95vw] bg-white border-l border-surface-border z-[960] flex flex-col transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h3 className="font-bold">🛒 سلة الطلبات</h3>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 bg-surface border border-surface-border rounded-full flex items-center justify-center text-sm text-fg-muted hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-14 text-[#bbb]">
              <div className="text-4xl mb-2 opacity-50">🛒</div>
              <p>سلتك فارغة</p>
              <small className="text-[0.75rem]">أضف وجباتك!</small>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-surface rounded-xl mb-2.5 border border-surface-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[58px] h-[58px] rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-fg truncate">{item.name}</div>
                  <div className="text-sm font-bold text-brand-400 mb-1.5">
                    {item.price * item.qty} {CONFIG.currency}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 bg-white border border-surface-border rounded-full text-xs flex items-center justify-center hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold min-w-[16px] text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 bg-white border border-surface-border rounded-full text-xs flex items-center justify-center hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mr-auto text-red-500 text-base hover:scale-110 transition-transform"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-surface-border">
            <div className="mb-3">
              <div className="flex justify-between text-sm text-fg-muted py-1">
                <span>المجموع الفرعي</span>
                <span>{subtotal} {CONFIG.currency}</span>
              </div>
              <div className="flex justify-between text-sm text-fg-muted py-1">
                <span>رسوم التوصيل</span>
                <span>{CONFIG.deliveryFee} {CONFIG.currency}</span>
              </div>
              <div className="flex justify-between text-base font-black text-fg border-t border-surface-border mt-1.5 pt-2.5">
                <span>الإجمالي</span>
                <span>{total} {CONFIG.currency}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setCartOpen(false)
                setDeliveryModalOpen(true)
              }}
              className="w-full bg-brand-400 text-white py-3 rounded-full text-sm font-bold hover:bg-brand-500 transition-colors"
            >
              📦 إتمام الطلب
            </button>
          </div>
        )}
      </div>
    </>
  )
}
