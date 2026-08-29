/**
 * HeritageVerse — Tamil Nadu UNESCO World Heritage Sites
 *
 * Scalable data architecture. Each site belongs to a UNESCO "group" (property).
 * To add a new site, append an entry to HERITAGE_SITES and (if needed) a new
 * group to UNESCO_GROUPS.
 *
 * IMPORTANT: Do NOT import the old sites.json directly in UI components.
 * Use the helper functions exported at the bottom of this file instead.
 */

// ─── UNESCO World Heritage Properties (Groups) ─────────────────────────────

export const UNESCO_GROUPS = [
  {
    id: 'mahabalipuram',
    name: 'Group of Monuments at Mahabalipuram',
    shortName: 'Mahabalipuram',
    inscriptionYear: 1984,
    description:
      'An outstanding example of Pallava art — rock-cut temples, monolithic rathas, bas-reliefs, and structural temples built between the 7th and 8th centuries CE along the Coromandel Coast.',
    icon: '🏛️',
  },
  {
    id: 'chola-temples',
    name: 'Great Living Chola Temples',
    shortName: 'Chola Temples',
    inscriptionYear: 1987,
    description:
      'Three magnificent temples built by the Chola dynasty between the 10th and 12th centuries — outstanding examples of Dravidian temple architecture and the artistic achievements of the Chola Empire.',
    icon: '🛕',
  },
  {
    id: 'mountain-railways',
    name: 'Mountain Railways of India',
    shortName: 'Nilgiri Railway',
    inscriptionYear: 2005,
    description:
      'The Nilgiri Mountain Railway is an outstanding example of colonial-era engineering, traversing the Western Ghats with rack-and-pinion technology through breathtaking scenery.',
    icon: '🚂',
  },
]

// ─── Heritage Sites ─────────────────────────────────────────────────────────

export const HERITAGE_SITES = [
  // ── Group of Monuments at Mahabalipuram ──────────────────────────────────
  {
    id: 'shore-temple',
    slug: 'shore-temple',
    name: 'Shore Temple',
    unescoGroup: 'mahabalipuram',
    location: 'Mahabalipuram, Chengalpattu District',
    district: 'Chengalpattu',
    state: 'Tamil Nadu',
    lat: 12.6169,
    lng: 80.1993,
    period: '8th century CE (c. 700–728 CE)',
    dynasty: 'Pallava',
    builder: 'Narasimhavarman II (Rajasimha)',
    thumbnail: '/images/sites/shore-temple-thumb.jpg',
    heroImage: '/images/sites/shore-temple-hero.jpg',
    gallery: [
      '/images/sites/shore-temple/image1.jpg',
      '/images/sites/shore-temple/image2.jpg',
    ],
    shortDescription:
      'One of the oldest structural stone temples in South India, built by the Pallava dynasty on the Bay of Bengal shoreline — a UNESCO World Heritage landmark.',
    overview:
      'The Shore Temple is among the oldest structural stone temples in South India, built directly on the shoreline of the Bay of Bengal. Unlike the earlier rock-cut monuments at Mahabalipuram, it was constructed using dressed stone blocks rather than carved from a single rock, marking a transition point in Pallava temple architecture. The complex houses two main shrines dedicated to Shiva and one to Vishnu, and has withstood over 1,300 years of coastal erosion and monsoon exposure.',
    architecture:
      'Early Dravidian structural stone temple architecture featuring a stepped pyramidal vimana (tower) over the main Shiva shrine. The temple complex includes three shrines — two dedicated to Shiva and one to Vishnu — with a surrounding courtyard wall lined with Nandi bull sculptures.',
    culturalSignificance:
      'Marks the pivotal transition in Pallava architecture from rock-cut monuments to free-standing structural temples. The vimana form became a template referenced in later, larger Chola and Pandya temple towers across Tamil Nadu.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 1984)',
    keyStats: [
      { label: 'Built', value: 'c. 700–728 CE' },
      { label: 'Dynasty', value: 'Pallava' },
      { label: 'UNESCO Listed', value: '1984' },
      { label: 'Shrines', value: '3 (2 Shiva, 1 Vishnu)' },
    ],
    timeline: [
      { year: '630–668 CE', title: 'Pallava Rock-Cut Era Begins', description: 'Narasimhavarman I initiates the rock-cut monument tradition at Mahabalipuram.', type: 'context' },
      { year: 'c. 700–728 CE', title: 'Shore Temple Constructed', description: 'Narasimhavarman II commissions the Shore Temple from dressed granite blocks.', type: 'construction' },
      { year: '8th–9th century', title: 'Pallava Decline', description: 'Pallava power wanes under Chola pressure; temple continues in active worship.', type: 'historical' },
      { year: '1984', title: 'UNESCO World Heritage Listing', description: 'Inscribed as part of the Group of Monuments at Mahabalipuram.', type: 'recognition' },
      { year: '2004', title: 'Indian Ocean Tsunami', description: 'Tsunami temporarily exposes submerged structures off the coast near the temple.', type: 'historical' },
      { year: 'Present', title: 'Ongoing Conservation', description: 'ASI conservation addresses coastal erosion; digital preservation initiatives document the site.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Chennai (60 km)',
      nearestAirport: 'Chennai International Airport',
      bestTime: 'October to March',
      entryFee: '₹40 (Indian), ₹600 (Foreign)',
      timings: '6:00 AM – 6:00 PM',
      tips: [
        'Visit early morning for the best light and fewer crowds.',
        'The temple faces east — sunrise visits are spectacular.',
        'Combine with Pancha Rathas and Arjuna\'s Penance for a full Mahabalipuram heritage day.',
      ],
    },
    has3DModel: true,
    modelPath: '/models/shore-temple.glb',
    featured: true,
  },
  {
    id: 'pancha-rathas',
    slug: 'pancha-rathas',
    name: 'Pancha Rathas',
    unescoGroup: 'mahabalipuram',
    location: 'Mahabalipuram, Chengalpattu District',
    district: 'Chengalpattu',
    state: 'Tamil Nadu',
    lat: 12.6198,
    lng: 80.1927,
    period: '7th century CE',
    dynasty: 'Pallava',
    builder: 'Narasimhavarman I (Mamalla)',
    thumbnail: '/images/sites/pancha-rathas-thumb.jpg',
    heroImage: '/images/sites/pancha-rathas-hero.jpg',
    gallery: [
      '/images/sites/pancha-rathas/image1.jpg',
      '/images/sites/pancha-rathas/image2.jpg',
      '/images/sites/pancha-rathas/image3.jpg',
    ],
    shortDescription:
      'Five monolithic rock-cut temples, each carved from a single granite boulder, named after the Pandava brothers and Draupadi from the Mahabharata.',
    overview:
      'The Pancha Rathas (Five Chariots) are a group of five monolithic Indian rock-cut architecture dating from the late 7th century. Each ratha is carved from a single large granite boulder and named after the five Pandava brothers and their common wife Draupadi from the Mahabharata. They represent five distinct styles of temple architecture and were never completed or consecrated for worship.',
    architecture:
      'Five distinct monolithic temple styles: Draupadi Ratha (simplest, single-cell shrine), Arjuna Ratha (two-storey), Bhima Ratha (barrel-vaulted), Dharmaraja Ratha (three-storey pyramidal), and Nakula-Sahadeva Ratha (apsidal). Each is carved from a single stone.',
    culturalSignificance:
      'These rathas serve as architectural models — like three-dimensional blueprints — demonstrating five distinct styles of South Indian temple architecture. They are considered experimental works that influenced later structural temples.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 1984)',
    keyStats: [
      { label: 'Built', value: '7th century CE' },
      { label: 'Dynasty', value: 'Pallava' },
      { label: 'Type', value: 'Monolithic rock-cut' },
      { label: 'Count', value: '5 rathas' },
    ],
    timeline: [
      { year: '630–668 CE', title: 'Construction Period', description: 'Carved during the reign of Narasimhavarman I (Mamalla).', type: 'construction' },
      { year: '7th century', title: 'Left Incomplete', description: 'The rathas were never fully completed or consecrated for worship.', type: 'historical' },
      { year: '1984', title: 'UNESCO Inscription', description: 'Listed as part of the Group of Monuments at Mahabalipuram.', type: 'recognition' },
      { year: 'Present', title: 'Protected Monument', description: 'Maintained by ASI as a major tourist and heritage site.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Chennai (60 km)',
      nearestAirport: 'Chennai International Airport',
      bestTime: 'October to March',
      entryFee: '₹40 (Indian), ₹600 (Foreign)',
      timings: '6:00 AM – 6:00 PM',
      tips: [
        'Located about 1.5 km from the Shore Temple — walkable or a short auto ride.',
        'Each ratha has unique architectural features worth studying individually.',
        'Best photographed in late afternoon light.',
      ],
    },
    has3DModel: false,
    modelPath: null,
    featured: false,
  },
  {
    id: 'arjunas-penance',
    slug: 'arjunas-penance',
    name: "Arjuna's Penance",
    unescoGroup: 'mahabalipuram',
    location: 'Mahabalipuram, Chengalpattu District',
    district: 'Chengalpattu',
    state: 'Tamil Nadu',
    lat: 12.6209,
    lng: 80.1930,
    period: '7th century CE',
    dynasty: 'Pallava',
    builder: 'Narasimhavarman I (Mamalla)',
    thumbnail: '/images/sites/arjunas-penance-thumb.jpg',
    heroImage: '/images/sites/arjunas-penance-hero.jpg',
    gallery: [
      '/images/sites/arjunas-penance/image1.jpg',
      '/images/sites/arjunas-penance/image2.jpg',
    ],
    shortDescription:
      'One of the largest open-air rock reliefs in the world — a monumental Pallava-era narrative carved into two massive granite boulders.',
    overview:
      'Arjuna\'s Penance (also called "Descent of the Ganges") is one of the largest open-air rock reliefs in the world, measuring approximately 27 meters long and 9 meters high. Carved into the face of two enormous granite boulders, the relief depicts over 100 figures of gods, celestial beings, humans, and animals in an intricate narrative scene.',
    architecture:
      'Monumental open-air bas-relief carved across two massive granite boulders. Features over 100 sculpted figures including elephants, gods, celestial beings, ascetics, and animals in a continuous narrative composition.',
    culturalSignificance:
      'The relief represents the pinnacle of Pallava sculptural art. Its subject is debated — either Arjuna\'s penance to obtain a divine weapon from Shiva, or the descent of the Ganges river to Earth. Either interpretation reflects deep connections to Hindu mythology.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 1984)',
    keyStats: [
      { label: 'Built', value: '7th century CE' },
      { label: 'Size', value: '27m × 9m' },
      { label: 'Type', value: 'Open-air bas-relief' },
      { label: 'Figures', value: '100+' },
    ],
    timeline: [
      { year: '630–668 CE', title: 'Carved During Mamalla\'s Reign', description: 'Created as part of the extensive Pallava sculptural program at Mahabalipuram.', type: 'construction' },
      { year: '7th century', title: 'Artistic Zenith', description: 'Represents the highest achievement of Pallava monumental sculpture.', type: 'historical' },
      { year: '1984', title: 'UNESCO Inscription', description: 'Included in the Group of Monuments at Mahabalipuram.', type: 'recognition' },
      { year: 'Present', title: 'Major Tourist Attraction', description: 'One of the most visited and photographed monuments in South India.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Chennai (60 km)',
      nearestAirport: 'Chennai International Airport',
      bestTime: 'October to March',
      entryFee: 'Free (open-air site)',
      timings: 'Dawn to dusk',
      tips: [
        'Best viewed in morning light when the carved details are most visible.',
        'Look for the natural cleft between the boulders — it may have had water flowing through it.',
        'Combine with Krishna\'s Butter Ball, which is just above.',
      ],
    },
    has3DModel: false,
    modelPath: null,
    featured: false,
  },

  // ── Great Living Chola Temples ────────────────────────────────────────────
  {
    id: 'brihadeeswarar-thanjavur',
    slug: 'brihadeeswarar-thanjavur',
    name: 'Brihadeeswarar Temple',
    unescoGroup: 'chola-temples',
    location: 'Thanjavur, Thanjavur District',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    lat: 10.7828,
    lng: 79.1318,
    period: '11th century CE (c. 1003–1010 CE)',
    dynasty: 'Chola',
    builder: 'Rajaraja Chola I',
    thumbnail: '/images/sites/brihadeeswarar-thanjavur-thumb.jpg',
    heroImage: '/images/sites/brihadeeswarar-thanjavur-hero.jpg',
    gallery: [
      '/images/sites/brihadeeswarar-thanjavur/image1.jpg',
      '/images/sites/brihadeeswarar-thanjavur/image2.jpg',
      '/images/sites/brihadeeswarar-thanjavur/image3.jpg',
      '/images/sites/brihadeeswarar-thanjavur/image4.jpg',
    ],
    shortDescription:
      'The crowning achievement of Chola architecture — a 1000-year-old granite temple with the tallest vimana tower of its era, built by the legendary Rajaraja Chola I.',
    overview:
      'The Brihadeeswarar Temple (also called Rajarajeswaram or Peruvudaiyar Kovil) in Thanjavur is the crowning glory of Chola temple architecture. Completed in 1010 CE by Rajaraja Chola I, the temple features a 66-meter-tall vimana (tower) — the tallest of its kind when built — topped by a monolithic capstone weighing approximately 80 tonnes. The entire structure is built from granite without the use of any binding mortar.',
    architecture:
      'Dravidian temple architecture at its grandest scale. The 66m vimana is topped by an 80-tonne monolithic capstone (kumbam). The temple complex includes a massive Nandi mandapa, a 216-foot-long prakara (enclosure), and extensive Chola-period frescoes on the inner walls.',
    culturalSignificance:
      'A testament to the political, cultural, and architectural achievements of the Chola Empire. The temple contains some of the finest Chola bronzes and frescoes. It is still an active place of worship, making it a "living" heritage site.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 1987, extended 2004)',
    keyStats: [
      { label: 'Built', value: '1003–1010 CE' },
      { label: 'Dynasty', value: 'Chola' },
      { label: 'Vimana Height', value: '66 meters' },
      { label: 'Capstone Weight', value: '~80 tonnes' },
    ],
    timeline: [
      { year: '985 CE', title: 'Rajaraja Chola I Ascends', description: 'Rajaraja Chola I takes the throne, beginning an era of expansion and monumental building.', type: 'context' },
      { year: '1003–1010 CE', title: 'Temple Constructed', description: 'The Brihadeeswarar Temple is built over seven years as Rajaraja\'s defining architectural achievement.', type: 'construction' },
      { year: '11th–13th century', title: 'Chola Golden Age', description: 'The temple serves as the spiritual and administrative heart of the Chola Empire.', type: 'historical' },
      { year: '1987', title: 'UNESCO Inscription', description: 'Listed as a UNESCO World Heritage Site as part of the Great Living Chola Temples.', type: 'recognition' },
      { year: 'Present', title: 'Active Living Temple', description: 'Continues as an active Shiva temple with daily worship and annual festivals.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Thanjavur (city center)',
      nearestAirport: 'Tiruchirappalli Airport (55 km)',
      bestTime: 'October to March',
      entryFee: 'Free',
      timings: '6:00 AM – 8:30 PM',
      tips: [
        'The temple\'s shadow never falls on the ground at noon — an architectural marvel.',
        'Visit during the annual Maha Shivaratri festival for a spectacular experience.',
        'The Thanjavur Royal Palace and Art Gallery are nearby.',
      ],
    },
    has3DModel: false,
    modelPath: null,
    featured: true,
  },
  {
    id: 'gangaikonda-cholapuram',
    slug: 'gangaikonda-cholapuram',
    name: 'Gangaikonda Cholapuram Temple',
    unescoGroup: 'chola-temples',
    location: 'Gangaikonda Cholapuram, Ariyalur District',
    district: 'Ariyalur',
    state: 'Tamil Nadu',
    lat: 11.2062,
    lng: 79.4526,
    period: '11th century CE (c. 1035 CE)',
    dynasty: 'Chola',
    builder: 'Rajendra Chola I',
    thumbnail: '/images/sites/gangaikonda-cholapuram-thumb.jpg',
    heroImage: '/images/sites/gangaikonda-cholapuram-hero.jpg',
    gallery: [
      '/images/sites/gangaikonda-cholapuram/image1.jpg',
      '/images/sites/gangaikonda-cholapuram/image2.jpg',
      '/images/sites/gangaikonda-cholapuram/image3.jpg',
    ],
    shortDescription:
      'Built by Rajendra Chola I to commemorate his northern conquests — a refined evolution of the Thanjavur Brihadeeswarar Temple with exquisite sculptural detail.',
    overview:
      'The Gangaikonda Cholapuram Temple was built by Rajendra Chola I around 1035 CE to celebrate his military conquest of the Gangetic plains, from which the city takes its name ("The City of the Chola Who Conquered the Ganges"). The temple\'s 55-meter vimana is slightly shorter than its Thanjavur predecessor but features more refined sculptural ornamentation and a distinctive concave curve in the tower profile.',
    architecture:
      'An evolution of the Thanjavur Brihadeeswarar design with a 55m vimana featuring a distinctive concave-curving profile. Contains some of the finest Chola bronzes and stone sculptures, including a famous Saraswati and Nataraja.',
    culturalSignificance:
      'Represents the cultural confidence of the Chola Empire at the height of its power. The temple\'s refined proportions and sculptures are considered by some art historians to surpass even the Thanjavur original.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 2004 as extension)',
    keyStats: [
      { label: 'Built', value: 'c. 1035 CE' },
      { label: 'Dynasty', value: 'Chola' },
      { label: 'Vimana Height', value: '55 meters' },
      { label: 'Builder', value: 'Rajendra Chola I' },
    ],
    timeline: [
      { year: '1014 CE', title: 'Rajendra Chola I Ascends', description: 'Succeeds his father Rajaraja Chola I, inheriting and expanding the Chola Empire.', type: 'context' },
      { year: 'c. 1025 CE', title: 'Northern Conquest', description: 'Rajendra\'s armies reach the Ganges, inspiring the city\'s name.', type: 'historical' },
      { year: 'c. 1035 CE', title: 'Temple Constructed', description: 'The temple is built as the centerpiece of the new Chola capital.', type: 'construction' },
      { year: '2004', title: 'UNESCO Inscription', description: 'Added to the Great Living Chola Temples World Heritage Site.', type: 'recognition' },
      { year: 'Present', title: 'Protected Monument', description: 'Maintained by ASI with ongoing conservation efforts.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Kumbakonam (35 km)',
      nearestAirport: 'Tiruchirappalli Airport (90 km)',
      bestTime: 'October to March',
      entryFee: 'Free',
      timings: '6:00 AM – 6:00 PM',
      tips: [
        'Less crowded than Thanjavur — ideal for quiet exploration.',
        'The lion-base well in the courtyard is a unique feature.',
        'Combine with a visit to Darasuram (30 km away).',
      ],
    },
    has3DModel: false,
    modelPath: null,
    featured: false,
  },
  {
    id: 'airavatesvara-darasuram',
    slug: 'airavatesvara-darasuram',
    name: 'Airavatesvara Temple',
    unescoGroup: 'chola-temples',
    location: 'Darasuram, Thanjavur District',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    lat: 10.9489,
    lng: 79.3530,
    period: '12th century CE (c. 1146–1173 CE)',
    dynasty: 'Chola',
    builder: 'Rajaraja Chola II',
    thumbnail: '/images/sites/airavatesvara-darasuram-thumb.jpg',
    heroImage: '/images/sites/airavatesvara-darasuram-hero.jpg',
    gallery: [
      '/images/sites/airavatesvara-darasuram/image1.jpg',
      '/images/sites/airavatesvara-darasuram/image2.jpg',
      '/images/sites/airavatesvara-darasuram/image3.jpg',
      '/images/sites/airavatesvara-darasuram/image4.jpg',
    ],
    shortDescription:
      'A jewel-like Chola temple renowned for its intricate stone carvings and the famous stone chariot — smaller in scale but exquisite in detail.',
    overview:
      'The Airavatesvara Temple at Darasuram was built by Rajaraja Chola II in the 12th century CE. Though smaller than its Thanjavur and Gangaikonda predecessors, it is celebrated for its exceptionally intricate stone carvings and the famous chariot-shaped mandapa drawn by horses and elephants. The temple\'s name derives from Airavata, the white elephant of Indra.',
    architecture:
      'A compact but intricately detailed Dravidian temple with a 24-meter vimana. The mandapa is designed as a stone chariot drawn by horses. Contains some of the finest narrative sculptural panels in Chola art, depicting scenes from mythology and daily life.',
    culturalSignificance:
      'Represents the later Chola period when architectural ambition shifted from monumental scale to extraordinary sculptural refinement. The narrative panels are considered among the finest examples of medieval Indian stone carving.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 2004 as extension)',
    keyStats: [
      { label: 'Built', value: '12th century CE' },
      { label: 'Dynasty', value: 'Chola' },
      { label: 'Vimana Height', value: '24 meters' },
      { label: 'Famous Feature', value: 'Stone chariot' },
    ],
    timeline: [
      { year: '1146–1173 CE', title: 'Temple Constructed', description: 'Built by Rajaraja Chola II as a Shiva temple with exceptionally detailed carvings.', type: 'construction' },
      { year: '12th–13th century', title: 'Late Chola Period', description: 'Temple reflects the shift toward refined sculptural detail in later Chola architecture.', type: 'historical' },
      { year: '2004', title: 'UNESCO Inscription', description: 'Added to the Great Living Chola Temples World Heritage Site.', type: 'recognition' },
      { year: 'Present', title: 'Protected Monument', description: 'ASI-maintained with significant restoration of the chariot mandapa.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Kumbakonam (5 km)',
      nearestAirport: 'Tiruchirappalli Airport (40 km)',
      bestTime: 'October to March',
      entryFee: 'Free',
      timings: '6:00 AM – 6:00 PM',
      tips: [
        'Don\'t miss the stone chariot mandapa — the temple\'s most iconic feature.',
        'The musical steps that produce different notes when tapped are fascinating.',
        'Very close to Kumbakonam — combine with visiting the town\'s famous temples.',
      ],
    },
    has3DModel: false,
    modelPath: null,
    featured: false,
  },

  // ── Mountain Railways of India ────────────────────────────────────────────
  {
    id: 'nilgiri-mountain-railway',
    slug: 'nilgiri-mountain-railway',
    name: 'Nilgiri Mountain Railway',
    unescoGroup: 'mountain-railways',
    location: 'Mettupalayam to Ooty, Nilgiris District',
    district: 'Nilgiris',
    state: 'Tamil Nadu',
    lat: 11.4102,
    lng: 76.6950,
    period: '1899–1908 (Construction)',
    dynasty: 'British Colonial Era',
    builder: 'Nilgiri Railway Company / British India',
    thumbnail: '/images/sites/nilgiri-mountain-railway-thumb.jpg',
    heroImage: '/images/sites/nilgiri-mountain-railway-hero.jpg',
    gallery: [
      '/images/sites/nilgiri-mountain-railway/image1.jpg',
      '/images/sites/nilgiri-mountain-railway/image2.jpg',
      '/images/sites/nilgiri-mountain-railway/image3.jpg',
      '/images/sites/nilgiri-mountain-railway/image4.jpg',
    ],
    shortDescription:
      'A UNESCO-listed heritage railway traversing the Western Ghats using unique rack-and-pinion technology — a living piece of colonial-era engineering still in daily operation.',
    overview:
      'The Nilgiri Mountain Railway is a metre-gauge railway in Tamil Nadu that travels from Mettupalayam to Udagamandalam (Ooty) through the Nilgiri Hills of the Western Ghats. Built between 1899 and 1908, it uses a unique rack-and-pinion system to climb steep gradients up to 1 in 12. The railway rises from 326 meters to 2,203 meters above sea level over its 46-kilometer route, passing through 16 tunnels and over 250 bridges.',
    architecture:
      'A marvel of colonial railway engineering featuring rack-and-pinion (Abt system) technology, 16 tunnels, 250+ bridges, and steam/diesel locomotives. The route climbs nearly 2,000 meters through diverse ecosystems of the Western Ghats.',
    culturalSignificance:
      'Represents outstanding 19th-century engineering ingenuity in a challenging mountain terrain. The railway has been continuously operational for over a century and remains a vital transport link for the Nilgiri communities while serving as a living museum of heritage rail technology.',
    unescoStatus: 'UNESCO World Heritage Site (inscribed 2005, extension of Mountain Railways of India)',
    keyStats: [
      { label: 'Built', value: '1899–1908' },
      { label: 'Route Length', value: '46 km' },
      { label: 'Altitude Gain', value: '1,877 m' },
      { label: 'Tunnels', value: '16' },
    ],
    timeline: [
      { year: '1854', title: 'First Proposal', description: 'Initial proposals for a hill railway to the Nilgiris are discussed.', type: 'context' },
      { year: '1891', title: 'Construction Begins', description: 'Work starts on the rack-and-pinion railway route.', type: 'construction' },
      { year: '1899', title: 'First Section Opens', description: 'Mettupalayam to Coonoor section opens to traffic.', type: 'construction' },
      { year: '1908', title: 'Full Line Completed', description: 'The complete route to Udagamandalam (Ooty) opens.', type: 'construction' },
      { year: '2005', title: 'UNESCO Inscription', description: 'Added to the Mountain Railways of India World Heritage Site.', type: 'recognition' },
      { year: 'Present', title: 'Living Heritage Railway', description: 'Still operational with heritage steam locomotives alongside diesel services.', type: 'preservation' },
    ],
    travelInfo: {
      nearestCity: 'Coimbatore (40 km from Mettupalayam)',
      nearestAirport: 'Coimbatore International Airport',
      bestTime: 'April to June, September to November',
      entryFee: 'Train ticket: ₹30–₹505 depending on class',
      timings: 'First train: 7:10 AM from Mettupalayam',
      tips: [
        'Book train tickets well in advance — they sell out quickly.',
        'The Mettupalayam to Coonoor section with steam locomotives is the most scenic.',
        'Sit on the right side for the best views of the valley.',
        'Carry warm clothing — temperature drops significantly as you ascend.',
      ],
    },
    has3DModel: false,
    modelPath: null,
    featured: true,
  },
]

// ─── Helper Functions ────────────────────────────────────────────────────────

/** Get all heritage sites */
export function getAllSites() {
  return HERITAGE_SITES
}

/** Get a single site by slug */
export function getSiteBySlug(slug) {
  return HERITAGE_SITES.find((s) => s.slug === slug) ?? null
}

/** Get a single site by id */
export function getSiteById(id) {
  return HERITAGE_SITES.find((s) => s.id === id) ?? null
}

/** Get all sites belonging to a UNESCO group */
export function getSitesByGroup(groupId) {
  return HERITAGE_SITES.filter((s) => s.unescoGroup === groupId)
}

/** Get a UNESCO group by id */
export function getGroupById(groupId) {
  return UNESCO_GROUPS.find((g) => g.id === groupId) ?? null
}

/** Get featured sites */
export function getFeaturedSites() {
  return HERITAGE_SITES.filter((s) => s.featured)
}

/** Get all sites as the old sites.json format (for backward compat with HeritageMapView) */
export function getSitesForMap() {
  return HERITAGE_SITES.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    lat: s.lat,
    lng: s.lng,
    period: s.period,
    shortDescription: s.shortDescription,
    featured: s.featured,
    unescoGroup: s.unescoGroup,
    district: s.district,
    has3DModel: s.has3DModel,
    thumbnail: s.thumbnail,
    heroImage: s.heroImage,
    gallery: s.gallery,
  }))
}
