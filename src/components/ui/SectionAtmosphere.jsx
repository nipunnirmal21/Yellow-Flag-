/**
 * Per-section background wash. Every variant fades to pure black at its top and
 * bottom edges, so stacked sections blend seamlessly and only the middle lifts —
 * the page reads as one continuous black surface with depth, not as bands.
 *
 * Alternate "accent" variants (apex/ember/silver) with "deep" so the eye gets a
 * rest between glows while scrolling.
 */
const VARIANTS = {
  // Near-black breather. Use between accented sections.
  deep: [
    'linear-gradient(180deg, #000 0%, #060606 50%, #000 100%)',
  ],
  // Yellow brand glow, upper right.
  apex: [
    'radial-gradient(ellipse 70% 55% at 78% 8%, rgba(250,204,21,0.10), transparent 62%)',
    'linear-gradient(180deg, #000 0%, #0d0d0d 48%, #000 100%)',
  ],
  // Ferrari-red warmth, lower left.
  ember: [
    'radial-gradient(ellipse 65% 55% at 18% 88%, rgba(225,6,0,0.10), transparent 60%)',
    'linear-gradient(180deg, #000 0%, #0b0a0a 50%, #000 100%)',
  ],
  // Cool silver lift, centered — reads like track lighting.
  silver: [
    'radial-gradient(ellipse 85% 50% at 50% 45%, rgba(255,255,255,0.055), transparent 65%)',
    'linear-gradient(180deg, #000 0%, #0c0c0d 50%, #000 100%)',
  ],
  // Split: yellow top-left into red bottom-right. For high-drama sections.
  duel: [
    'radial-gradient(ellipse 55% 45% at 12% 12%, rgba(250,204,21,0.09), transparent 58%)',
    'radial-gradient(ellipse 55% 45% at 88% 88%, rgba(225,6,0,0.09), transparent 58%)',
    'linear-gradient(180deg, #000 0%, #0b0b0b 50%, #000 100%)',
  ],
};

export default function SectionAtmosphere({ variant = 'deep' }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ background: (VARIANTS[variant] ?? VARIANTS.deep).join(', ') }}
      aria-hidden="true"
    />
  );
}
