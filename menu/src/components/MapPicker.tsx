import { useCallback, useRef } from "react"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { CONFIG } from "../config"

const containerStyle = { width: "100%", height: "100%" }
const mapOptions = { disableDefaultUI: false, zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }

interface Props {
  position: { lat: number; lng: number }
  onChange: (pos: { lat: number; lng: number }, address: string) => void
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${CONFIG.googleMapsApiKey}&language=ar`
    )
    const data = await resp.json()
    return data.results?.[0]?.formatted_address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  }
}

export default function MapPicker({ position, onChange }: Props) {
  const mapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: CONFIG.googleMapsApiKey,
    language: "ar",
    region: "LY",
  })

  const handleLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const handleClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      const lat = e.latLng!.lat()
      const lng = e.latLng!.lng()
      const pos = { lat, lng }
      const addr = await reverseGeocode(lat, lng)
      onChange(pos, addr)
    },
    [onChange]
  )

  const handleMarkerDrag = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      const lat = e.latLng!.lat()
      const lng = e.latLng!.lng()
      const pos = { lat, lng }
      const addr = await reverseGeocode(lat, lng)
      onChange(pos, addr)
    },
    [onChange]
  )

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (geo) => {
        const pos = { lat: geo.coords.latitude, lng: geo.coords.longitude }
        mapRef.current?.panTo(pos)
        mapRef.current?.setZoom(16)
        const addr = await reverseGeocode(pos.lat, pos.lng)
        onChange(pos, addr)
      },
      () => {
        // fallback: center on Tripoli
        mapRef.current?.panTo(CONFIG.mapCenter)
      },
      { enableHighAccuracy: true }
    )
  }, [onChange])

  if (!isLoaded) {
    return (
      <div className="h-[220px] rounded-xl border border-surface-border bg-surface flex items-center justify-center text-sm text-fg-muted">
        جارٍ تحميل الخريطة...
      </div>
    )
  }

  return (
    <div className="relative h-[220px] rounded-xl overflow-hidden border border-surface-border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
        options={mapOptions}
        onClick={handleClick}
        onLoad={handleLoad}
      >
        <Marker
          position={position}
          draggable
          onDragEnd={handleMarkerDrag}
        />
      </GoogleMap>

      <button
        onClick={handleLocate}
        className="absolute top-3 left-3 z-10 bg-white w-[34px] h-[34px] flex items-center justify-center text-sm rounded-lg border border-surface-border shadow-sm cursor-pointer hover:bg-brand-50 transition-colors"
        title="حدد موقعي الحالي"
      >
        📍
      </button>
    </div>
  )
}
