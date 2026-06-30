interface Cat {
  id: string
  name: string
  icon: string
}

interface Props {
  categories: Cat[]
  active: string
  onChange: (id: string) => void
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="flex gap-2 justify-center flex-wrap mb-10">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            active === cat.id
              ? "bg-brand-400 text-white"
              : "bg-white border border-surface-border text-fg-muted hover:border-brand-400 hover:text-brand-400"
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  )
}
