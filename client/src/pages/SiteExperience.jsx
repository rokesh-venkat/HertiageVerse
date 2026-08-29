import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHeritageStore } from '../store/heritageStore'
import { getSiteBySlug, getGroupById } from '../data/heritageSites'
import Navbar from '../components/ui/Navbar'
import HeritageViewer from '../components/3d/HeritageViewer'
import TimelineView from '../components/timeline/TimelineView'
import AIChatPanel from '../components/ai/AIChatPanel'
import { useTheme } from '../hooks/useTheme'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  Info,
  Clock,
  Bot,
  Compass,
  ScanLine,
  Archive,
  Image as ImageIcon,
  X,
  Maximize2,
} from 'lucide-react'

const TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: '3d', label: '3D Experience', icon: ScanLine },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'ai', label: 'AI Guide', icon: Bot },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'archive', label: 'Archive', icon: Archive },
  { id: 'visit', label: 'Plan Visit', icon: Compass },
]

export default function SiteExperience() {
  const { slug } = useParams()
  const { activeTab, setActiveTab } = useHeritageStore()
  const { isDark } = useTheme()
  const [selectedImage, setSelectedImage] = useState(null)

  const site = getSiteBySlug(slug)

  if (!site) {
    return (
      <div className="min-h-screen bg-basalt-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <p className="text-sand-500 text-lg mb-4">Heritage site not found.</p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  const group = getGroupById(site.unescoGroup)

  const bgOverlayStart = isDark ? 'rgba(20, 17, 13, 0.88)' : 'rgba(254, 252, 248, 0.88)'
  const bgOverlayEnd = isDark ? 'rgba(20, 17, 13, 0.99)' : 'rgba(254, 252, 248, 0.99)'

  const pageBgStyle = {
    backgroundImage: `radial-gradient(circle at top, ${bgOverlayStart} 0%, ${bgOverlayEnd} 100%), url(${site.heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
  }

  return (
    <div className="min-h-screen bg-basalt-950 transition-colors duration-300" style={pageBgStyle}>
      <Navbar />

      {/* Hero Backdrop Banner */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden border-b border-basalt-800 bg-basalt-900">
        <img
          src={site.heroImage}
          alt={site.name}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-basalt-950 via-basalt-950/40 to-transparent" />
      </div>

      <header className="max-w-6xl mx-auto px-6 pt-8 pb-6 relative z-10 -mt-20">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-sand-200 hover:text-gold-400 text-xs font-mono uppercase tracking-widest mb-4 transition-colors bg-basalt-950/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-basalt-800"
        >
          <ArrowLeft size={12} /> All Heritage Sites
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500">
            {group?.shortName || 'Heritage Site'}
          </span>
          <span className="text-basalt-700">·</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-sand-500">
            {site.unescoStatus}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-sand-100">{site.name}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-sand-500 text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} /> {site.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} /> {site.period}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 size={13} /> {site.dynasty}
          </span>
        </div>
      </header>

      <nav className="max-w-6xl mx-auto px-6 flex gap-1 border-b border-basalt-800 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-gold-500 text-gold-400'
                  : 'border-transparent text-sand-500 hover:text-sand-300'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          )
        })}
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="rise-in space-y-8">
            {/* Key Stats */}
            {site.keyStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {site.keyStats.map((stat, i) => (
                  <div key={i} className="rounded-xl border border-basalt-700 bg-basalt-900 p-4">
                    <p className="font-display text-2xl text-gold-400 mb-1">{stat.value}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-sand-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Overview Text */}
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl text-sand-100 mb-4">About {site.name}</h2>
              <p className="text-sand-300 leading-relaxed mb-6">{site.overview}</p>
            </div>

            {/* Architecture */}
            {site.architecture && (
              <div className="max-w-3xl">
                <h3 className="font-display text-xl text-sand-100 mb-3">Architecture</h3>
                <p className="text-sand-500 leading-relaxed">{site.architecture}</p>
              </div>
            )}

            {/* Cultural Significance */}
            {site.culturalSignificance && (
              <div className="max-w-3xl">
                <h3 className="font-display text-xl text-sand-100 mb-3">Cultural Significance</h3>
                <p className="text-sand-500 leading-relaxed">{site.culturalSignificance}</p>
              </div>
            )}
          </div>
        )}

        {/* 3D Tab */}
        {activeTab === '3d' && (
          <div className="rise-in">
            <div className="h-[560px]">
              <HeritageViewer siteId={site.id} modelPath={site.modelPath} has3DModel={site.has3DModel} />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-sand-500 mt-3">
              {site.has3DModel
                ? 'Drag to rotate, scroll to zoom. Click hotspots for details.'
                : 'Placeholder 3D scene — full model coming soon.'}
            </p>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="rise-in">
            <TimelineView events={site.timeline} siteName={site.name} />
          </div>
        )}

        {/* AI Guide Tab */}
        {activeTab === 'ai' && (
          <div className="rise-in">
            <AIChatPanel site={site} />
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="rise-in space-y-6">
            <div>
              <h2 className="font-display text-2xl text-sand-100 mb-2">Image Gallery</h2>
              <p className="text-sand-500 text-sm">
                Visual records and structural details of {site.name}. Click an image to expand.
              </p>
            </div>

            {site.gallery && site.gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {site.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className="group relative h-48 rounded-xl overflow-hidden border border-basalt-800 bg-basalt-900 focus:outline-none focus:border-gold-500"
                  >
                    <img
                      src={img}
                      alt={`${site.name} Gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-basalt-950/20 group-hover:bg-basalt-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize2 size={20} className="text-gold-400" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sand-500 italic">No gallery images found for this site.</p>
            )}
          </div>
        )}

        {/* Archive Tab */}
        {activeTab === 'archive' && (
          <div className="rise-in space-y-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl text-sand-100 mb-4">
                Digital Preservation Archive
              </h2>
              <p className="text-sand-500 leading-relaxed mb-6">
                The HeritageVerse archive preserves comprehensive digital records of {site.name} —
                ensuring that historical knowledge, architectural details, and cultural context
                survive for future generations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Historical Record', desc: `${site.overview?.slice(0, 120)}...`, icon: Clock },
                { title: 'Architectural Documentation', desc: site.architecture?.slice(0, 120) + '...' || 'Documentation in progress.', icon: Building2 },
                { title: 'Cultural Significance', desc: site.culturalSignificance?.slice(0, 120) + '...' || 'Documentation in progress.', icon: Info },
                { title: 'UNESCO Status', desc: site.unescoStatus || 'UNESCO World Heritage Site', icon: Archive },
                { title: 'Timeline Events', desc: `${site.timeline?.length || 0} documented events across history`, icon: Calendar },
                { title: '3D Digital Model', desc: site.has3DModel ? 'Available — explore in 3D tab.' : 'Model in development.', icon: ScanLine },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="rounded-xl border border-basalt-700 bg-basalt-900 p-5">
                    <Icon size={18} className="text-gold-500 mb-3" strokeWidth={1.5} />
                    <h3 className="font-display text-lg text-sand-100 mb-2">{item.title}</h3>
                    <p className="text-sand-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Plan Visit Tab */}
        {activeTab === 'visit' && (
          <div className="rise-in space-y-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl text-sand-100 mb-4">
                Plan Your Visit to {site.name}
              </h2>
            </div>

            {site.travelInfo ? (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-xl border border-basalt-700 bg-basalt-900 p-6 space-y-4">
                  <h3 className="font-display text-lg text-sand-100">Practical Information</h3>
                  {[
                    { label: 'Location', value: site.location },
                    { label: 'Nearest City', value: site.travelInfo.nearestCity },
                    { label: 'Nearest Airport', value: site.travelInfo.nearestAirport },
                    { label: 'Best Time to Visit', value: site.travelInfo.bestTime },
                    { label: 'Entry Fee', value: site.travelInfo.entryFee },
                    { label: 'Timings', value: site.travelInfo.timings },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-sand-500 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-sm text-sand-300 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-basalt-700 bg-basalt-900 p-6">
                  <h3 className="font-display text-lg text-sand-100 mb-4">Travel Tips</h3>
                  <ul className="space-y-3">
                    {site.travelInfo.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        <span className="text-sm text-sand-500 leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sand-500 italic">
                Travel information for this site is being compiled.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-basalt-950/90 backdrop-blur-md fade-in">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-basalt-900 text-sand-300 hover:text-gold-400 border border-basalt-700 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-basalt-700 shadow-2xl relative">
            <img
              src={selectedImage}
              alt="Expanded view"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
