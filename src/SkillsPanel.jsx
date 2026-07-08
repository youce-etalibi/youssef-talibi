import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import './SkillsPanel.css'

/* Real brand marks via Iconify "logos" set — loaded on demand */
const TECH_STACK = [
  { label: 'Python', icon: 'logos:python' },
  { label: 'JavaScript', icon: 'logos:javascript' },
  { label: 'TypeScript', icon: 'logos:typescript-icon' },
  { label: 'C', icon: 'logos:c' },
  { label: 'C++', icon: 'logos:c-plusplus' },
  { label: 'Kotlin', icon: 'logos:kotlin-icon' },
  { label: 'HTML', icon: 'logos:html-5' },
  { label: 'CSS', icon: 'logos:css-3' },
  { label: 'Bash', icon: 'logos:bash-icon' },
  { label: 'React', icon: 'logos:react' },
  { label: 'Next.js', icon: 'logos:nextjs-icon' },
  { label: 'Bootstrap', icon: 'logos:bootstrap' },
  { label: 'Node.js', icon: 'logos:nodejs-icon' },
  { label: 'Django', icon: 'logos:django-icon' },
  { label: 'Flask', icon: 'logos:flask' },
  { label: 'FastAPI', icon: 'logos:fastapi-icon' },
  { label: 'TensorFlow', icon: 'logos:tensorflow' },
  { label: 'PyTorch', icon: 'logos:pytorch-icon' },
  { label: 'Scikit-learn', icon: 'logos:scikit-learn' },
  { label: 'OpenCV', icon: 'logos:opencv' },
  { label: 'NumPy', icon: 'logos:numpy' },
  { label: 'Tailwind', icon: 'logos:tailwindcss-icon' },
  { label: 'Pandas', icon: 'logos:pandas-icon' },
  { label: 'MySQL', icon: 'logos:mysql-icon' },
  { label: 'PostgreSQL', icon: 'logos:postgresql' },
  { label: 'MongoDB', icon: 'logos:mongodb-icon' },
  { label: 'Firebase', icon: 'logos:firebase-icon' },
  { label: 'Supabase', icon: 'logos:supabase-icon' },
  { label: 'Redis', icon: 'logos:redis' },
  { label: 'Docker', icon: 'logos:docker-icon' },
  { label: 'Git', icon: 'logos:git-icon' },
  { label: 'GitHub', icon: 'logos:github-icon' },
  { label: 'Linux', icon: 'logos:linux-tux' },
  { label: 'VS Code', icon: 'logos:visual-studio-code' },
  { label: 'Vercel', icon: 'logos:vercel-icon' },
  { label: 'Jupyter', icon: 'logos:jupyter' },
  { label: 'Figma', icon: 'logos:figma' },
  { label: 'Postman', icon: 'logos:postman-icon' },
  { label: 'Hugging Face', icon: 'noto:hugging-face' },
  { label: 'MS Office', icon: 'logos:microsoft-icon' },
]

/* ---- Motion variants --------------------------------------------------- */
const page = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.02,
      delayChildren: 0.14,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}
const tile = {
  hidden: { opacity: 0, scale: 0.6, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
}

export default function SkillsPanel({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="sk-page"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      role="region"
      aria-label="Skills and tech stack"
    >
      <button className="sk-back" onClick={onClose} aria-label="Back">
        <Icon icon="solar:arrow-left-linear" />
        <span>Back</span>
      </button>

      <motion.h2 className="sk-title" variants={tile}>
        Tech Stack
      </motion.h2>
      <motion.p className="sk-sub" variants={tile}>
        Tools &amp; technologies I build with
      </motion.p>

      <div className="sk-grid">
        {TECH_STACK.map((t) => (
          <motion.div
            className="sk-tile"
            key={t.label}
            variants={tile}
            whileHover={{ y: -6, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            title={t.label}
          >
            <Icon icon={t.icon} className="sk-tile__icon" />
            <span className="sk-tile__label">{t.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
