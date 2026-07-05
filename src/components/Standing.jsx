import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  constructorStandings,
  driverStandings,
  lastUpdated,
  standingsIntro,
} from '../data/standings';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const driverImages = import.meta.glob('../assets/drivers/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

const teamImages = import.meta.glob('../assets/teams/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

function getDriverImage(slug) {
  if (!slug) return null;
  const match = Object.entries(driverImages).find(([path]) => path.includes(`/${slug}.`));
  return match ? match[1] : null;
}

function getTeamImage(slug) {
  if (!slug) return null;
  const match = Object.entries(teamImages).find(([path]) => path.includes(`/${slug}.`));
  return match ? match[1] : null;
}

function getPodiumStyle(position) {
  if (position === 1) {
    return {
      row: 'border-yellow-400/45 bg-yellow-400/[0.06] shadow-[0_0_40px_rgba(250,204,21,0.2)]',
      badge: 'Leader',
      posClass: 'text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)]',
    };
  }
  if (position === 2) {
    return {
      row: 'border-white/20 bg-white/[0.04] shadow-[0_0_24px_rgba(255,255,255,0.06)]',
      badge: 'P2',
      posClass: 'text-zinc-200',
    };
  }
  if (position === 3) {
    return {
      row: 'border-orange-400/25 bg-orange-400/[0.04] shadow-[0_0_20px_rgba(251,146,60,0.1)]',
      badge: 'P3',
      posClass: 'text-orange-300',
    };
  }
  return { row: 'border-white/10 bg-white/[0.02]', badge: null, posClass: 'text-zinc-400' };
}

function DriverAvatar({ slug, name, teamColor, size = 'md' }) {
  const imageSrc = getDriverImage(slug);
  const sizeClass = size === 'sm' ? 'h-10 w-10 text-xs' : 'h-12 w-12 text-sm';
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={name}
        className={`${sizeClass} shrink-0 rounded-xl object-cover ring-2 ring-white/10`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-xl border bg-black/40 font-display font-black text-white`}
      style={{ borderColor: `${teamColor}44` }}
      title="Driver Image Coming Soon"
    >
      {initials}
    </div>
  );
}

function TeamLogo({ slug, name, teamColor }) {
  const imageSrc = getTeamImage(slug);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={name}
        className="h-12 w-12 shrink-0 rounded-xl object-contain bg-black/30 p-1.5 ring-2 ring-white/10"
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-black/40 font-display text-sm font-black text-white"
      style={{ borderColor: `${teamColor}44` }}
      title="Team Image Coming Soon"
    >
      {initials}
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] transition md:px-8 md:text-sm ${
        active
          ? 'bg-yellow-400 text-black shadow-[0_0_32px_rgba(250,204,21,0.4)]'
          : 'border border-white/15 bg-white/5 text-zinc-200 hover:border-yellow-400/30 hover:text-yellow-200'
      }`}
    >
      {children}
    </motion.button>
  );
}

function DriverStandingRow({ driver, index }) {
  const podium = getPodiumStyle(driver.position);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition hover:border-yellow-400/30 hover:shadow-[0_0_28px_rgba(250,204,21,0.12)] ${podium.row}`}
      style={{ borderLeftWidth: '4px', borderLeftColor: driver.teamColor }}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 md:p-5">
        <div className="flex items-center gap-4 sm:w-auto">
          <span className={`font-display text-3xl font-black md:text-4xl ${podium.posClass}`}>
            {String(driver.position).padStart(2, '0')}
          </span>
          <DriverAvatar slug={driver.driverImage} name={driver.driverName} teamColor={driver.teamColor} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-black uppercase text-white md:text-xl">
              {driver.driverName}
            </h3>
            {podium.badge && (
              <span className="rounded-full border border-yellow-400/40 bg-yellow-400/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-yellow-200">
                {podium.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-300">{driver.team}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{driver.nationality}</p>
        </div>

        <div className="flex items-center justify-between gap-6 sm:justify-end">
          <div className="text-left sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Wins</p>
            <p className="font-display text-xl font-bold text-white">{driver.wins}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Points</p>
            <p className="font-display text-2xl font-black text-yellow-300 md:text-3xl">{driver.points}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ConstructorStandingRow({ team, index }) {
  const podium = getPodiumStyle(team.position);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition hover:border-yellow-400/30 hover:shadow-[0_0_28px_rgba(250,204,21,0.12)] ${podium.row}`}
      style={{ borderLeftWidth: '4px', borderLeftColor: team.teamColor }}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 md:p-5">
        <div className="flex items-center gap-4 sm:w-auto">
          <span className={`font-display text-3xl font-black md:text-4xl ${podium.posClass}`}>
            {String(team.position).padStart(2, '0')}
          </span>
          <TeamLogo slug={team.teamLogo} name={team.teamName} teamColor={team.teamColor} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-black uppercase text-white md:text-xl">{team.teamName}</h3>
            {podium.badge && (
              <span className="rounded-full border border-yellow-400/40 bg-yellow-400/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-yellow-200">
                {podium.badge}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-300">{team.drivers.join(' · ')}</p>
        </div>

        <div className="flex items-center justify-between gap-6 sm:justify-end">
          <div className="text-left sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Wins</p>
            <p className="font-display text-xl font-bold text-white">{team.wins}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Points</p>
            <p className="font-display text-2xl font-black text-yellow-300 md:text-3xl">{team.points}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DriverStandingsView() {
  return (
    <motion.div
      key="drivers"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-3"
    >
      <div className="mb-4 hidden grid-cols-[auto_1fr_auto_auto] gap-4 px-5 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500 md:grid">
        <span>Pos</span>
        <span>Driver</span>
        <span className="text-right">Wins</span>
        <span className="text-right">Points</span>
      </div>
      {driverStandings.map((driver, index) => (
        <DriverStandingRow key={driver.driverName} driver={driver} index={index} />
      ))}
    </motion.div>
  );
}

function ConstructorStandingsView() {
  return (
    <motion.div
      key="constructors"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-3"
    >
      <div className="mb-4 hidden grid-cols-[auto_1fr_auto_auto] gap-4 px-5 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500 md:grid">
        <span>Pos</span>
        <span>Team</span>
        <span className="text-right">Wins</span>
        <span className="text-right">Points</span>
      </div>
      {constructorStandings.map((team, index) => (
        <ConstructorStandingRow key={team.teamName} team={team} index={index} />
      ))}
    </motion.div>
  );
}

export default function Standing() {
  const [activeTab, setActiveTab] = useState('drivers');

  return (
    <section id="standing" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading eyebrow="Championship" title="Standing" description={standingsIntro} />
          <p className="-mt-8 mb-10 text-center text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300/80">
            {lastUpdated}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <TabButton active={activeTab === 'drivers'} onClick={() => setActiveTab('drivers')}>
              Driver Standing
            </TabButton>
            <TabButton active={activeTab === 'constructors'} onClick={() => setActiveTab('constructors')}>
              Constructors Championship
            </TabButton>
          </div>
        </Reveal>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl md:p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'drivers' ? <DriverStandingsView /> : <ConstructorStandingsView />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
