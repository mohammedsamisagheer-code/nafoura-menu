import { useCart } from "../store/cart-context"
import { useUi } from "../store/ui-store"
import { CONFIG } from "../config"

export default function Header() {
  const { totalItems } = useCart()
  const { toggleCart } = useUi()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-border transition-shadow">
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 bg-brand-400 rounded-xl flex items-center justify-center text-xl">
            🍽
          </div>
          <div>
            <div className="text-sm font-black text-fg">{CONFIG.restaurantName}</div>
            <div className="text-[0.65rem] text-fg-muted -mt-0.5">مطعم راقي · طرابلس</div>
          </div>
        </div>

        <div className="mr-auto" />

        <button
          onClick={toggleCart}
          className="flex items-center gap-2 bg-white border border-surface-border rounded-full px-4 py-2 text-sm font-semibold text-fg hover:border-brand-400 transition-colors shrink-0 relative"
        >
          <span>🛒</span>
          <span className="hidden sm:inline">السلة</span>
          <span className="bg-brand-400 text-white text-[0.65rem] font-bold w-[19px] h-[19px] rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      </div>
    </nav>
  )
}
