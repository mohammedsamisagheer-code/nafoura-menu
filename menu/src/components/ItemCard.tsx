import { useState } from "react"
import type { MenuItem } from "../types"
import { useCart } from "../store/cart-context"
import { CONFIG } from "../config"

interface Props {
  item: MenuItem
}

export default function ItemCard({ item }: Props) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(item, qty)
    setAdded(true)
    setQty(1)
    setTimeout(() => setAdded(false), 1100)
  }

  return (
    <div className="bg-white border border-surface-border rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-[190px] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {item.badge && (
          <span className="absolute top-3 right-3 bg-brand-400 text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-fg mb-1">{item.name}</h3>
        <p className="text-[0.75rem] text-fg-muted leading-relaxed mb-3.5 min-h-[36px]">
          {item.desc}
        </p>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-base font-black text-brand-400">
            {item.price} {CONFIG.currency}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 bg-surface border border-surface-border rounded-full text-xs flex items-center justify-center text-fg hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors"
            >
              −
            </button>
            <span className="font-bold text-sm min-w-[18px] text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 bg-surface border border-surface-border rounded-full text-xs flex items-center justify-center text-fg hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              added
                ? "bg-[#2a9d5c] text-white"
                : "bg-brand-400 text-white hover:bg-brand-500"
            }`}
          >
            {added ? "✓ تمت" : "+ أضف"}
          </button>
        </div>
      </div>
    </div>
  )
}
