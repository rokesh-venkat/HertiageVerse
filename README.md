# HeritageVerse

HeritageVerse is a React and Express digital heritage guide for Tamil Nadu's UNESCO sites. The implemented experience includes:

- Landing page and searchable Explore catalogue
- Heritage map covering seven site pages
- Site timelines, image galleries, archive context, and travel information
- Dark/light theme toggle
- Shore Temple procedural 3D viewer
- AI Heritage Guide with site-specific knowledge-base retrieval and source labels

## Project Structure

- `client/` - React, Vite, Tailwind, MapLibre, and React Three Fiber frontend
- `server/` - Express API and Gemini-backed retrieval-augmented guide

## Setup

### Frontend

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`. `VITE_API_URL` selects the backend origin and defaults to `http://localhost:3001`.

### Backend

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Set `GEMINI_API_KEY` in `server/.env` for Gemini responses. The backend listens on `PORT` (default `3001`).

## API Routes

- `GET /api/health` - service health check
- `POST /api/chat` - AI Guide request with `message`, optional `siteSlug`, `siteName`, `hotspotName`, and `history`
- `GET /api/sites/:siteSlug/nearby?type=hotel` - optional server-side nearby hotel data
- `GET /api/sites/:siteSlug/nearby?type=restaurant` - optional server-side nearby restaurant data

The client generates keyless Google Maps search and directions links from each site's stored coordinates. Nearby hotel and restaurant cards fall back to Google Maps searches when live data is disabled.

### Environment Variables

- `client/.env`: `VITE_API_URL` selects the backend origin.
- `server/.env`: `GEMINI_API_KEY` enables Gemini responses.
- `server/.env`: `GOOGLE_MAPS_ENABLED=false` keeps live nearby-place lookup disabled by default.
- `server/.env`: `GOOGLE_MAPS_API_KEY` is read only by the server when live nearby-place lookup is enabled. Enable Google Places API (New) in Google Cloud for this integration.

## Commands

From `client/`:

```bash
npm run lint
npm run build
npm run dev
```

From `server/`:

```bash
npm start
npm run dev
```

## Incomplete and Out of Scope

- Clickable 3D hotspots are not implemented.
- Full site-specific 3D coverage is not implemented; supplied GLBs are available for Pancha Rathas and Brihadeeswarar, with procedural fallback elsewhere.
- Production deployment configuration, hosting, and production API credentials are not included.
