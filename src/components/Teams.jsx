import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import { f1Teams, teamsIntro } from '../data/teams';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const teamImages = {};

const driverImages = import.meta.glob('../assets/drivers/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

function getTeamImage(slug) {
  return teamImages[slug] ?? null;
}

function getDriverImage(slug) {
  if (!slug) return null;
  const match = Object.entries(driverImages).find(([path]) => path.includes(`/${slug}.`));
  return match ? match[1] : null;
}

function TeamImagePlaceholder({ name, color }) {
  const initials = name
    .split(' ')
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

function DriverAvatar({ driver, teamColor, compact = false }) {
  const imageSrc = getDriverImage(driver.image);
  const initials = driver.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const size = compact ? 'h-12 w-12' : 'h-16 w-16';

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={driver.name}
        className={`${size} shrink-0 rounded-xl object-cover ring-2 ring-white/10`}
        style={{ boxShadow: `0 0 20px ${teamColor}33` }}
      />
    );
  }

  return (
    <div
      className={`${size} flex shrink-0 flex-col items-center justify-center rounded-xl border bg-black/40`}
      style={{ borderColor: `${teamColor}44` }}
    >
      <span className="font-display text-sm font-black text-white">{initials}</span>
      {!compact && (
        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-500">Soon</span>
      )}
    </div>
  );
}

function DriverCard({ driver, teamColor, compact = false }) {
  const isMain = driver.role === 'Main Driver';
  const imageSrc = getDriverImage(driver.image);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className={`flex items-center gap-4 rounded-2xl border bg-black/40 backdrop-blur-xl ${
        compact ? 'p-3' : 'p-4'
      } ${isMain ? 'border-white/10' : 'border-white/5'}`}
      style={{ boxShadow: isMain ? `inset 3px 0 0 ${teamColor}` : undefined }}
    >
      <DriverAvatar driver={driver} teamColor={teamColor} compact={compact} />
      <div className="min-w-0 flex-1">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] ${
            isMain
              ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200'
              : 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300'
          }`}
        >
          {driver.role}
        </span>
        <p className={`mt-1.5 truncate font-display font-black uppercase text-white ${compact ? 'text-sm' : 'text-base'}`}>
          {driver.name}
        </p>
        {driver.nationality && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{driver.nationality}</p>
        )}
        {!imageSrc && !compact && (
          <p className="mt-1 text-[10px] font-semibold text-zinc-500">Driver Image Coming Soon</p>
        )}
      </div>
    </motion.div>
  );
}

function DriverPanel({ team, onClose }) {
  return (
    <motion.div
      key={team.slug}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[2rem] border border-yellow-400/30 bg-white/[0.04] shadow-[0_0_60px_rgba(250,204,21,0.18)] backdrop-blur-xl"
      style={{ borderTopColor: team.color, borderTopWidth: '3px' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300">Driver Lineup</p>
          <h3 className="mt-1 font-display text-2xl font-black uppercase text-white md:text-3xl">{team.name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: team.color }}>
            {team.standing} · 2026 Season
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

      <div className="space-y-6 p-5 md:p-6">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Main Drivers</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {team.drivers.map((driver) => (
              <DriverCard key={driver.name} driver={driver} teamColor={team.color} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Reserve Drivers</p>
          {team.reserveTbc ? (
            <div className="inline-flex rounded-2xl border border-dashed border-zinc-500/30 bg-black/30 px-4 py-3 text-sm font-semibold text-zinc-400">
              Reserve Driver: TBC
            </div>
          ) : team.reserveDrivers.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {team.reserveDrivers.map((driver) => (
                <div key={driver.name} className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]">
                  <DriverCard driver={driver} teamColor={team.color} compact />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No reserve drivers listed.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const cardStyles = {
  champion: {
    card: 'border-yellow-400/45 bg-yellow-400/[0.05] shadow-[0_0_52px_rgba(250,204,21,0.22)] hover:border-yellow-300/60 hover:shadow-[0_0_64px_rgba(250,204,21,0.35)]',
    standing: 'border-yellow-400/50 bg-yellow-400/15 text-yellow-200',
  },
  active: {
    card: 'border-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.15)]',
    standing: 'border-white/15 bg-white/5 text-zinc-200',
  },
  new: {
    card: 'border-dashed border-yellow-400/35 bg-gradient-to-br from-yellow-400/[0.06] via-white/[0.02] to-transparent hover:border-yellow-300/50 hover:shadow-[0_0_44px_rgba(250,204,21,0.2)]',
    standing: 'border-yellow-400/40 bg-yellow-400/10 text-yellow-200',
  },
};

const selectedCardStyle =
  'border-yellow-400/55 bg-yellow-400/[0.07] shadow-[0_0_56px_rgba(250,204,21,0.28)] ring-1 ring-yellow-400/25';

function TeamCard({ team, index, isSelected, onViewTeam }) {
  const styles = cardStyles[team.status] || cardStyles.active;
  const imageSrc = getTeamImage(team.image);
  const isChampion = team.status === 'champion';
  const isNew = team.status === 'new';

  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        id={`team-${team.slug}`}
        layout
        whileHover={isSelected ? undefined : { y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative overflow-hidden rounded-[1.75rem] border bg-white/[0.03] backdrop-blur-xl transition ${
          isSelected ? selectedCardStyle : styles.card
        }`}
        style={{ borderLeftWidth: '4px', borderLeftColor: team.color }}
      >
        {isSelected && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        )}
        {isChampion && !isSelected && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        )}

        <div className="relative overflow-hidden">
          {imageSrc ? (
            <div className="relative h-36 overflow-hidden">
              <motion.img
                src={imageSrc}
                alt={`${team.name} team`}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
          ) : (
            <TeamImagePlaceholder name={team.name} color={team.color} />
          )}

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-black text-white shadow-lg"
              style={{ backgroundColor: `${team.color}CC` }}
            >
              {String(team.position).padStart(2, '0')}
            </span>
            {isNew && (
              <span className="rounded-full border border-yellow-400/40 bg-yellow-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-200">
                New Team
              </span>
            )}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-black uppercase text-white md:text-2xl">{team.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: team.color }}>
                {team.standing}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${styles.standing}`}>
                {team.statusLabel}
              </span>
              <span className="font-display text-lg font-bold text-white">{team.pointsLabel}</span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-300">{team.description}</p>

          <div className="mt-5">
            <GlowButton
              type="button"
              onClick={() => onViewTeam(team.slug)}
              variant={isSelected || isChampion || isNew ? 'primary' : 'secondary'}
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
  const [selectedSlug, setSelectedSlug] = useState(null);
  const selectedTeam = f1Teams.find((team) => team.slug === selectedSlug) ?? null;

  const handleViewTeam = (slug) => {
    setSelectedSlug(slug);
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {f1Teams.map((team, index) => (
            <TeamCard
              key={team.slug}
              team={team}
              index={index}
              isSelected={selectedSlug === team.slug}
              onViewTeam={handleViewTeam}
            />
          ))}
        </div>

        <div id="team-driver-panel" className="mt-8">
          <AnimatePresence mode="wait">
            {selectedTeam && (
              <DriverPanel team={selectedTeam} onClose={() => setSelectedSlug(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
