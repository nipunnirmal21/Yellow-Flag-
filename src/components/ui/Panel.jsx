import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * The canonical data surface: a flat, solid, hard-edged panel.
 *
 * This replaces the old glass recipe (rounded-[1.75rem] + bg-white/[0.03] +
 * backdrop-blur-xl + float-on-hover). Hover is a state change — the border
 * snaps to brand yellow and a kerb stripe wipes in along the bottom — rather
 * than a drift, which is how broadcast graphics behave.
 *
 * `accent` paints a team/category colour bar down the left edge, timing-tower
 * style. `interactive` adds the hover treatment.
 */
export default function Panel({
  as = 'div',
  accent,
  interactive = false,
  kerbOnHover = true,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-panel transition duration-150',
        interactive && 'hover:border-flag/50',
        className
      )}
      {...rest}
    >
      {accent && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1"
          style={{ background: accent }}
          aria-hidden="true"
        />
      )}

      {children}

      {interactive && kerbOnHover && (
        <span
          className="kerb pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100"
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}
