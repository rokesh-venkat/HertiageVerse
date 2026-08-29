import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import HeritageMap from './pages/HeritageMap'
import SiteExperience from './pages/SiteExperience'
import PlanVisit from './pages/PlanVisit'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/map" element={<HeritageMap />} />
      <Route path="/heritage/:slug" element={<SiteExperience />} />
      <Route path="/site/:siteId" element={<SiteExperience />} />
      <Route path="/site/:siteId/visit" element={<PlanVisit />} />
    </Routes>
  )
}
