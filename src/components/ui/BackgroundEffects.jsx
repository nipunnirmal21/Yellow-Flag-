import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';

const iconMap = {
  youtube: FaYoutube,
  tiktok: FaTiktok,
  facebook: FaFacebook,
  instagram: FaInstagram,
};

export function SocialIcon({ id, className = 'h-5 w-5' }) {
  const Icon = iconMap[id];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}

/**
 * Global backdrop: pure black plus fixed texture only. All colour and depth now
 * comes from each section's own <SectionAtmosphere />, so this layer must stay
 * neutral — anything tinted here would wash the section fades out.
 */
export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)',
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <motion.path
          d="M-40 720 C 220 560, 420 860, 700 680 S 1180 420, 1500 560"
          fill="none"
          stroke="rgba(250,204,21,0.35)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-60 780 C 180 620, 520 920, 860 700 S 1280 500, 1520 640"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.6, delay: 0.2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Vignette: pulls the eye to centre and keeps edges truly black. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
