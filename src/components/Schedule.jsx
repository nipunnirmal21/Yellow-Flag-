import { FaMapLocationDot } from 'react-icons/fa6';
import { f1Schedule2026, scheduleIntro } from '../data/schedule';
import ExpandableGrid from './ui/ExpandableGrid';
import GlowButton from './ui/GlowButton';
import Panel from './ui/Panel';
import Reveal from './ui/Reveal';
import SectionAtmosphere from './ui/SectionAtmosphere';
import SectionHeading from './ui/SectionHeading';

function RaceCard({ race }) {
  const isSprintWeekend = Boolean(race.sprintDetails);

  return (
    <Panel as="article" interactive className="flex h-full flex-col">
      {/* Timing-tower header: solid position block + flat data row. */}
      <header className="flex items-stretch border-b border-white/10">
        <span className="flex w-16 shrink-0 items-center justify-center bg-chequer font-display text-2xl font-black tabular-nums text-black">
          {String(race.round).padStart(2, '0')}
        </span>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 bg-panel-2 px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-black uppercase text-chequer">{race.grandPrix}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-steel">
              <FaMapLocationDot className="h-3 w-3 shrink-0 text-flag" aria-hidden="true" />
              {race.track}
            </p>
          </div>
          {isSprintWeekend && (
            <span className="shrink-0 rounded-sm bg-flag px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-black">
              Sprint
            </span>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] pb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-steel">Race Start</span>
          <span className="font-display text-xl font-black tabular-nums text-flag">{race.raceTime}</span>
        </div>
        <p className="mt-2 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          Sri Lanka Time
        </p>

        {race.sprintDetails && (
          <dl className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel">Sprint Quali</dt>
              <dd className="text-xs font-semibold tabular-nums text-zinc-200">
                {race.sprintDetails.sprintQualifying}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel">Sprint</dt>
              <dd className="text-xs font-semibold tabular-nums text-zinc-200">{race.sprintDetails.sprint}</dd>
            </div>
          </dl>
        )}

        <div className="mt-auto pt-5">
          <GlowButton
            href={`#track-${race.round}`}
            variant="secondary"
            className="w-full px-5 py-3 text-[11px]"
          >
            <FaMapLocationDot className="h-3.5 w-3.5" aria-hidden="true" />
            View Track
          </GlowButton>
        </div>
      </div>
    </Panel>
  );
}

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-24 md:py-32">
      <SectionAtmosphere variant="ember" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,212,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,212,0,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Schedule" title="2026 F1 Schedule" description={scheduleIntro} />

        <ExpandableGrid expandLabel="See More" collapseLabel="See Less" collapsedMaxHeight="max-h-[700px]">
          {f1Schedule2026.map((race, index) => (
            <Reveal key={race.round} delay={Math.min(index * 0.05, 0.3)}>
              <RaceCard race={race} />
            </Reveal>
          ))}
        </ExpandableGrid>
      </div>
    </section>
  );
}
