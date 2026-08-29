import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ScanLine,
  Sparkles,
  MapPin,
  Archive,
  Clock,
  Compass,
  Map,
  Bot,
  Layers,
  Globe,
  Train,
} from 'lucide-react'
import Navbar from '../components/ui/Navbar'
import TempleSilhouette from '../components/ui/TempleSilhouette'
import { HERITAGE_SITES, UNESCO_GROUPS, getSitesByGroup } from '../data/heritageSites'
import { useTheme } from '../hooks/useTheme'

/* ── Stats — updated for the multi-site platform ──────────────────────── */
const STATS = [
  { value: '7', label: 'Heritage Locations' },
  { value: '3', label: 'UNESCO Properties' },
  { value: '1,300+', label: 'Years of History' },
  { value: '2024', label: 'Digital Preservation Era' },
]

/* ── Platform Features ────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Map,
    title: 'Interactive Heritage Map',
    description:
      'Explore all Tamil Nadu UNESCO heritage locations on an interactive map — discover geographical connections across centuries of history.',
  },
  {
    icon: Bot,
    title: 'AI Heritage Guide',
    description:
      'Ask questions and receive answers grounded in curated, source-cited knowledge. Context-aware for each heritage site.',
  },
  {
    icon: Clock,
    title: 'Historical Timelines',
    description:
      'Journey through time with interactive timelines that trace each monument from construction through centuries to present day.',
  },
  {
    icon: Archive,
    title: 'Digital Preservation Archive',
    description:
      'Every site becomes a structured digital record — architecture, history, and cultural significance preserved for future generations.',
  },
  {
    icon: ScanLine,
    title: 'Virtual Exploration',
    description:
      'Explore heritage sites through immersive 3D experiences with navigable models, hotspots, and detailed architectural information.',
  },
  {
    icon: Compass,
    title: 'Travel Planning',
    description:
      'Plan your real-world heritage visit with practical travel info, suggested routes, and nearby heritage connections.',
  },
]

/* ── UNESCO Group Icons ───────────────────────────────────────────────── */
const GROUP_ICONS = {
  'mahabalipuram': Layers,
  'chola-temples': Globe,
  'mountain-railways': Train,
}

export default function Landing() {
  const { isDark } = useTheme()
  const bgOverlayStart = isDark ? 'rgba(20, 17, 13, 0.93)' : 'rgba(254, 252, 248, 0.93)'
  const bgOverlayEnd = isDark ? 'rgba(20, 17, 13, 0.99)' : 'rgba(254, 252, 248, 0.99)'

  const pageBgStyle = {
    backgroundImage: `radial-gradient(circle at top, ${bgOverlayStart} 0%, ${bgOverlayEnd} 100%), url('/images/general-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
  }

  return (
    <div className="min-h-screen bg-basalt-950 transition-colors duration-300" style={pageBgStyle}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="rise-in">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-5">
            Digital Gateway to Tamil Nadu's UNESCO World Heritage
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] text-sand-100 mb-6">
            Heritage
            <span className="text-gold-400">Verse</span>
            <br />
            <span className="text-3xl sm:text-4xl text-sand-300">
              Explore Tamil Nadu's Living Heritage
            </span>
          </h1>
          <p className="text-sand-500 text-lg leading-relaxed max-w-md mb-9">
            Seven UNESCO heritage locations. Three World Heritage properties.
            One immersive digital platform — where ancient stone meets modern
            preservation technology.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold-500 text-basalt-950 font-medium hover:bg-gold-400 transition-colors"
            >
              Explore Heritage
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-basalt-700 text-sand-300 hover:border-gold-600 hover:text-gold-400 transition-colors"
            >
              Heritage Map
              <MapPin size={16} />
            </Link>
          </div>
        </div>

        <div className="rise-in relative" style={{ animationDelay: '0.15s' }}>
          <TempleSilhouette className="h-80 lg:h-96" />
          <p className="font-mono text-[11px] text-center text-sand-500 uppercase tracking-widest mt-3">
            Shore Temple — Flagship Heritage Experience
          </p>
        </div>
      </section>

      <div className="carved-rule max-w-6xl mx-auto" />

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <div key={i} className="rise-in" style={{ animationDelay: `${0.05 * i}s` }}>
            <p className="font-display text-3xl sm:text-4xl text-gold-400 mb-1">{stat.value}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-sand-500 leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <div className="carved-rule max-w-6xl mx-auto" />

      {/* ── UNESCO HERITAGE OVERVIEW ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-3">
          UNESCO World Heritage Properties
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-sand-100 mb-12 max-w-xl">
          Three World Heritage properties. Centuries of living heritage.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {UNESCO_GROUPS.map((group, i) => {
            const Icon = GROUP_ICONS[group.id] || Layers
            const sites = getSitesByGroup(group.id)
            return (
              <div
                key={group.id}
                className="rise-in rounded-2xl border border-basalt-700 bg-basalt-900 p-7 hover:border-gold-600/50 transition-colors group"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-basalt-800 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold-500">
                    {group.inscriptionYear}
                  </span>
                </div>
                <h3 className="font-display text-xl text-sand-100 mb-2">{group.shortName}</h3>
                <p className="text-sand-500 text-sm leading-relaxed mb-4">
                  {group.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sites.map((site) => (
                    <Link
                      key={site.slug}
                      to={`/heritage/${site.slug}`}
                      className="text-xs font-mono px-3 py-1.5 rounded-full bg-basalt-800 text-sand-300 hover:bg-gold-500/10 hover:text-gold-400 transition-colors"
                    >
                      {site.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="carved-rule max-w-6xl mx-auto" />

      {/* ── FEATURED HERITAGE SITES ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-3">
          Featured Heritage Locations
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-sand-100 mb-12 max-w-xl">
          Seven heritage sites. Explore each one.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HERITAGE_SITES.map((site, i) => (
            <Link
              key={site.slug}
              to={`/heritage/${site.slug}`}
              className="rise-in group rounded-2xl border border-basalt-700 bg-basalt-900 p-6 hover:border-gold-600/60 hover:bg-basalt-900/80 transition-all duration-300"
              style={{ animationDelay: `${0.06 * i}s` }}
            >
              {/* Site image with fallback */}
              <div className="h-36 rounded-xl bg-basalt-800 mb-5 flex items-center justify-center overflow-hidden relative">
                <img
                  src={site.thumbnail}
                  alt={site.name}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute font-display text-2xl text-sand-500/30 text-center px-4 pointer-events-none">{site.name}</span>
                {site.featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gold-500 text-basalt-950 text-[10px] font-mono uppercase tracking-wider font-medium">
                    Featured
                  </span>
                )}
                {site.has3DModel && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-basalt-950/60 text-gold-400 text-[10px] font-mono uppercase tracking-wider border border-gold-600/30">
                    3D
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={12} className="text-gold-500" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-500">
                  {site.district}
                </span>
              </div>
              <h3 className="font-display text-lg text-sand-100 mb-1 group-hover:text-gold-400 transition-colors">
                {site.name}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-sand-500 mb-3">
                {site.period}
              </p>
              <p className="text-sand-500 text-sm leading-relaxed line-clamp-3">
                {site.shortDescription}
              </p>
              <div className="mt-4 flex items-center gap-1 text-gold-500 text-xs font-medium group-hover:gap-2 transition-all">
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="carved-rule max-w-6xl mx-auto" />

      {/* ── PLATFORM FEATURES ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-3">
          Platform Capabilities
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-sand-100 mb-12 max-w-xl">
          Discover. Learn. Experience. Preserve.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-basalt-800 border border-basalt-800 rounded-2xl overflow-hidden">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="bg-basalt-950 p-8 hover:bg-basalt-900 transition-colors">
                <Icon size={22} className="text-gold-500 mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-sand-100 mb-2">{feature.title}</h3>
                <p className="text-sand-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="carved-rule max-w-6xl mx-auto" />

      {/* ── IMPACT / VISION ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500 mb-3">
            Our Vision
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-sand-100 mb-4">
            Where Technology Meets Heritage
          </h2>
          <p className="text-sand-500 max-w-2xl mx-auto">
            HeritageVerse is not just a tourism platform — it is a digital heritage 
            preservation initiative, an educational resource, and an immersive 
            cultural experience.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Digital Preservation',
              description: 'Creating lasting digital records of heritage sites threatened by time, weather, and erosion.',
              icon: Archive,
            },
            {
              title: 'Education',
              description: 'Making Tamil Nadu\'s rich heritage accessible to students, researchers, and curious minds worldwide.',
              icon: Sparkles,
            },
            {
              title: 'Immersive Tourism',
              description: 'Bridging the gap between digital exploration and real-world heritage visits.',
              icon: Globe,
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div key={i} className="rise-in text-center" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-basalt-800 border border-basalt-700 flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-gold-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-sand-100 mb-2">{pillar.title}</h3>
                <p className="text-sand-500 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-basalt-700 bg-gradient-to-br from-basalt-900 to-basalt-950 p-10 sm:p-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-sand-100 mb-4">
            Explore History. Experience Culture.
            <br />
            <span className="text-gold-400">Preserve Tomorrow.</span>
          </h2>
          <p className="text-sand-500 max-w-lg mx-auto mb-8">
            Seven heritage locations. Three UNESCO World Heritage properties.
            One immersive digital platform for Tamil Nadu's living heritage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-500 text-basalt-950 font-medium hover:bg-gold-400 transition-colors"
            >
              Start Exploring
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-basalt-700 text-sand-300 hover:border-gold-600 hover:text-gold-400 transition-colors"
            >
              View Heritage Map
              <MapPin size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-basalt-800">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[11px] text-sand-500 uppercase tracking-widest">
          <span>HeritageVerse · Digital Heritage Preservation</span>
          <span>Tamil Nadu UNESCO World Heritage</span>
        </div>
      </footer>
    </div>
  )
}
