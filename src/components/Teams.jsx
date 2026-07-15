import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay, FaXmark } from 'react-icons/fa6';
import { f1Teams2026, teamsIntro } from '../data/teams';
import ExpandableGrid from './ui/ExpandableGrid';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const driverImages = import.meta.glob('../assets/drivers/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

const teamColors = {
  1: '#FF8000',
  2: '#27F4D2',
  3: '#DC0000',
  4: '#1E41FF',
  5: '#005AFF',
  6: '#6692FF',
  7: '#006F62',
  8: '#B6BABD',
  9: '#0093CC',
  10: '#52E252',
  11: '#C4A052',
};

const driverImageSlugs = {
  'Lando Norris': 'lando-norris',
  'Oscar Piastri': 'oscar-piastri',
  'George Russell': 'george-russell',
  'Kimi Antonelli': 'kimi-antonelli',
  'Lewis Hamilton': 'lewis-hamilton',
  'Charles Leclerc': 'charles-leclerc',
  'Max Verstappen': 'max-verstappen',
  'Isack Hadjar': 'isack-hadjar',
  'Carlos Sainz': 'carlos-sainz',
  'Alex Albon': 'alexander-albon',
  'Liam Lawson': 'liam-lawson',
  'Arvid Lindblad': 'arvid-lindblad',
  'Fernando Alonso': 'fernando-alonso',
  'Lance Stroll': 'lance-stroll',
  'Esteban Ocon': 'esteban-ocon',
  'Ollie Bearman': 'oliver-bearman',
  'Pierre Gasly': 'pierre-gasly',
  'Franco Colapinto': 'franco-colapinto',
  'Nico Hulkenberg': 'nico-hulkenberg',
  'Gabriel Bortoleto': 'gabriel-bortoleto',
  'Valtteri Bottas': 'valtteri-bottas',
  'Sergio Perez': 'sergio-perez',
};

function getTeamColor(teamId) {
  return teamColors[teamId] ?? '#FACC15';
}

function getDriverImage(driverName) {
  const slug = driverImageSlugs[driverName];
  if (!slug) return null;
  const match = Object.entries(driverImages).find(([path]) => path.includes(`/${slug}.`));
  return match ? match[1] : null;
}

function TeamLogo({ team }) {
  const [failed, setFailed] = useState(false);
  const shouldInvert = Boolean(team.invertLogo);
  const initials = team.name
    .split(' ')
    .filter((word) => word.length > 2)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  if (!team.logoUrl || failed) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:h-16 md:w-16">
        <span className="font-display text-xs font-black tracking-wider text-white/35 md:text-sm">{initials}</span>
      </div>
    );
  }

  return (
    <motion.img
      src={team.logoUrl}
      alt=""
      aria-hidden="true"
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`pointer-events-none h-12 w-12 object-contain opacity-95 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] md:h-16 md:w-16 ${
        shouldInvert ? 'invert brightness-200' : ''
      }`}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onError={() => setFailed(true)}
    />
  );
}

function DriverAvatar({ driverName, teamColor }) {
  const imageSrc = getDriverImage(driverName);
  const initials = driverName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={driverName}
        className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white/10"
        style={{ boxShadow: `0 0 20px ${teamColor}33` }}
      />
    );
  }

  return (
    <div
      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border bg-black/40"
      style={{ borderColor: `${teamColor}44` }}
    >
      <span className="font-display text-sm font-black text-white">{initials}</span>
      <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-500">Soon</span>
    </div>
  );
}

function DriverCard({ driverName, teamColor }) {
  const imageSrc = getDriverImage(driverName);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4"
      style={{ boxShadow: `inset 3px 0 0 ${teamColor}` }}
    >
      <DriverAvatar driverName={driverName} teamColor={teamColor} />
      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-yellow-200">
          Main Driver
        </span>
        <p className="mt-1.5 truncate font-display text-base font-black uppercase text-white">{driverName}</p>
        {!imageSrc && (
          <p className="mt-1 text-[10px] font-semibold text-zinc-500">Driver Image Coming Soon</p>
        )}
      </div>
    </motion.div>
  );
}

function DriverPanel({ team, onClose }) {
  const teamColor = getTeamColor(team.id);

  return (
    <motion.div
      key={team.id}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-yellow-400/30 bg-[#0a0a0a] shadow-[0_0_60px_rgba(250,204,21,0.18)]"
      style={{ borderTopColor: teamColor, borderTopWidth: '3px' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300">Driver Lineup</p>
          <h3 className="mt-1 font-display text-2xl font-extrabold uppercase text-white md:text-3xl">{team.name}</h3>
          <p className="mt-1 text-sm text-gray-400">{team.engine} · 2026 Season</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1a1a1a] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-yellow-400/40 hover:text-yellow-200"
        >
          <FaXmark className="h-3.5 w-3.5" />
          Hide Drivers
        </button>
      </div>

      <div className="p-5 md:p-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Main Drivers</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {team.drivers.map((driverName) => (
            <DriverCard key={driverName} driverName={driverName} teamColor={teamColor} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TeamCard({ team, index, isSelected, onViewTeam }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        id={`team-${team.id}`}
        layout
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#0a0a0a] transition ${
          isSelected
            ? 'border-yellow-400/45 shadow-[0_0_40px_rgba(250,204,21,0.18)]'
            : 'border-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.12)]'
        }`}
      >
        <button
          type="button"
          onClick={() => onViewTeam(team.id)}
          className="relative flex-1 overflow-hidden px-5 pb-5 pt-5 text-left md:px-6 md:pt-6"
        >
          <div className="relative z-10 flex items-start justify-between gap-4">
            <span className="inline-flex rounded-full border border-yellow-400/40 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-300">
              2026 Grid
            </span>
            <TeamLogo team={team} />
          </div>

          <div className="relative z-10 mt-8 max-w-[95%]">
            <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-wide text-white md:text-2xl">
              {team.name}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{team.engine}</p>
          </div>
        </button>

        <div className="border-t border-white/5 bg-[#111111] p-4 md:p-5">
          <a
            href="#highlights"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-[#1a1a1a] py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-900"
          >
            <FaPlay className="h-3 w-3" />
            Podcast Preview
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Teams() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedTeam = f1Teams2026.find((team) => team.id === selectedId) ?? null;

  const handleViewTeam = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      requestAnimationFrame(() => {
        document.getElementById('team-driver-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  return (
    <section id="teams" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.05),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Teams" title="F1 Teams" description={teamsIntro} />

        <ExpandableGrid expandLabel="See More" collapseLabel="See Less" collapsedMaxHeight="max-h-[720px]">
          {f1Teams2026.map((team, index) => (
            <TeamCard
              key={team.id}
              team={team}
              index={index}
              isSelected={selectedId === team.id}
              onViewTeam={handleViewTeam}
            />
          ))}
        </ExpandableGrid>

        <div id="team-driver-panel" className="mt-8">
          <AnimatePresence mode="wait">
            {selectedTeam && <DriverPanel team={selectedTeam} onClose={() => setSelectedId(null)} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
