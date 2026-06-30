import { CONFIG } from "../config"

export default function Hero() {
  return (
    <section className="bg-white pt-28 pb-16 px-4 sm:px-6 border-b border-surface-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-400 border border-brand-100 rounded-full px-3.5 py-1 text-xs font-semibold mb-5">
            ✨ النكهة الأصيلة
          </div>

          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.15] text-fg mb-4">
            مطعم<br />
            <span className="text-brand-400">النافورة</span>
          </h1>

          <p className="text-base text-fg-light leading-relaxed mb-8 max-w-[440px]">
            تجربة طعام فريدة تجمع بين النكهات العربية الأصيلة والمذاق العصري — وجبات طازجة يومياً بأعلى معايير الجودة
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-brand-400 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-brand-500 transition-colors active:scale-[0.98]"
            >
              🍴 اطلب الآن
            </button>
            <a
              href={`tel:${CONFIG.phone}`}
              className="bg-white text-brand-400 border border-brand-400 px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-50 transition-colors"
            >
              📞 تواصل معنا
            </a>
          </div>

          <div className="flex gap-7 mt-9 pt-7 border-t border-surface-border">
            <div className="text-center">
              <div className="text-xl font-black text-fg">+500</div>
              <div className="text-[0.7rem] text-fg-muted mt-0.5">وجبة يومياً</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-fg">4.9 ⭐</div>
              <div className="text-[0.7rem] text-fg-muted mt-0.5">تقييم العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-fg">30 د</div>
              <div className="text-[0.7rem] text-fg-muted mt-0.5">متوسط التوصيل</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
            alt="وجبات"
            className="w-full h-[360px] object-cover rounded-2xl"
          />
          <div className="absolute bottom-5 right-5 bg-white border border-surface-border rounded-xl px-4 py-2.5 text-xs font-bold shadow-lg">
            🔥 الأكثر طلباً هذا الأسبوع
          </div>
        </div>
      </div>
    </section>
  )
}
