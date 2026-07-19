import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import { f1Teams2026, teamsIntro } from '../data/teams';
import { getTeamColorById } from '../data/teamColors';
import ExpandableGrid from './ui/ExpandableGrid';
import GlowButton from './ui/GlowButton';
import Panel from './ui/Panel';
import Reveal from './ui/Reveal';
import SectionAtmosphere from './ui/SectionAtmosphere';
import SectionHeading from './ui/SectionHeading';

const driverImages = import.meta.glob('../assets/drivers/*.{png,jpg,jpeg,webp}', {
  import: 'default',
  eager: true,
});

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

function getDriverImage(driverName) {
  const slug = driverImageSlugs[driverName];
  if (!slug) return null;
  const match = Object.entries(driverImages).find(([path]) => path.includes(`/${slug}.`));
  return match ? match[1] : null;
}

function initialsOf(name, max = 3) {
  return name
    .split(' ')
    .filter((word) => word.length > 2)
    .map((word) => word[0])
    .join('')
    .slice(0, max)
    .toUpperCase();
}

/** Team crest block — a designed mark, not a missing-image apology. */
function TeamCrest({ name, color }) {
  return (
    <div
      className="flex h-full min-h-[140px] items-center justify-center bg-[linear-gradient(135deg,#141417,#08080a)]"
      style={{ boxShadow: `inset 0 0 80px ${color}1f` }}
    >
      <span
        className="font-display text-5xl font-black italic leading-none tracking-tight"
        style={{ color: `${color}59` }}
      >
        {initialsOf(name)}
      </span>
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
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
      />
    );
  }

  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-black/40"
      style={{ borderColor: `${teamColor}55` }}
    >
      <span className="font-display text-base font-black text-chequer">{initials}</span>
    </div>
  );
}

function DriverCard({ driverName, teamColor }) {
  return (
    <div
      className="flex items-center gap-4 rounded-lg border border-white/10 bg-panel-2 p-4"
      style={{ boxShadow: `inset 3px 0 0 ${teamColor}` }}
    >
      <DriverAvatar driverName={driverName} teamColor={teamColor} />
      <div className="min-w-0 flex-1">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-steel">Main Driver</span>
        <p className="mt-1 truncate font-display text-base font-black uppercase text-chequer">{driverName}</p>
      </div>
    </div>
  );
}

function DriverPanel({ team, onClose }) {
  const teamColor = getTeamColorById(team.id);

  return (
    <motion.div
      key={team.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-white/10 bg-panel"
      style={{ borderTopColor: teamColor, borderTopWidth: '3px' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 bg-panel-2 p-5 md:p-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-steel">Driver Lineup</p>
          <h3 className="mt-1 font-display text-2xl font-black uppercase text-chequer md:text-3xl">{team.name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: teamColor }}>
            {team.engine} Power Unit · 2026
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-steel transition hover:border-flag/50 hover:text-flag"
        >
          <FaXmark className="h-3.5 w-3.5" aria-hidden="true" />
          Hide Drivers
        </button>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-6">
        {team.drivers.map((driverName) => (
          <DriverCard key={driverName} driverName={driverName} teamColor={teamColor} />
        ))}
      </div>
    </motion.div>
  );
}

function TeamCard({ team, isSelected, onViewTeam }) {
  const teamColor = getTeamColorById(team.id);
  const isNew = team.id === 11;

  return (
    <Panel
      as="article"
      id={`team-${team.id}`}
      accent={teamColor}
      interactive={!isSelected}
      className={isSelected ? 'border-flag/60' : ''}
    >
      <div className="relative">
        <TeamCrest name={team.name} color={teamColor} />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-sm font-display text-base font-black tabular-nums text-black"
            style={{ backgroundColor: teamColor }}
          >
            {String(team.id).padStart(2, '0')}
          </span>
          {isNew && (
            <span className="rounded-sm bg-flag px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-black">
              New Team
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 p-5 md:p-6">
        <h3 className="font-display text-lg font-black uppercase leading-tight text-chequer md:text-xl">
          {team.name}
        </h3>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: teamColor }}>
          {team.engine} Power Unit
        </p>

        <div className="mt-4 rounded-lg border border-white/10 bg-panel-2 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-steel">2026 Drivers</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-zinc-200">{team.drivers.join(' · ')}</p>
        </div>

        <GlowButton
          type="button"
          onClick={() => onViewTeam(team.id)}
          variant={isSelected ? 'primary' : 'secondary'}
          className="mt-5 w-full px-5 py-3 text-[11px]"
        >
          View Team
          <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </GlowButton>
      </div>
    </Panel>
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
      <SectionAtmosphere variant="apex" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,212,0,0.5) 40px, rgba(255,212,0,0.5) 41px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Teams" title="F1 Teams" description={teamsIntro} />

        <ExpandableGrid expandLabel="See More" collapseLabel="See Less" collapsedMaxHeight="max-h-[720px]">
          {f1Teams2026.map((team, index) => (
            <Reveal key={team.id} delay={Math.min(index * 0.05, 0.3)}>
              <TeamCard team={team} isSelected={selectedId === team.id} onViewTeam={handleViewTeam} />
            </Reveal>
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
