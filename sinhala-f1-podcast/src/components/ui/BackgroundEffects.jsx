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

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#050505_0%,#0a0a0a_45%,#050505_100%)]" />

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

      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1440 900" preserveAspectRatio="none">
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

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
          style={{ top: `${18 + i * 14}%`, left: '-20%', width: '140%' }}
          animate={{ x: ['0%', '8%', '0%'], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-16 bottom-24 h-64 w-64 rounded-full bg-red-600/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}
