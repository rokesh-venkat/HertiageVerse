import { Router } from 'express'
import { rateLimit } from '../middleware/rateLimit.js'

const router = Router()
const cache = new Map()
const CACHE_TTL_MS = 5 * 60 * 1000
const VALID_TYPES = new Set(['hotel', 'restaurant'])
const VALID_SITE_SLUGS = new Set([
  'shore-temple',
  'pancha-rathas',
  'arjunas-penance',
  'brihadeeswarar-thanjavur',
  'gangaikonda-cholapuram',
  'airavatesvara-darasuram',
  'nilgiri-mountain-railway',
])
const nearbyRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many nearby-place requests. Please wait a moment and try again.',
})

function isLivePlacesEnabled() {
  return process.env.GOOGLE_MAPS_ENABLED === 'true' && Boolean(process.env.GOOGLE_MAPS_API_KEY)
}

function toPlaceResult(place, type, retrievedAt) {
  const name = place.displayName?.text || 'Nearby place'
  const mapsUrl = place.googleMapsUri
    || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`

  return {
    name,
    category: type === 'hotel' ? 'Accommodation' : 'Restaurant or cafe',
    address: place.formattedAddress || null,
    distance: 'Distance being verified',
    priceLevel: place.priceLevel || null,
    googleMapsUrl: mapsUrl,
    source: 'Google Places',
    retrievedAt,
  }
}

router.get('/:siteSlug/nearby', nearbyRateLimit, async (req, res) => {
  const { siteSlug } = req.params
  const type = typeof req.query.type === 'string' ? req.query.type.toLowerCase() : ''

  if (!VALID_SITE_SLUGS.has(siteSlug)) {
    return res.status(404).json({ error: 'Heritage site not found.' })
  }

  if (!VALID_TYPES.has(type)) {
    return res.status(400).json({ error: 'The "type" query must be "hotel" or "restaurant".' })
  }

  if (!isLivePlacesEnabled()) {
    return res.json({ enabled: false, items: [], retrievedAt: null })
  }

  const cacheKey = `${siteSlug}:${type}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) {
    return res.json(cached.value)
  }

  const retrievedAt = new Date().toISOString().slice(0, 10)
  const query = `${type === 'hotel' ? 'hotels' : 'restaurants'} near ${siteSlug.replace(/-/g, ' ')}`
  const url = 'https://places.googleapis.com/v1/places:searchText'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.googleMapsUri,places.priceLevel',
      },
      body: JSON.stringify({ textQuery: query, maxResultCount: 6 }),
    })
    if (!response.ok) throw new Error(`Google Places HTTP ${response.status}`)
    const payload = await response.json()

    const value = {
      enabled: true,
      items: (payload.places || []).slice(0, 6).map((place) => toPlaceResult(place, type, retrievedAt)),
      retrievedAt,
    }
    if (cache.size >= 32) cache.clear()
    cache.set(cacheKey, { createdAt: Date.now(), value })
    return res.json(value)
  } catch (err) {
    console.error('Nearby places error:', err)
    return res.status(502).json({ error: 'Nearby place data is temporarily unavailable.' })
  }
})

export default router
