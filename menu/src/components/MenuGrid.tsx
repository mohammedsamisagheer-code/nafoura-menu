import type { MenuItem } from "../types"
import ItemCard from "./ItemCard"

interface Props {
  items: MenuItem[]
}

export default function MenuGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-fg-muted">
        <div className="text-3xl mb-3 opacity-50">🔍</div>
        <p>لا توجد نتائج</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
