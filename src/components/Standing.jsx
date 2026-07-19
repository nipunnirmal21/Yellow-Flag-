import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { standingsIntro } from '../data/standings';
import { getTeamColorByConstructorId as getTeamColor } from '../data/teamColors';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import SectionAtmosphere from './ui/SectionAtmosphere';

const DRIVER_STANDINGS_URL = 'https://api.jolpi.ca/ergast/f1/current/driverStandings.json';
const CONSTRUCTOR_STANDINGS_URL = 'https://api.jolpi.ca/ergast/f1/current/constructorStandings.json';

function getSurname(fullName) {
  return fullName.split(' ').pop()?.toUpperCase() ?? fullName.toUpperCase();
}

function AvatarPlaceholder({ label }) {
  const initials = label
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-black/20 font-display text-xs font-black text-white">
      {initials}
    </div>
  );
}

function StartingGridCard({ position, name, points, teamColorCode, subtitle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-row items-stretch overflow-hidden rounded-lg"
    >
      <div className="flex w-14 shrink-0 items-center justify-center bg-chequer md:w-16">
        <span className="font-display text-2xl font-black tabular-nums text-black md:text-3xl">{position}</span>
      </div>

      <div
        className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 md:gap-4 md:px-4 md:py-3"
        style={{ backgroundColor: teamColorCode }}
      >
        <AvatarPlaceholder label={name} />

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-black uppercase tracking-wide text-white md:text-lg">
            {getSurname(name)}
          </p>
          {subtitle && (
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 md:text-xs">
              {subtitle}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">Pts</p>
          <p className="font-display text-xl font-black text-white md:text-2xl">{points}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ViewModeButton({ active, children, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.2em] transition duration-150 md:px-10 md:text-sm ${
        active
          ? 'bg-flag text-black shadow-[0_0_28px_rgba(255,212,0,0.28)]'
          : 'border border-white/15 bg-panel-2 text-chequer hover:border-flag/60 hover:text-flag'
      }`}
    >
      {children}
    </motion.button>
  );
}

function StandingsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-10 py-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-12 w-12 rounded-full border-2 border-yellow-400/20 border-t-yellow-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">Loading live standings</p>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex overflow-hidden rounded-lg">
            <div className="h-[4.5rem] w-14 shrink-0 animate-pulse bg-chequer/90 md:w-16" />
            <div className="h-[4.5rem] flex-1 animate-pulse bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StartingGridView({ items, mode, season }) {
  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8 text-center">
        <h3 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight text-chequer md:text-5xl">
          Championship <span className="text-flag">Grid</span>
        </h3>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.28em] text-steel md:text-sm">
          {mode === 'drivers'
            ? `${season || '2026'} Driver Standings`
            : `${season || '2026'} Constructor Standings`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
        {items.map((item, index) => {
          return (
            <div key={`${mode}-${item.position}-${item.name || item.team}`}>
              <StartingGridCard
                position={item.position}
                name={mode === 'drivers' ? item.name : item.team}
                subtitle={mode === 'drivers' ? item.team : undefined}
                points={item.points}
                teamColorCode={item.teamColorCode}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function mapDriverStandings(rawList) {
  return (rawList ?? []).map((entry) => {
    const constructor = entry.Constructors?.[0];
    return {
      position: Number(entry.position),
      name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
      team: constructor?.name ?? '',
      points: entry.points,
      teamColorCode: getTeamColor(constructor?.constructorId),
    };
  });
}

function mapConstructorStandings(rawList) {
  return (rawList ?? []).map((entry) => ({
    position: Number(entry.position),
    team: entry.Constructor.name,
    points: entry.points,
    teamColorCode: getTeamColor(entry.Constructor.constructorId),
  }));
}

export default function Standing() {
  const [viewMode, setViewMode] = useState('drivers');
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [seasonMeta, setSeasonMeta] = useState({ season: '', round: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStandings() {
      setIsLoading(true);
      setError(null);

      try {
        const [driversRes, constructorsRes] = await Promise.all([
          fetch(DRIVER_STANDINGS_URL, { signal: controller.signal }),
          fetch(CONSTRUCTOR_STANDINGS_URL, { signal: controller.signal }),
        ]);

        if (!driversRes.ok || !constructorsRes.ok) {
          throw new Error('Failed to load championship standings.');
        }

        const [driversJson, constructorsJson] = await Promise.all([
          driversRes.json(),
          constructorsRes.json(),
        ]);

        const driverList = driversJson.MRData.StandingsTable.StandingsLists[0];
        const constructorList = constructorsJson.MRData.StandingsTable.StandingsLists[0];

        setDriverStandings(mapDriverStandings(driverList?.DriverStandings));
        setConstructorStandings(mapConstructorStandings(constructorList?.ConstructorStandings));
        setSeasonMeta({
          season: driverList?.season || constructorList?.season || '',
          round: driverList?.round || constructorList?.round || '',
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Unable to fetch live standings.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchStandings();
    return () => controller.abort();
  }, []);

  const lastUpdated =
    seasonMeta.season && seasonMeta.round
      ? `Live from Ergast · Season ${seasonMeta.season} · Round ${seasonMeta.round}`
      : 'Live championship data from Jolpi / Ergast';

  return (
    <section id="standing" className="relative py-24 md:py-32">
      <SectionAtmosphere variant="duel" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <SectionHeading eyebrow="Championship" title="Standing" description={standingsIntro} />
          <p className="-mt-8 mb-10 text-xs font-semibold uppercase tracking-[0.22em] text-flag/80">
            {lastUpdated}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            <ViewModeButton active={viewMode === 'drivers'} onClick={() => setViewMode('drivers')}>
              Driver Standings
            </ViewModeButton>
            <ViewModeButton active={viewMode === 'constructors'} onClick={() => setViewMode('constructors')}>
              Constructor Standings
            </ViewModeButton>
          </div>
        </Reveal>

        <div className="rounded-xl border border-white/10 bg-panel p-5 md:p-8">
          {isLoading ? (
            <StandingsSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="font-display text-2xl font-black uppercase tracking-wide text-white">Signal Lost</p>
              <p className="max-w-md text-sm text-zinc-400">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-300 transition hover:bg-yellow-400/20"
              >
                Retry
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'drivers' ? (
                <StartingGridView items={driverStandings} mode="drivers" season={seasonMeta.season} />
              ) : (
                <StartingGridView
                  items={constructorStandings}
                  mode="constructors"
                  season={seasonMeta.season}
                />
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
