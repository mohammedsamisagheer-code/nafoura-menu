export default function OfferBanner() {
  return (
    <div className="bg-brand-400 text-white py-3 px-4 text-center text-sm font-semibold">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 flex-wrap">
        <span>🔥 عرض خاص: خصم 20% على جميع المشاوي يوم الجمعة!</span>
        <span className="bg-white/20 border border-white/40 px-3 py-1 rounded-full font-black tracking-wide text-xs">
          كود: GRILL20
        </span>
      </div>
    </div>
  )
}
