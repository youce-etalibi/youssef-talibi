import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import './SkillsPanel.css'

/* Real brand marks via Iconify — ordered from foundations to shipping. */
const TECH_STACK = [
  { label: 'JavaScript', icon: 'logos:javascript' },
  { label: 'TypeScript', icon: 'logos:typescript-icon' },
  { label: 'Python', icon: 'logos:python' },
  { label: 'PHP', icon: 'logos:php' },
  { label: 'HTML', icon: 'logos:html-5' },
  { label: 'CSS', icon: 'logos:css-3' },
  { label: 'Bash', icon: 'logos:bash-icon' },
  { label: 'React', icon: 'logos:react' },
  { label: 'Next.js', icon: 'logos:nextjs-icon' },
  { label: 'Vite', icon: 'logos:vitejs' },
  { label: 'Tailwind', icon: 'logos:tailwindcss-icon' },
  { label: 'Bootstrap', icon: 'logos:bootstrap' },
  { label: 'Node.js', icon: 'logos:nodejs-icon' },
  { label: 'Express.js', icon: 'simple-icons:express' },
  { label: 'Laravel', icon: 'logos:laravel' },
  { label: 'Django', icon: 'logos:django-icon' },
  { label: 'Flask', icon: 'logos:flask' },
  { label: 'FastAPI', icon: 'logos:fastapi-icon' },
  { label: 'REST APIs', icon: 'solar:cloud-bold-duotone' },
  { label: 'JWT', icon: 'logos:jwt-icon' },
  { label: 'MySQL', icon: 'logos:mysql-icon' },
  { label: 'PostgreSQL', icon: 'logos:postgresql' },
  { label: 'MongoDB', icon: 'logos:mongodb-icon' },
  { label: 'Redis', icon: 'logos:redis' },
  { label: 'Firebase', icon: 'logos:firebase-icon' },
  { label: 'Supabase', icon: 'logos:supabase-icon' },
  { label: 'Docker', icon: 'logos:docker-icon' },
  { label: 'Git', icon: 'logos:git-icon' },
  { label: 'GitHub', icon: 'logos:github-icon' },
  { label: 'GitHub Actions', icon: 'logos:github-actions' },
  { label: 'Linux', icon: 'logos:linux-tux' },
  { label: 'Nginx', icon: 'logos:nginx' },
  { label: 'Figma', icon: 'logos:figma' },
  { label: 'Postman', icon: 'logos:postman-icon' },
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
        {TECH_STACK.map((skill) => (
          <motion.div
            className="sk-tile"
            key={skill.label}
            variants={tile}
            whileHover={{ y: -6, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            title={skill.label}
          >
            <Icon icon={skill.icon} className="sk-tile__icon" />
            <span className="sk-tile__label">{skill.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
