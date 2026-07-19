/**
 * Canonical 2026 team colours — the single source of truth.
 *
 * Teams.jsx and Standing.jsx previously kept their own maps that disagreed
 * (Red Bull was #1E41FF in one and #3671C6 in the other, Ferrari #DC0000 vs
 * #E80020), so the same team rendered in two different colours in adjacent
 * sections. Both now read from here.
 *
 * Keyed by Ergast/Jolpi `constructorId` because that's what the live standings
 * API returns; `TEAM_COLOR_BY_ID` maps our local team ids onto the same values.
 */
export const TEAM_COLORS = {
  mclaren: '#FF8000',
  mercedes: '#27F4D2',
  ferrari: '#E80020',
  red_bull: '#3671C6',
  williams: '#005AFF',
  rb: '#6692FF',
  racing_bulls: '#6692FF',
  aston_martin: '#006F62',
  haas: '#B6BABD',
  alpine: '#0093CC',
  audi: '#52E252',
  sauber: '#52E252',
  kick_sauber: '#52E252',
  cadillac: '#C4A052',
};

export const FALLBACK_TEAM_COLOR = '#FFD400';

/** Local team id (src/data/teams.js) → constructorId. */
const CONSTRUCTOR_BY_TEAM_ID = {
  1: 'mclaren',
  2: 'mercedes',
  3: 'ferrari',
  4: 'red_bull',
  5: 'williams',
  6: 'rb',
  7: 'aston_martin',
  8: 'haas',
  9: 'alpine',
  10: 'audi',
  11: 'cadillac',
};

export function getTeamColorByConstructorId(constructorId) {
  return TEAM_COLORS[constructorId] ?? FALLBACK_TEAM_COLOR;
}

export function getTeamColorById(teamId) {
  return TEAM_COLORS[CONSTRUCTOR_BY_TEAM_ID[teamId]] ?? FALLBACK_TEAM_COLOR;
}
