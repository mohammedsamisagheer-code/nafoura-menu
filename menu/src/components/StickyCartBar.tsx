import { useCart } from "../store/cart-context"
import { useUi } from "../store/ui-store"
import { CONFIG } from "../config"

export default function StickyCartBar() {
  const { totalItems, subtotal } = useCart()
  const { toggleCart } = useUi()
  const total = subtotal + CONFIG.deliveryFee

  if (totalItems === 0) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[850] px-4 py-3 bg-white border-t border-surface-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
        totalItems > 0 ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-[600px] mx-auto flex items-center gap-3.5">
        <div className="flex-1">
          <div className="text-[0.7rem] text-fg-muted mb-0.5">
            {totalItems} {totalItems === 1 ? "عنصر" : "عناصر"} في السلة
          </div>
          <div className="text-base font-black text-fg">
            الإجمالي: <span className="text-brand-400">{total} {CONFIG.currency}</span>
          </div>
        </div>
        <button
          onClick={toggleCart}
          className="bg-brand-400 text-white px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-2 hover:bg-brand-500 transition-colors"
        >
          🛒 عرض السلة
          <span className="bg-white/25 rounded-full px-2 py-0.5 text-xs font-black">{totalItems}</span>
        </button>
      </div>
    </div>
  )
}
