import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getCountdownParts, getFeaturedRace } from '../lib/raceClock';

const TRACK_PATH =
  'M60 150 C 60 90, 120 60, 200 62 C 290 64, 320 30, 380 36 C 440 42, 452 96, 400 116 C 350 135, 300 110, 250 132 C 200 154, 210 190, 160 196 C 100 203, 60 190, 60 150 Z';

function TrackOutline() {
  return (
    <svg
      viewBox="0 0 460 230"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path d={TRACK_PATH} fill="none" stroke="rgba(250,204,21,0.22)" strokeWidth="10" strokeLinejoin="round" />
      <path
        d={TRACK_PATH}
        fill="none"
        stroke="rgba(250,204,21,0.6)"
        strokeWidth="2"
        strokeDasharray="10 8"
        strokeLinejoin="round"
      />
      <circle r="5" fill="#facc15" style={{ filter: 'drop-shadow(0 0 6px rgba(250,204,21,0.9))' }}>
        <animateMotion dur="9s" repeatCount="indefinite" path={TRACK_PATH} rotate="auto" />
      </circle>
    </svg>
  );
}

function CountdownCell({ label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-panel-2 p-3 text-center md:p-4">
      <p className="font-display text-2xl font-black tabular-nums text-chequer md:text-3xl">
        {String(value).padStart(2, '0')}
      </p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-steel">{label}</p>
    </div>
  );
}

export default function NextRaceCountdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const race = useMemo(() => getFeaturedRace(now), [now]);

  if (!race) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-panel-2 p-1">
        <div className="relative rounded-lg bg-carbon p-6 md:p-8">
          <TrackOutline />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">2026 Season</p>
            <p className="mt-3 font-display text-3xl font-black uppercase text-yellow-300">
              Season Complete
            </p>
            <p className="mt-2 text-sm text-zinc-400">See you at the 2027 season opener.</p>
          </div>
        </div>
      </div>
    );
  }

  const countdown = getCountdownParts(race.raceDate, now);
  const seasonProgress = ((race.round - 1) / race.totalRounds) * 100;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-panel-2 p-1">
      <div className="relative overflow-hidden rounded-lg bg-carbon p-6 md:p-8">
        <div
          className="absolute inset-y-0 left-0 w-1.5 opacity-80"
          style={{ background: 'repeating-linear-gradient(180deg, #e10600 0 16px, #f5f5f5 16px 32px)' }}
          aria-hidden="true"
        />
        <TrackOutline />

        <div className="relative">
          <div className="mb-5 flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
            <span className="flex items-center gap-2 text-zinc-400">
              <span
                className={`h-2 w-2 rounded-full ${
                  race.isLive
                    ? 'animate-pulse bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]'
                    : 'animate-pulse bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]'
                }`}
              />
              {race.isLive ? 'Race Underway' : 'Next Race'}
            </span>
            <span className="text-yellow-300">
              Round {String(race.round).padStart(2, '0')} / {race.totalRounds}
            </span>
          </div>

          <h2 className="font-display text-3xl font-black uppercase italic leading-none text-yellow-300 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)] md:text-4xl">
            {race.grandPrix}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-zinc-400">{race.track}</p>

          {race.isLive ? (
            <p className="mt-6 font-display text-2xl font-black uppercase italic tracking-wide text-white">
              Lights out — it&apos;s race time!
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-4 gap-2 md:gap-3">
              <CountdownCell label="Days" value={countdown.days} />
              <CountdownCell label="Hrs" value={countdown.hours} />
              <CountdownCell label="Mins" value={countdown.minutes} />
              <CountdownCell label="Secs" value={countdown.seconds} />
            </div>
          )}

          <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            <span>{race.raceTime} — Sri Lanka Time</span>
            {race.sprintDetails && <span className="text-yellow-300/80">Sprint Weekend</span>}
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-white"
              initial={{ width: '0%' }}
              animate={{ width: `${seasonProgress}%` }}
              transition={{ duration: 1.4, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-zinc-600">
            Season Progress
          </p>
        </div>
      </div>
    </div>
  );
}
