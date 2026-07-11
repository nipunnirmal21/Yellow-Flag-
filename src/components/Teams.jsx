import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import { f1Teams2026, teamsIntro } from '../data/teams';
import ExpandableGrid from './ui/ExpandableGrid';
import GlowButton from './ui/GlowButton';
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

function TeamImagePlaceholder({ name, color }) {
  const initials = name
    .split(' ')
    .filter((word) => word.length > 2)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="flex h-full min-h-[140px] flex-col items-center justify-center bg-[linear-gradient(135deg,#111,#050505)]"
      style={{ boxShadow: `inset 0 0 60px ${color}22` }}
    >
      <div
        className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border font-display text-lg font-black text-white"
        style={{ borderColor: `${color}66`, backgroundColor: `${color}18` }}
      >
        {initials}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-300/80">Team Image</p>
      <p className="mt-1 text-sm font-semibold text-zinc-400">Coming Soon</p>
    </div>
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
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
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
      className="overflow-hidden rounded-[2rem] border border-yellow-400/30 bg-white/[0.04] shadow-[0_0_60px_rgba(250,204,21,0.18)] backdrop-blur-xl"
      style={{ borderTopColor: teamColor, borderTopWidth: '3px' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300">Driver Lineup</p>
          <h3 className="mt-1 font-display text-2xl font-black uppercase text-white md:text-3xl">{team.name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: teamColor }}>
            {team.engine} Power Unit · 2026 Season
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-yellow-400/40 hover:text-yellow-200"
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

const selectedCardStyle =
  'border-yellow-400/55 bg-yellow-400/[0.07] shadow-[0_0_56px_rgba(250,204,21,0.28)] ring-1 ring-yellow-400/25';

function TeamCard({ team, index, isSelected, onViewTeam }) {
  const teamColor = getTeamColor(team.id);
  const isNew = team.id === 11;

  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        id={`team-${team.id}`}
        layout
        whileHover={isSelected ? undefined : { y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative overflow-hidden rounded-[1.75rem] border bg-white/[0.03] backdrop-blur-xl transition ${
          isSelected
            ? selectedCardStyle
            : isNew
              ? 'border-dashed border-yellow-400/35 bg-gradient-to-br from-yellow-400/[0.06] via-white/[0.02] to-transparent hover:border-yellow-300/50 hover:shadow-[0_0_44px_rgba(250,204,21,0.2)]'
              : 'border-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.15)]'
        }`}
        style={{ borderLeftWidth: '4px', borderLeftColor: teamColor }}
      >
        {isSelected && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        )}

        <div className="relative overflow-hidden">
          <TeamImagePlaceholder name={team.name} color={teamColor} />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-black text-white shadow-lg"
              style={{ backgroundColor: `${teamColor}CC` }}
            >
              {String(team.id).padStart(2, '0')}
            </span>
            {isNew && (
              <span className="rounded-full border border-yellow-400/40 bg-yellow-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-200">
                New Team
              </span>
            )}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <h3 className="font-display text-lg font-black uppercase leading-tight text-white md:text-xl">{team.name}</h3>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: teamColor }}>
            {team.engine} Power Unit
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">2026 Drivers</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-zinc-200">{team.drivers.join(' · ')}</p>
          </div>

          <div className="mt-5">
            <GlowButton
              type="button"
              onClick={() => onViewTeam(team.id)}
              variant={isSelected ? 'primary' : 'secondary'}
              className="w-full px-5 py-3 text-[11px]"
            >
              View Team
              <FaArrowRight className="h-3.5 w-3.5" />
            </GlowButton>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Teams() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedTeam = f1Teams2026.find((team) => team.id === selectedId) ?? null;

  const handleViewTeam = (id) => {
    setSelectedId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      requestAnimationFrame(() => {
        document.getElementById('team-driver-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  return (
    <section id="teams" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.05),transparent_35%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(250,204,21,0.5) 40px, rgba(250,204,21,0.5) 41px)',
        }}
      />

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
