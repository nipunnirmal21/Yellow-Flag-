import { useState } from 'react';
import { aboutIntro, hosts, socialLinks } from '../data/content';
import { SocialIcon } from './ui/BackgroundEffects';
import Panel from './ui/Panel';
import Reveal from './ui/Reveal';
import SectionAtmosphere from './ui/SectionAtmosphere';
import SectionHeading from './ui/SectionHeading';

function HostCard({ host }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const paragraphs = Array.isArray(host.bio) ? host.bio : [host.bio];
  const visibleParagraphs = isExpanded ? paragraphs : paragraphs.slice(0, 1);
  const hasMore = paragraphs.length > 1;

  return (
    <Panel as="article" interactive className="p-6 md:p-8">
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
        {/* Driver-number plate — stands in for a host photo until we have one. */}
        <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#141417,#08080a)]">
          <span className="font-display text-5xl font-black italic leading-none text-flag/40">{host.badge}</span>
        </div>

        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-flag">{host.role}</p>
          <h3 className="mt-2 font-display text-3xl font-black uppercase text-chequer">{host.name}</h3>
          <div className="mt-4 space-y-3 text-base leading-7 text-steel">
            {visibleParagraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </div>

          {hasMore && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="mt-2 inline-block cursor-pointer text-sm font-bold text-flag transition-colors hover:text-yellow-300"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}

          <div className="mt-6 flex gap-3">
            {host.socials.map((social) => (
              <a
                key={social}
                href={socialLinks.find((link) => link.id === social)?.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-panel-2 text-steel transition hover:border-flag/50 hover:text-flag"
                aria-label={social}
              >
                <SocialIcon id={social} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <SectionAtmosphere variant="apex" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="About"
          title="Two Hosts. One Racing Mission."
          description={aboutIntro}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {hosts.map((host, index) => (
            <Reveal key={host.id} delay={index * 0.12}>
              <HostCard host={host} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
