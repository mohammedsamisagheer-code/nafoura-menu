import { useUi } from "../store/ui-store"

export default function OrderConfirmation() {
  const { successOpen, setSuccessOpen } = useUi()

  const handleNewOrder = () => {
    setSuccessOpen(false)
  }

  return (
    <div
      className={`fixed inset-0 bg-black/65 z-[2000] flex items-center justify-center p-6 transition-opacity duration-200 ${
        successOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-3xl p-12 text-center max-w-[380px] w-full">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-black text-[#2a9d5c] mb-2.5">تم إرسال طلبك!</h2>
        <p className="text-sm text-fg-muted leading-relaxed mb-7">
          سيتم التواصل معك على التيليغرام لتأكيد الطلب وتحديد موعد التوصيل
        </p>
        <button
          onClick={handleNewOrder}
          className="bg-brand-400 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-brand-500 transition-colors"
        >
          🍽 طلب جديد
        </button>
      </div>
    </div>
  )
}
