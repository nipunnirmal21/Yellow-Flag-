/**
 * 2026 F1 Teams — clean transparent SVG logos (Wikimedia Commons + Simple Icons silhouettes).
 * invertLogo: flip dark source artwork to white for the dark UI.
 */
export const teamsIntro =
  'All 11 teams on the 2026 Formula 1 grid — full team names, driver lineups, and power units.';

const WIKI = 'https://upload.wikimedia.org/wikipedia/commons';
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons';

export const f1Teams2026 = [
  {
    id: 1,
    name: 'McLaren Formula 1 Team',
    drivers: ['Lando Norris', 'Oscar Piastri'],
    engine: 'Mercedes Power Unit',
    logoUrl: `${WIKI}/d/d0/McLaren_Speedmark_(white).svg`,
    invertLogo: false,
  },
  {
    id: 2,
    name: 'Mercedes-AMG Petronas F1 Team',
    drivers: ['George Russell', 'Kimi Antonelli'],
    engine: 'Mercedes Power Unit',
    logoUrl: `${WIKI}/f/fc/Mercedes-AMG_Petronas_F1_Team_logo_(2026).svg`,
    invertLogo: true,
  },
  {
    id: 3,
    name: 'Scuderia Ferrari HP',
    drivers: ['Lewis Hamilton', 'Charles Leclerc'],
    engine: 'Ferrari Power Unit',
    logoUrl: `${SI}/ferrari.svg`,
    invertLogo: true,
  },
  {
    id: 4,
    name: 'Oracle Red Bull Racing',
    drivers: ['Max Verstappen', 'Isack Hadjar'],
    engine: 'Red Bull Ford Power Unit',
    logoUrl: `${SI}/redbull.svg`,
    invertLogo: true,
  },
  {
    id: 5,
    name: 'Atlassian Williams Racing',
    drivers: ['Carlos Sainz', 'Alex Albon'],
    engine: 'Mercedes Power Unit',
    logoUrl: `${WIKI}/1/12/Atlassian_Williams_F1_Team_logo.svg`,
    invertLogo: true,
  },
  {
    id: 6,
    name: 'Visa Cash App Racing Bulls',
    drivers: ['Liam Lawson', 'Arvid Lindblad'],
    engine: 'Red Bull Ford Power Unit',
    logoUrl: `${SI}/redbull.svg`,
    invertLogo: true,
  },
  {
    id: 7,
    name: 'Aston Martin Aramco F1 Team',
    drivers: ['Fernando Alonso', 'Lance Stroll'],
    engine: 'Honda Power Unit',
    logoUrl: `${SI}/astonmartin.svg`,
    invertLogo: true,
  },
  {
    id: 8,
    name: 'TGR Haas F1 Team',
    drivers: ['Esteban Ocon', 'Ollie Bearman'],
    engine: 'Ferrari Power Unit',
    logoUrl: `${WIKI}/1/18/TGR_Haas_F1_Team_Logo_(2026).svg`,
    invertLogo: true,
  },
  {
    id: 9,
    name: 'BWT Alpine F1 Team',
    drivers: ['Pierre Gasly', 'Franco Colapinto'],
    engine: 'Mercedes Power Unit',
    logoUrl: `${WIKI}/7/7e/Alpine_F1_Team_Logo.svg`,
    invertLogo: true,
  },
  {
    id: 10,
    name: 'Audi Revolut F1 Team',
    drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto'],
    engine: 'Audi Power Unit',
    logoUrl: `${SI}/audi.svg`,
    invertLogo: true,
  },
  {
    id: 11,
    name: 'Cadillac Formula 1 Team',
    drivers: ['Valtteri Bottas', 'Sergio Perez'],
    engine: 'Ferrari Power Unit',
    logoUrl: `${SI}/cadillac.svg`,
    invertLogo: true,
  },
];
