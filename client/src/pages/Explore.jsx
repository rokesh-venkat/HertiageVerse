import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Search, Layers, Globe, Train } from 'lucide-react'
import Navbar from '../components/ui/Navbar'
import { HERITAGE_SITES, UNESCO_GROUPS, getSitesByGroup } from '../data/heritageSites'
import { useTheme } from '../hooks/useTheme'

const GROUP_ICONS = {
  'mahabalipuram': Layers,
  'chola-temples': Globe,
  'mountain-railways': Train,
}

export default function Explore() {
  const { isDark } = useTheme()
  const bgOverlayStart = isDark ? 'rgba(20, 17, 13, 0.93)' : 'rgba(254, 252, 248, 0.93)'
  const bgOverlayEnd = isDark ? 'rgba(20, 17, 13, 0.99)' : 'rgba(254, 252, 248, 0.99)'

  const pageBgStyle = {
    backgroundImage: `radial-gradient(circle at top, ${bgOverlayStart} 0%, ${bgOverlayEnd} 100%), url('/images/general-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
  }

  const [filterGroup, setFilterGroup] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSites = HERITAGE_SITES.filter((site) => {
    const matchesGroup = filterGroup === 'all' || site.unescoGroup === filterGroup
    const matchesSearch =
      !searchQuery ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.dynasty.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGroup && matchesSearch
  })

  return (
    <div className="min-h-screen bg-basalt-950 transition-colors duration-300" style={pageBgStyle}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
          Tamil Nadu UNESCO World Heritage
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-sand-100 mb-2">
          Explore Heritage
        </h1>
        <p className="text-sand-500 mb-8 max-w-xl">
          Discover Tamil Nadu's seven UNESCO World Heritage locations — from Pallava rock-cut temples
          to Chola architectural marvels and a colonial-era mountain railway.
        </p>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-500" />
            <input
              type="text"
              placeholder="Search sites, districts, dynasties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-basalt-900 border border-basalt-700 text-sand-100 placeholder:text-sand-500 text-sm focus:outline-none focus:border-gold-600 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterGroup('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition-colors ${
                filterGroup === 'all'
                  ? 'bg-gold-500 text-basalt-950'
                  : 'border border-basalt-700 text-sand-500 hover:border-gold-600 hover:text-gold-400'
              }`}
            >
              All ({HERITAGE_SITES.length})
            </button>
            {UNESCO_GROUPS.map((group) => {
              const count = getSitesByGroup(group.id).length
              return (
                <button
                  key={group.id}
                  onClick={() => setFilterGroup(group.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition-colors ${
                    filterGroup === group.id
                      ? 'bg-gold-500 text-basalt-950'
                      : 'border border-basalt-700 text-sand-500 hover:border-gold-600 hover:text-gold-400'
                  }`}
                >
                  {group.shortName} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Site Grid */}
        {filteredSites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sand-500 text-lg mb-2">No matching heritage sites found.</p>
            <button
              onClick={() => { setFilterGroup('all'); setSearchQuery('') }}
              className="text-gold-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSites.map((site, i) => {
              const group = UNESCO_GROUPS.find(g => g.id === site.unescoGroup)
              const GroupIcon = GROUP_ICONS[site.unescoGroup] || Layers
              return (
                <Link
                  key={site.slug}
                  to={`/heritage/${site.slug}`}
                  className="rise-in group rounded-2xl border border-basalt-700 bg-basalt-900 overflow-hidden hover:border-gold-600/60 transition-all duration-300"
                  style={{ animationDelay: `${0.06 * i}s` }}
                >
                  {/* Image area */}
                  <div className="h-40 bg-basalt-800 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={site.thumbnail}
                      alt={site.name}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute font-display text-2xl text-sand-500/20 text-center px-4 pointer-events-none">
                      {site.name}
                    </span>
                    {site.featured && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gold-500 text-basalt-950 text-[10px] font-mono uppercase tracking-wider font-medium">
                        Featured
                      </span>
                    )}
                    {site.has3DModel && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-basalt-950/60 text-gold-400 text-[10px] font-mono uppercase tracking-wider border border-gold-600/30">
                        3D Experience
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-basalt-950/60 backdrop-blur-sm">
                      <GroupIcon size={10} className="text-gold-500" />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-sand-300">
                        {group?.shortName}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={12} className="text-gold-500" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-sand-500">
                        {site.district} · {site.dynasty}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-sand-100 mb-1 group-hover:text-gold-400 transition-colors">
                      {site.name}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-gold-500/70 mb-3">
                      {site.period}
                    </p>
                    <p className="text-sand-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {site.shortDescription}
                    </p>
                    <div className="flex items-center gap-1 text-gold-500 text-xs font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
