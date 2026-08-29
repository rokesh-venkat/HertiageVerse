# HeritageVerse — Prototype

Digital Heritage Preservation & Tourism Platform (SW-04) — Shore Temple, Mahabalipuram prototype.

## Structure
- `client/` — React + Vite + Tailwind v4 frontend (3D viewer, map, AI chat UI, timeline)
- `server/` — Express backend (AI Heritage Guide RAG endpoint)

## Setup

### Frontend
```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

### Backend
```bash
cd server
cp .env.example .env   # then add your GEMINI_API_KEY
npm install
npm run dev             # http://localhost:3001
```

## Build Phases
1. **Foundation & Scaffolding** ✅ — project structure, data schemas, routing/state skeleton, Express API skeleton
2. Landing Page + Heritage Map
3. 3D Heritage Viewer + Hotspots
4. AI Heritage Guide (RAG, streaming)
5. Historical Timeline
6. Plan Your Visit + Polish
7. Integration, Testing & Demo Prep

See `HeritageVerse_PRD.md` for full requirements and architecture.
