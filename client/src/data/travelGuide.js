const LAST_VERIFIED = '2026-10-13'

const routePlanning = (description) => ({
  type: 'Route planning',
  description,
  source: 'Google Maps route planning',
  sourceUrl: 'https://www.google.com/maps',
})

export const TRAVEL_GUIDE = {
  'shore-temple': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: '1-2 hours (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('From Chennai, use current road directions via the East Coast route or the fastest available route. Confirm traffic and road conditions before departure.'),
      routePlanning('Taxi, self-drive, and local bus connections are practical options; live schedules are not configured here.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: 'Shore Temple', duration: '1-2 hours (estimate)', note: 'Begin with the coastal structural temple and its enclosure.' },
      { title: 'Pancha Rathas', duration: '1-2 hours (estimate)', note: 'Continue to the monolithic rock-cut experiments.' },
      { title: "Arjuna's Penance", duration: '45-60 minutes (estimate)', note: 'Finish with the open-air relief and nearby Mahabalipuram monuments.' },
    ],
    visitorNotes: [
      'Coastal sun and wind can be strong; carry water, sun protection, and footwear suitable for uneven ground.',
      'Follow monument signage and worship etiquette. Confirm current photography, entry, and closure rules before visiting.',
      'Emergency services in India: 112.',
    ],
  },
  'pancha-rathas': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: '1-2 hours (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('From Chennai or central Mahabalipuram, use current Google Maps directions. Live bus and train schedules are not configured here.'),
      routePlanning('Taxi, self-drive, and local auto connections are practical options; confirm availability locally.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: 'Pancha Rathas', duration: '1-2 hours (estimate)', note: 'Allow time to walk around each monolithic form.' },
      { title: 'Shore Temple', duration: '1-2 hours (estimate)', note: 'Continue to the nearby structural temple.' },
      { title: "Arjuna's Penance", duration: '45-60 minutes (estimate)', note: 'Complete a Mahabalipuram heritage circuit with the open-air relief.' },
    ],
    visitorNotes: [
      'The site includes exposed stone and uneven walking surfaces; wear comfortable footwear and bring water.',
      'Do not climb or touch protected carvings. Confirm current monument rules and photography guidance on arrival.',
      'Emergency services in India: 112.',
    ],
  },
  'arjunas-penance': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: '45-60 minutes (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('From Chennai or Mahabalipuram, use current road directions. Live public-transport schedules are not configured here.'),
      routePlanning('Taxi, self-drive, and local auto connections can be considered; confirm availability locally.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: "Arjuna's Penance", duration: '45-60 minutes (estimate)', note: 'Study the relief from several viewpoints without touching the carved surface.' },
      { title: 'Pancha Rathas', duration: '1-2 hours (estimate)', note: 'Continue to the monolithic Pallava monuments.' },
      { title: 'Shore Temple', duration: '1-2 hours (estimate)', note: 'Finish at the coastal structural temple.' },
    ],
    visitorNotes: [
      'The relief is outdoors, so sun protection and water are useful throughout the day.',
      'Respect barriers and avoid contact with the protected rock surface. Confirm current access rules before visiting.',
      'Emergency services in India: 112.',
    ],
  },
  'brihadeeswarar-thanjavur': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: '2-3 hours (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('From Thanjavur city, use current local directions to the temple. From Chennai, check current road or rail planning before departure.'),
      routePlanning('Taxi, self-drive, and regional bus or train connections may be considered; live schedules are not configured here.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: 'Brihadeeswarar Temple', duration: '2-3 hours (estimate)', note: 'Allow time for the vimana, Nandi, enclosure, and active worship setting.' },
      { title: 'Thanjavur heritage area', duration: '2-3 hours (estimate)', note: 'Add only current, verified local attractions when planning the wider day.' },
    ],
    visitorNotes: [
      'This is a living temple. Follow worship, footwear, dress, photography, and restricted-area instructions on site.',
      'Bring water and sun protection, and allow extra time for walking across the large complex.',
      'Emergency services in India: 112.',
    ],
  },
  'gangaikonda-cholapuram': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: '1-2 hours (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('From Kumbakonam or Chennai, use current Google Maps directions. Live bus and train schedules are not configured here.'),
      routePlanning('Taxi and self-drive are the most straightforward planning categories; confirm local transport availability.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: 'Gangaikonda Cholapuram Temple', duration: '1-2 hours (estimate)', note: 'Explore the curved vimana, sculptures, and protected grounds.' },
      { title: 'Brihadeeswarar Temple, Thanjavur', duration: 'Separate day or long transfer (estimate)', note: 'Treat this as a separate Chola-temple plan because the sites are in different cities.' },
    ],
    visitorNotes: [
      'Expect an exposed monument setting; bring water, sun protection, and suitable walking footwear.',
      'Confirm current access, worship, photography, and conservation instructions at the site.',
      'Emergency services in India: 112.',
    ],
  },
  'airavatesvara-darasuram': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: '1-2 hours (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('From Kumbakonam, use current local directions to Darasuram. From Chennai, verify the current road or rail plan before departure.'),
      routePlanning('Taxi, self-drive, and regional transport may be considered; live schedules are not configured here.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: 'Airavatesvara Temple', duration: '1-2 hours (estimate)', note: 'Focus on the stone chariot mandapa and detailed carvings.' },
      { title: 'Gangaikonda Cholapuram Temple', duration: 'Separate plan (estimate)', note: 'Visit as a separate Chola-temple outing because the sites are not in the same town.' },
    ],
    visitorNotes: [
      'Wear comfortable footwear for stone surfaces and bring water and sun protection.',
      'Do not touch carvings. Confirm current worship, access, photography, and conservation rules on arrival.',
      'Emergency services in India: 112.',
    ],
  },
  'nilgiri-mountain-railway': {
    lastVerified: LAST_VERIFIED,
    recommendedDuration: 'Half day or full day, depending on train plan (estimate)',
    nearestRailwayStation: null,
    nearestBusStand: null,
    transportOptions: [
      routePlanning('Plan around current Indian Railways information for the Mettupalayam-Coonoor-Ooty route; this guide does not publish live schedules.'),
      routePlanning('Taxi, self-drive, and regional bus options require current local confirmation, especially during monsoon or peak periods.'),
    ],
    nearbyStays: [],
    nearbyFood: [],
    itinerary: [
      { title: 'Mettupalayam departure area', duration: '30-60 minutes (estimate)', note: 'Arrive with time for the current ticket and boarding process.' },
      { title: 'Nilgiri Mountain Railway journey', duration: 'Half day or full day (estimate)', note: 'Use the current official railway timetable to plan the journey and return.' },
      { title: 'Ooty heritage area', duration: '1-2 hours (estimate)', note: 'Add only current, verified attractions and transport connections.' },
    ],
    visitorNotes: [
      'Mountain weather can change quickly. Carry water, sun protection, and a warm layer.',
      'Check current train operations and weather notices with Indian Railways before departure.',
      'Emergency services in India: 112.',
    ],
  },
}

export function getTravelGuide(siteSlug) {
  return TRAVEL_GUIDE[siteSlug] ?? null
}
