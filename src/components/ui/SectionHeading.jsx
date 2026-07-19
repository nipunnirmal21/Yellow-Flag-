import Reveal from './Reveal';

/**
 * Broadcast lower-third: a hard-edged label block with a kerb tab, then the
 * title. Left-aligned by default — F1's on-screen graphics are anchored to an
 * edge, never floated in the middle of the frame.
 */
export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <Reveal className={`mb-12 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      <div className={`mb-5 flex ${centered ? 'justify-center' : ''}`}>
        <span className="flex items-stretch overflow-hidden rounded-sm">
          <span className="kerb-v w-1.5" aria-hidden="true" />
          <span className="bg-panel-2 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-flag">
            {eyebrow}
          </span>
        </span>
      </div>

      <h2 className="font-display text-4xl font-black uppercase italic leading-[0.92] tracking-tight text-chequer md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className={`mt-5 text-base leading-7 text-steel md:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
