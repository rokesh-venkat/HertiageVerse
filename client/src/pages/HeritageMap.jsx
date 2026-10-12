import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import Navbar from '../components/ui/Navbar'
import HeritageMapView from '../components/map/HeritageMapView'
import { getGoogleMapsUrl, HERITAGE_SITES, UNESCO_GROUPS } from '../data/heritageSites'
import { useTheme } from '../hooks/useTheme'

export default function HeritageMap() {
  const { isDark } = useTheme()
  const bgOverlayStart = isDark ? 'rgba(20, 17, 13, 0.93)' : 'rgba(254, 252, 248, 0.93)'
  const bgOverlayEnd = isDark ? 'rgba(20, 17, 13, 0.99)' : 'rgba(254, 252, 248, 0.99)'

  const pageBgStyle = {
    backgroundImage: `radial-gradient(circle at top, ${bgOverlayStart} 0%, ${bgOverlayEnd} 100%), url('/images/general-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
  }

  const navigate = useNavigate()
  const [selectedSite, setSelectedSite] = useState(
    HERITAGE_SITES.find((s) => s.featured) ?? HERITAGE_SITES[0]
  )
  const [filterGroup, setFilterGroup] = useState('all')

  const filteredSites =
    filterGroup === 'all'
      ? HERITAGE_SITES
      : HERITAGE_SITES.filter((s) => s.unescoGroup === filterGroup)

  return (
    <div className="min-h-screen bg-basalt-950 transition-colors duration-300" style={pageBgStyle}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
          Tamil Nadu UNESCO World Heritage
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-sand-100 mb-6">
          Heritage Map
        </h1>

        {/* UNESCO Group Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilterGroup('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-colors ${
              filterGroup === 'all'
                ? 'bg-gold-500 text-basalt-950'
                : 'border border-basalt-700 text-sand-500 hover:border-gold-600 hover:text-gold-400'
            }`}
          >
            All Sites
          </button>
          {UNESCO_GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => setFilterGroup(group.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-colors ${
                filterGroup === group.id
                  ? 'bg-gold-500 text-basalt-950'
                  : 'border border-basalt-700 text-sand-500 hover:border-gold-600 hover:text-gold-400'
              }`}
            >
              {group.shortName}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <div className="h-130 rise-in">
            <HeritageMapView
              onSelectSite={setSelectedSite}
              selectedSiteId={selectedSite?.id}
            />
          </div>

          <div className="rise-in" style={{ animationDelay: '0.1s' }}>
            {/* Site List */}
            <div className="max-h-80 overflow-y-auto pr-1 mb-4 space-y-2">
              {filteredSites.map((site) => {
                const isActive = site.id === selectedSite?.id
                return (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    className={`w-full text-left rounded-xl border p-4 transition-colors ${
                      isActive
                        ? 'border-gold-600/60 bg-basalt-900'
                        : 'border-basalt-800 hover:border-basalt-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={13} className={isActive ? 'text-gold-500' : 'text-sand-500'} />
                      <span className="font-medium text-sand-100">{site.name}</span>
                      {site.has3DModel && (
                        <span className="ml-auto text-[9px] font-mono px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 uppercase tracking-wider">
                          3D
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-sand-500">
                      {site.period}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Selected Site Detail Panel */}
            {selectedSite && (
              <div className="rounded-xl border border-basalt-700 bg-basalt-900 p-5 slide-up">
                <p className="font-mono text-[11px] uppercase tracking-widest text-gold-500 mb-1">
                  {selectedSite.district} · {selectedSite.period}
                </p>
                <h2 className="font-display text-xl text-sand-100 mb-2">{selectedSite.name}</h2>
                <p className="text-sm text-sand-500 leading-relaxed mb-5">
                  {selectedSite.shortDescription}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/heritage/${selectedSite.slug}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold-500 text-basalt-950 font-medium hover:bg-gold-400 transition-colors"
                  >
                    {selectedSite.has3DModel ? 'Explore in 3D' : 'Explore Heritage Site'}
                    <ArrowRight size={15} />
                  </button>
                  <a
                    href={getGoogleMapsUrl(selectedSite)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${selectedSite.name} in Google Maps`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gold-600/60 text-gold-400 hover:bg-gold-500 hover:text-basalt-950 transition-colors text-xs font-medium"
                  >
                    <ExternalLink size={14} /> Open in Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
