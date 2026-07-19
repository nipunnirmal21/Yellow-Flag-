/**
 * Kerb-stripe rule. Marks the seam between sections so the page reads as a
 * sequence of distinct segments rather than one continuous scroll.
 */
export default function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8" aria-hidden="true">
      <div className="kerb h-1 w-full opacity-25" />
    </div>
  );
}
