import { useState, useMemo } from "react"
import { CartProvider } from "./store/cart-context"
import { UiProvider } from "./store/ui-store"
import { categories, menuItems } from "./data/menu"
import Header from "./components/Header"
import Hero from "./components/Hero"
import OfferBanner from "./components/OfferBanner"
import CategoryTabs from "./components/CategoryTabs"
import MenuGrid from "./components/MenuGrid"
import CartSidebar from "./components/CartSidebar"
import StickyCartBar from "./components/StickyCartBar"
import DeliveryForm from "./components/DeliveryForm"
import OrderConfirmation from "./components/OrderConfirmation"
import Footer from "./components/Footer"
import TelegramFloat from "./components/TelegramFloat"

function AppContent() {
  const [activeCat, setActiveCat] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let list = activeCat === "all" ? menuItems : menuItems.filter((i) => i.cat === activeCat)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((i) => i.name.includes(q) || i.desc.includes(q))
    }
    return list
  }, [activeCat, search])

  const handleCategoryChange = (id: string) => {
    setActiveCat(id)
    setSearch("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-fg">
      <Header />

      <Hero />

      <OfferBanner />

      <section id="menu" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-block bg-brand-50 text-brand-400 border border-brand-100 rounded-full px-3.5 py-1 text-xs font-semibold mb-3">
            قائمة الطعام
          </div>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-black text-fg">
            اختر من <span className="text-brand-400">أشهى الوجبات</span>
          </h2>
        </div>

        <div className="relative max-w-sm mx-auto mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value) setActiveCat("all")
            }}
            placeholder="ابحث في القائمة..."
            className="w-full px-4 py-2.5 pr-10 border border-surface-border rounded-full text-sm bg-surface text-fg focus:outline-none focus:border-brand-400 focus:bg-white transition-colors"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-fg-muted pointer-events-none">
            🔍
          </span>
        </div>

        {!search && (
          <CategoryTabs
            categories={categories}
            active={activeCat}
            onChange={handleCategoryChange}
          />
        )}

        <MenuGrid items={filtered} />
      </section>

      <CartSidebar />
      <DeliveryForm />
      <OrderConfirmation />
      <StickyCartBar />
      <TelegramFloat />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <UiProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UiProvider>
  )
}
