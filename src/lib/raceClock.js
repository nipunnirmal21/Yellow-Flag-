import { f1Schedule2026 } from '../data/schedule';

const SEASON_YEAR = 2026;
const TOTAL_ROUNDS = f1Schedule2026.length;

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

// Race window after lights out during which we treat the GP as "live".
const RACE_LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;

/**
 * Parse a schedule time string like "19 Jul, 06:30 PM" (Sri Lanka time,
 * UTC+5:30) into a Date.
 */
export function parseRaceDate(raceTime, year = SEASON_YEAR) {
  const match = raceTime.match(/(\d{1,2}) (\w{3}), (\d{1,2}):(\d{2}) (AM|PM)/);
  if (!match) return null;

  const [, day, month, hour, minute, meridiem] = match;
  let hours = Number(hour) % 12;
  if (meridiem === 'PM') hours += 12;

  return new Date(Date.UTC(year, MONTHS[month], Number(day), hours - 5, Number(minute) - 30));
}

/**
 * Returns the race to feature in the hero: the live one if a GP is underway,
 * otherwise the next upcoming one. Null once the season is over.
 */
export function getFeaturedRace(now = new Date()) {
  for (const race of f1Schedule2026) {
    const raceDate = parseRaceDate(race.raceTime);
    if (!raceDate) continue;

    if (now < raceDate) {
      return { ...race, raceDate, isLive: false, totalRounds: TOTAL_ROUNDS };
    }
    if (now - raceDate < RACE_LIVE_WINDOW_MS) {
      return { ...race, raceDate, isLive: true, totalRounds: TOTAL_ROUNDS };
    }
  }
  return null;
}

export function getCountdownParts(target, now = new Date()) {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}
