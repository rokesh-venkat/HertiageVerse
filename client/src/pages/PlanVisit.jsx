import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Accessibility,
  ArrowLeft,
  Bus,
  CalendarDays,
  Car,
  Clock,
  ExternalLink,
  Hotel,
  MapPin,
  Plane,
  ShieldAlert,
  Ticket,
  Train,
  Utensils,
} from 'lucide-react'
import Navbar from '../components/ui/Navbar'
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsNearbySearchUrl,
  getGoogleMapsUrl,
  getSiteById,
  getSiteBySlug,
} from '../data/heritageSites'
import { getTravelGuide } from '../data/travelGuide'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function ExternalMapLink({ href, label, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors ${className}`}
    >
      {children}
      <ExternalLink size={14} />
    </a>
  )
}

function DataRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={17} className="text-gold-500 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-sand-500 mb-1">{label}</p>
        <p className="text-sm text-sand-200 wrap-break-word">{value || 'Information being verified'}</p>
      </div>
    </div>
  )
}

function NearbySection({ site, type, guide, nearby }) {
  const isHotel = type === 'hotel'
  const Icon = isHotel ? Hotel : Utensils
  const title = isHotel ? 'Nearby Stay' : 'Nearby Food'
  const items = nearby.items.length > 0 ? nearby.items : guide?.[isHotel ? 'nearbyStays' : 'nearbyFood'] || []
  const searchUrl = getGoogleMapsNearbySearchUrl(site, isHotel ? 'hotels' : 'restaurants')

  return (
    <section className="rounded-xl border border-basalt-700 bg-basalt-900 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <Icon size={19} className="text-gold-500" />
          <div>
            <h2 className="font-display text-xl text-sand-100">{title}</h2>
            <p className="text-xs text-sand-500 mt-1">
              {nearby.retrievedAt ? `Retrieved on ${nearby.retrievedAt}` : 'Curated data is not configured'}
            </p>
          </div>
        </div>
      </div>

      {nearby.status === 'loading' && (
        <p className="text-sm text-sand-500 animate-pulse">Checking available nearby-place data...</p>
      )}
      {nearby.status === 'error' && (
        <p className="text-sm text-sand-500 mb-4">Nearby-place data is temporarily unavailable.</p>
      )}
      {nearby.status !== 'loading' && items.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {items.map((item) => (
            <div key={`${item.name}-${item.address || item.distance}`} className="rounded-lg border border-basalt-700 bg-basalt-950/50 p-4">
              <h3 className="font-display text-base text-sand-100">{item.name}</h3>
              <p className="text-xs text-sand-500 mt-1">{item.category || item.cuisine || 'Nearby place'} · {item.distance || 'Distance being verified'}</p>
              {item.address && <p className="text-xs text-sand-500 mt-2">{item.address}</p>}
              <div className="mt-3 flex items-center justify-between gap-3 text-[11px]">
                <span className="text-sand-500">{item.source || 'Live provider'} · {item.lastVerified || item.retrievedAt || 'Retrieved recently'}</span>
                {item.googleMapsUrl && <ExternalMapLink href={item.googleMapsUrl} label={`Open ${item.name} in Google Maps`}>Map</ExternalMapLink>}
              </div>
            </div>
          ))}
        </div>
      )}
      {nearby.status !== 'loading' && items.length === 0 && (
        <p className="text-sm text-sand-500 mb-5">No verified listings are curated yet. Use the map search to check current options.</p>
      )}
      <ExternalMapLink href={searchUrl} label={`Search for ${isHotel ? 'hotels' : 'restaurants'} near ${site.name} in Google Maps`} className="text-xs font-mono uppercase tracking-widest">
        Search {isHotel ? 'hotels' : 'restaurants'} near {site.name}
      </ExternalMapLink>
    </section>
  )
}

export default function PlanVisit() {
  const { siteId } = useParams()
  const site = getSiteById(siteId) || getSiteBySlug(siteId)
  const guide = site ? getTravelGuide(site.slug) : null
  const [nearby, setNearby] = useState({
    hotel: { status: 'loading', items: [] },
    restaurant: { status: 'loading', items: [] },
  })

  useEffect(() => {
    if (!site) return
    let cancelled = false

    const loadNearby = async (type) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sites/${site.slug}/nearby?type=${type}`)
        if (!response.ok) throw new Error('Nearby data request failed')
        const data = await response.json()
        if (!cancelled) {
          setNearby((current) => ({
            ...current,
            [type]: {
              status: 'ready',
              items: data.items || [],
              retrievedAt: data.retrievedAt,
            },
          }))
        }
      } catch {
        if (!cancelled) {
          setNearby((current) => ({ ...current, [type]: { status: 'error', items: [] } }))
        }
      }
    }

    loadNearby('hotel')
    loadNearby('restaurant')
    return () => {
      cancelled = true
    }
  }, [site])

  if (!site) {
    return (
      <div className="min-h-screen bg-basalt-950">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-3xl text-sand-100 mb-3">Site not found</h1>
          <p className="text-sand-500 mb-6">We could not find a heritage site matching this visit plan.</p>
          <Link to="/explore" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300">
            <ArrowLeft size={16} /> Back to Explore
          </Link>
        </main>
      </div>
    )
  }

  const travelInfo = site.travelInfo || {}
  const directionsUrl = getGoogleMapsDirectionsUrl(site)
  const siteMapUrl = getGoogleMapsUrl(site)

  return (
    <div className="min-h-screen bg-basalt-950">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8 sm:py-10">
        <Link to={`/heritage/${site.slug}`} className="inline-flex items-center gap-2 text-sand-500 hover:text-gold-400 text-sm mb-8">
          <ArrowLeft size={15} /> Back to {site.name}
        </Link>

        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">Tourist Guide</p>
          <h1 className="font-display text-3xl sm:text-4xl text-sand-100 mb-2">Plan Your Visit</h1>
          <p className="text-sand-500">{site.name} · {site.location}</p>
        </header>

        <div className="space-y-6">
          <section className="rounded-xl border border-gold-600/50 bg-basalt-900 p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-2">Quick Visit Summary</p>
                <h2 className="font-display text-2xl text-sand-100 mb-2">{site.name}</h2>
                <p className="text-sm text-sand-500">{site.location} · {site.district} district</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ExternalMapLink href={siteMapUrl} label={`Open ${site.name} in Google Maps`} className="rounded-full bg-gold-500 px-4 py-2 text-xs font-medium text-basalt-950 hover:bg-gold-400">
                  <MapPin size={14} /> Open in Google Maps
                </ExternalMapLink>
                <ExternalMapLink href={directionsUrl} label={`Get directions to ${site.name} in Google Maps`} className="rounded-full border border-basalt-600 px-4 py-2 text-xs font-medium text-sand-200 hover:border-gold-500 hover:text-gold-400">
                  <Car size={14} /> Directions
                </ExternalMapLink>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
              <DataRow icon={CalendarDays} label="Best time" value={travelInfo.bestTime} />
              <DataRow icon={Clock} label="Opening hours" value={travelInfo.timings} />
              <DataRow icon={Ticket} label="Entry fee" value={travelInfo.entryFee} />
              <DataRow icon={Clock} label="Recommended duration" value={guide?.recommendedDuration} />
            </div>
            <p className="mt-6 text-xs text-sand-500">Last verified: <span className="text-sand-300">{guide?.lastVerified || 'Information being verified'}</span>. Confirm changing details before visiting.</p>
          </section>

          <section className="rounded-xl border border-basalt-700 bg-basalt-900 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5"><MapPin size={19} className="text-gold-500" /><h2 className="font-display text-xl text-sand-100">Getting There</h2></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <DataRow icon={MapPin} label="Nearest city" value={travelInfo.nearestCity} />
              <DataRow icon={Plane} label="Nearest airport" value={travelInfo.nearestAirport} />
              <DataRow icon={Train} label="Nearest railway station" value={guide?.nearestRailwayStation?.name} />
              <DataRow icon={Bus} label="Nearest bus stand" value={guide?.nearestBusStand?.name} />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {(guide?.transportOptions || []).map((option) => (
                <div key={`${option.type}-${option.description}`} className="rounded-lg border border-basalt-700 bg-basalt-950/50 p-4">
                  <div className="flex items-center gap-2 text-sm text-sand-200 mb-2"><Car size={15} className="text-gold-500" />{option.type}</div>
                  <p className="text-sm text-sand-500 leading-relaxed">{option.description}</p>
                  <p className="text-[11px] text-sand-700 mt-3">Planning source: {option.source}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-sand-500">Recommended routes and travel times are planning estimates. Live schedules are not provided.</p>
            <ExternalMapLink href={directionsUrl} label={`Get directions to ${site.name} from your location in Google Maps`} className="mt-4 text-xs font-mono uppercase tracking-widest">Open directions in Google Maps</ExternalMapLink>
          </section>

          <section className="rounded-xl border border-basalt-700 bg-basalt-900 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5"><Ticket size={19} className="text-gold-500" /><h2 className="font-display text-xl text-sand-100">Entry and Visitor Information</h2></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
              <DataRow icon={Ticket} label="Indian / foreign fee" value={travelInfo.entryFee} />
              <DataRow icon={Clock} label="Timings" value={travelInfo.timings} />
              <DataRow icon={CalendarDays} label="Weekly closures" value="Information being verified" />
              <DataRow icon={Accessibility} label="Accessibility" value="Information being verified on site" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-basalt-700 p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-2">Respect the monument</p><p className="text-sm text-sand-500 leading-relaxed">Follow current footwear, dress, worship etiquette, photography, and restricted-area guidance posted by site authorities.</p></div>
              <div className="rounded-lg border border-gold-600/30 p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-2">Confirm before visiting</p><p className="text-sm text-sand-500 leading-relaxed">Fees, hours, closures, photography rules, and access arrangements may change. Check official notices on the day of travel.</p></div>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-6">
            <NearbySection site={site} type="hotel" guide={guide} nearby={nearby.hotel} />
            <NearbySection site={site} type="restaurant" guide={guide} nearby={nearby.restaurant} />
          </div>

          <section className="rounded-xl border border-basalt-700 bg-basalt-900 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5"><CalendarDays size={19} className="text-gold-500" /><h2 className="font-display text-xl text-sand-100">Suggested Itinerary</h2></div>
            <div className="space-y-3">
              {(guide?.itinerary || []).map((stop, index) => (
                <div key={stop.title} className="flex gap-4 rounded-lg border border-basalt-700 bg-basalt-950/40 p-4">
                  <span className="font-display text-xl text-gold-500">{index + 1}</span>
                  <div><h3 className="font-display text-base text-sand-100">{stop.title}</h3><p className="text-xs text-gold-400 mt-1">{stop.duration}</p><p className="text-sm text-sand-500 leading-relaxed mt-2">{stop.note}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-sand-500">All durations and transfer notes are estimates. Great Living Chola Temples are presented as separate plans because the sites are in different cities.</p>
          </section>

          <section className="rounded-xl border border-basalt-700 bg-basalt-900 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5"><ShieldAlert size={19} className="text-gold-500" /><h2 className="font-display text-xl text-sand-100">Travel Tips and Safety</h2></div>
            <ul className="grid md:grid-cols-2 gap-3">
              {(guide?.visitorNotes || []).map((note) => <li key={note} className="flex items-start gap-3 text-sm text-sand-500 leading-relaxed"><ShieldAlert size={15} className="text-gold-500 mt-0.5 shrink-0" />{note}</li>)}
            </ul>
            <p className="mt-5 text-xs text-sand-500">Weather, access, and local rules can change. Use official site notices and emergency services for current guidance.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
