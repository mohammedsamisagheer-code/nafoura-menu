import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface UiStoreValue {
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  toggleCart: () => void
  deliveryModalOpen: boolean
  setDeliveryModalOpen: (v: boolean) => void
  successOpen: boolean
  setSuccessOpen: (v: boolean) => void
}

const UiContext = createContext<UiStoreValue | null>(null)

export function UiProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const toggleCart = useCallback(() => setCartOpen((v) => !v), [])

  return (
    <UiContext.Provider
      value={{ cartOpen, setCartOpen, toggleCart, deliveryModalOpen, setDeliveryModalOpen, successOpen, setSuccessOpen }}
    >
      {children}
    </UiContext.Provider>
  )
}

export function useUi() {
  const ctx = useContext(UiContext)
  if (!ctx) throw new Error("useUi must be used within UiProvider")
  return ctx
}
