export const CONFIG = {
  restaurantName: "مطعم النافورة",
  phone: "0910000000",
  deliveryFee: Number(import.meta.env.VITE_DELIVERY_FEE) || 5,
  mapCenter: { lat: 32.8752, lng: 13.1875 },
  currency: "د.ل",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyBMjM608kZV6J1Nn8rdU1dbXFjxWUk0pLI",
}
