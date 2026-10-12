import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Landing = lazy(() => import('./pages/Landing'))
const Explore = lazy(() => import('./pages/Explore'))
const HeritageMap = lazy(() => import('./pages/HeritageMap'))
const SiteExperience = lazy(() => import('./pages/SiteExperience'))
const PlanVisit = lazy(() => import('./pages/PlanVisit'))

function PageLoading() {
  return (
    <div className="min-h-screen bg-basalt-950 flex items-center justify-center text-sand-500">
      Loading HeritageVerse...
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<HeritageMap />} />
        <Route path="/heritage/:slug" element={<SiteExperience />} />
        <Route path="/site/:siteId" element={<SiteExperience />} />
        <Route path="/site/:siteId/visit" element={<PlanVisit />} />
      </Routes>
    </Suspense>
  )
}
