import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Action pill. Buttons stay rounded (F1's own UI does the same); data surfaces
 * are hard-edged rectangles. Glow is kept only on the primary CTA as a light
 * bloom — everywhere else colour and contrast carry the emphasis.
 */
export default function GlowButton({ href, children, variant = 'primary', className, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.18em] transition duration-150';

  const variants = {
    primary: 'bg-flag text-black shadow-[0_0_28px_rgba(255,212,0,0.28)] hover:bg-yellow-300',
    secondary: 'border border-white/15 bg-panel-2 text-chequer hover:border-flag/60 hover:text-flag',
    youtube: 'bg-redflag text-white hover:bg-red-500',
    ghost: 'text-steel hover:text-flag',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
