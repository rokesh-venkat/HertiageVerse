import { useEffect, useRef, useState } from 'react'
import { Map as MapLibreMap, Marker, Popup, NavigationControl } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getSitesForMap, UNESCO_GROUPS } from '../../data/heritageSites'
import { useTheme } from '../../hooks/useTheme'

// Center of Tamil Nadu — shows all heritage sites
const TAMILNADU_CENTER = [79.5, 11.5]
const TAMILNADU_ZOOM = 7

// Group colors for map markers
const GROUP_COLORS = {
  'mahabalipuram': { bg: '#d9a441', border: '#f2ebdd' },
  'chola-temples': { bg: '#e07841', border: '#f2ebdd' },
  'mountain-railways': { bg: '#41b8d9', border: '#f2ebdd' },
}

const SITES = getSitesForMap()

export default function HeritageMapView({ onSelectSite, selectedSiteId }) {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const { isDark } = useTheme()

  const themeRef = useRef(isDark)

  useEffect(() => {
    if (mapRef.current) return

    const map = new MapLibreMap({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            paint: themeRef.current
              ? { 'raster-saturation': -0.6, 'raster-brightness-min': 0.15 }
              : { 'raster-saturation': -0.2, 'raster-brightness-min': 0.4 },
          },
        ],
      },
      center: TAMILNADU_CENTER,
      zoom: TAMILNADU_ZOOM,
      attributionControl: { compact: true },
    })

    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')
    map.on('load', () => setMapReady(true))
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const map = mapRef.current
    const markers = []

    SITES.forEach((site) => {
      const colors = GROUP_COLORS[site.unescoGroup] || { bg: '#d9a441', border: '#14110d' }
      const isSelected = site.id === selectedSiteId
      const isFeatured = site.featured

      const el = document.createElement('button')
      el.setAttribute('aria-label', `View ${site.name}`)
      el.style.width = isFeatured || isSelected ? '20px' : '14px'
      el.style.height = isFeatured || isSelected ? '20px' : '14px'
      el.style.borderRadius = '50%'
      el.style.background = colors.bg
      el.style.border = `3px solid ${isSelected ? '#fff' : colors.border}`
      el.style.boxShadow = isSelected
        ? `0 0 0 4px ${colors.bg}50, 0 2px 12px rgba(0,0,0,0.5)`
        : isFeatured
          ? `0 0 0 3px ${colors.bg}25, 0 2px 8px rgba(0,0,0,0.5)`
          : '0 2px 6px rgba(0,0,0,0.4)'
      el.style.cursor = 'pointer'
      el.style.transition = 'all 0.2s ease'

      const groupName = UNESCO_GROUPS.find(g => g.id === site.unescoGroup)?.shortName || ''

      const popup = new Popup({ offset: 16, closeButton: false }).setHTML(
        `<div style="font-family: Inter, sans-serif; padding: 4px 2px; min-width:200px;">
           <p style="font-family: 'JetBrains Mono', monospace; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#b38330; margin:0 0 2px;">${groupName}</p>
           <p style="font-weight:600; font-size:14px; color:#14110d; margin:0 0 4px;">${site.name}</p>
           <p style="font-family: 'JetBrains Mono', monospace; font-size:10px; letter-spacing:0.05em; color:#6b5e4a; margin:0 0 6px;">${site.period}</p>
           <p style="font-size:12px; color:#4a4a4a; margin:0; line-height:1.4;">${site.shortDescription}</p>
         </div>`
      )

      const marker = new Marker({ element: el })
        .setLngLat([site.lng, site.lat])
        .setPopup(popup)
        .addTo(map)

      el.addEventListener('click', () => onSelectSite?.(site))
      markers.push(marker)
    })

    return () => markers.forEach((m) => m.remove())
  }, [mapReady, onSelectSite, selectedSiteId])

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-2xl overflow-hidden border border-basalt-700"
    />
  )
}
