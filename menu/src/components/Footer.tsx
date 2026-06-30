import { CONFIG } from "../config"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#ccc] px-4 sm:px-6 py-12 pb-8 mt-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-base font-black text-white mb-2.5">🍽 {CONFIG.restaurantName}</div>
            <div className="text-xs leading-relaxed text-[#999]">
              نقدم أشهى الوجبات العربية بأعلى معايير الجودة والنظافة
            </div>
            <div className="flex gap-2 mt-4">
              <a href="#" className="bg-[#2a2a2a] border border-[#333] text-[#ccc] px-3.5 py-1.5 rounded-full text-xs hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors">
                📘 فيسبوك
              </a>
              <a href="#" className="bg-[#2a2a2a] border border-[#333] text-[#ccc] px-3.5 py-1.5 rounded-full text-xs hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors">
                📸 إنستغرام
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">أوقات العمل</h4>
            <ul className="text-xs text-[#999] space-y-1.5">
              <li>السبت – الخميس</li>
              <li>12 ظهراً – 12 منتصف الليل</li>
              <li>الجمعة: 2م – 12م</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">مناطق التوصيل</h4>
            <ul className="text-xs text-[#999] space-y-1.5">
              <li>طرابلس – جميع الأحياء</li>
              <li>وسط المدينة، أبو سليم</li>
              <li>عين زارة، قرقارش</li>
              <li>جنزور، تاجوراء</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">تواصل معنا</h4>
            <ul className="text-xs text-[#999] space-y-1.5">
              <li>📞 {CONFIG.phone}</li>
              <li>📍 طرابلس، ليبيا</li>
              <li>🕐 دعم 7 أيام في الأسبوع</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] pt-5 text-center text-[0.7rem] text-[#666]">
          © {new Date().getFullYear()} {CONFIG.restaurantName} — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
