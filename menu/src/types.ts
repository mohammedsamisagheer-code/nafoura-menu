export interface MenuItem {
  id: number
  cat: string
  name: string
  desc: string
  price: number
  badge: string | null
  image: string
}

export interface CartItem extends MenuItem {
  qty: number
}

export interface CustomerInfo {
  name: string
  phone: string
  notes: string
  lat: number
  lng: number
  address: string
}

export interface OrderPayload {
  customer: CustomerInfo
  items: { name: string; qty: number; price: number }[]
  subtotal: number
  deliveryFee: number
  total: number
}
