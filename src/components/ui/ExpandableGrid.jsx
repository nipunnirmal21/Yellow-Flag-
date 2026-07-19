import { useState } from 'react';
import GlowButton from './GlowButton';

export default function ExpandableGrid({
  children,
  expandLabel = 'See More',
  collapseLabel = 'See Less',
  collapsedMaxHeight = 'max-h-[640px]',
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden transition-[max-height] duration-700 ease-in-out ${
          isExpanded ? 'max-h-[12000px]' : collapsedMaxHeight
        }`}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{children}</div>

        {!isExpanded && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/85 to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="relative z-10 mt-8 flex justify-center">
        <GlowButton
          type="button"
          variant="secondary"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? collapseLabel : expandLabel}
        </GlowButton>
      </div>
    </div>
  );
}
