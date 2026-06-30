import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react"
import type { MenuItem, CartItem } from "../types"

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD"; item: MenuItem; qty: number }
  | { type: "UPDATE_QTY"; id: number; qty: number }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + action.qty } : i
          ),
        }
      }
      return { items: [...state.items, { ...action.item, qty: action.qty }] }
    }
    case "UPDATE_QTY": {
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) }
    case "CLEAR":
      return { items: [] }
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: MenuItem, qty?: number) => void
  updateQty: (id: number, qty: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addItem = useCallback((item: MenuItem, qty = 1) => {
    dispatch({ type: "ADD", item, qty })
  }, [])

  const updateQty = useCallback((id: number, qty: number) => {
    dispatch({ type: "UPDATE_QTY", id, qty })
  }, [])

  const removeItem = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" })
  }, [])

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0)
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, subtotal, addItem, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
