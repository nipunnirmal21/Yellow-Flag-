/**
 * 2026 F1 Tracks — blank outline-only SVG layouts (no text, corners, or sector labels).
 * Source: julesr0y/f1-circuits-svg minimal/white set (transparent single-line outlines).
 */
export const tracksIntro =
  'Explore all 22 circuits on the 2026 Formula 1 calendar — from Albert Park to Yas Marina.';

const OUTLINE =
  'https://raw.githubusercontent.com/julesr0y/f1-circuits-svg/main/circuits/minimal/white';

export const f1Tracks2026 = [
  { id: 1, name: 'Albert Park', country: 'Australia', layoutUrl: `${OUTLINE}/melbourne-2.svg` },
  { id: 2, name: 'Shanghai International Circuit', country: 'China', layoutUrl: `${OUTLINE}/shanghai-1.svg` },
  { id: 3, name: 'Suzuka Circuit', country: 'Japan', layoutUrl: `${OUTLINE}/suzuka-2.svg` },
  { id: 4, name: 'Miami International Autodrome', country: 'USA', layoutUrl: `${OUTLINE}/miami-1.svg` },
  { id: 5, name: 'Circuit Gilles Villeneuve', country: 'Canada', layoutUrl: `${OUTLINE}/montreal-6.svg` },
  { id: 6, name: 'Monaco Circuit', country: 'Monaco', layoutUrl: `${OUTLINE}/monaco-6.svg` },
  { id: 7, name: 'Circuit de Barcelona-Catalunya', country: 'Spain', layoutUrl: `${OUTLINE}/catalunya-6.svg` },
  { id: 8, name: 'Red Bull Ring', country: 'Austria', layoutUrl: `${OUTLINE}/spielberg-3.svg` },
  { id: 9, name: 'Silverstone Circuit', country: 'Great Britain', layoutUrl: `${OUTLINE}/silverstone-8.svg` },
  { id: 10, name: 'Spa-Francorchamps', country: 'Belgium', layoutUrl: `${OUTLINE}/spa-francorchamps-4.svg` },
  { id: 11, name: 'Hungaroring', country: 'Hungary', layoutUrl: `${OUTLINE}/hungaroring-3.svg` },
  { id: 12, name: 'Circuit Zandvoort', country: 'Netherlands', layoutUrl: `${OUTLINE}/zandvoort-5.svg` },
  { id: 13, name: 'Autodromo Nazionale Monza', country: 'Italy', layoutUrl: `${OUTLINE}/monza-7.svg` },
  {
    id: 14,
    name: 'IFEMA Madrid',
    country: 'Spain',
    layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Madring_(2026).svg',
    invertLayout: true,
  },
  { id: 15, name: 'Baku City Circuit', country: 'Azerbaijan', layoutUrl: `${OUTLINE}/baku-1.svg` },
  { id: 16, name: 'Marina Bay Street Circuit', country: 'Singapore', layoutUrl: `${OUTLINE}/marina-bay-4.svg` },
  { id: 17, name: 'Circuit of The Americas', country: 'USA', layoutUrl: `${OUTLINE}/austin-1.svg` },
  { id: 18, name: 'Autódromo Hermanos Rodríguez', country: 'Mexico', layoutUrl: `${OUTLINE}/mexico-city-3.svg` },
  {
    id: 19,
    name: 'Autódromo José Carlos Pace (Interlagos)',
    country: 'Brazil',
    layoutUrl: `${OUTLINE}/interlagos-2.svg`,
  },
  { id: 20, name: 'Las Vegas Street Circuit', country: 'USA', layoutUrl: `${OUTLINE}/las-vegas-1.svg` },
  { id: 21, name: 'Lusail International Circuit', country: 'Qatar', layoutUrl: `${OUTLINE}/lusail-1.svg` },
  { id: 22, name: 'Yas Marina Circuit', country: 'Abu Dhabi', layoutUrl: `${OUTLINE}/yas-marina-2.svg` },
];
