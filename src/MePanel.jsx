import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import { Icon } from '@iconify/react'
import MoroccoFlag from './MoroccoFlag.jsx'
import './MePanel.css'

/* ---- Live, self-updating facts ---------------------------------------- */
const BIRTH_YEAR = 2005
const CAREER_START_YEAR = 2024 // "more than 2 years of experience"

const currentYear = new Date().getFullYear()
const AGE = currentYear - BIRTH_YEAR
const YEARS_EXP = currentYear - CAREER_START_YEAR

/* ---- Content ----------------------------------------------------------- */
const EDUCATION = [
  {
    value: 'Digital Development',
    sub: 'Higher Technician Diploma (DTS) · Morocco - Tangier',
    icon: 'solar:diploma-bold-duotone',
  },
  {
    value: 'Computer Engineering',
    sub: 'BSc · High Tech Moroccan School · Morocco - Rabat',
    icon: 'solar:square-academic-cap-2-bold-duotone',
  },
]

const SKILLS = [
  { label: 'React', icon: 'solar:atom-bold-duotone' },
  { label: 'JavaScript', icon: 'solar:programming-bold-duotone' },
  { label: 'Web Apps', icon: 'solar:code-square-bold-duotone' },
  { label: 'Clean Code', icon: 'solar:broom-bold-duotone' },
  { label: 'AI-Assisted Dev', icon: 'solar:magic-stick-3-bold-duotone' },
  { label: 'Problem Solving', icon: 'solar:lightbulb-bolt-bold-duotone' },
  { label: 'More ...', icon: 'solar:lightbulb-bolt-bold-duotone' },
]

/* ---- Count-up number --------------------------------------------------- */
function Counter({ to, duration = 1.3, delay = 0.35 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = rounded.on('change', setDisplay)
    return () => {
      controls.stop()
      unsub()
    }
  }, [to]) // eslint-disable-line
  return <>{display}</>
}

/* ---- Motion variants --------------------------------------------------- */
const page = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

const item = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 260, damping: 26 },
  },
}

export default function MePanel({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const stats = [
    { value: <Counter to={AGE} />, label: 'Years old' },
    { value: <><Counter to={YEARS_EXP} />+</>, label: 'Years exp.' },
    { value: <Counter to={EDUCATION.length} />, label: 'Degrees' },
  ]

  return (
    <motion.div
      className="me-page"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      role="region"
      aria-label="About Youssef Talibi"
    >
      <button className="me-back" onClick={onClose} aria-label="Back">
        <Icon icon="solar:arrow-left-linear" />
        <span>Back</span>
      </button>

      <div className="me-card">
        {/* ===== LEFT — identity ===== */}
        <div className="me-col me-col--left">
          <motion.div className="me-top" variants={item}>
            <div className="me-avatar">
              <img src="/img.jpg" alt="Youssef Talibi" />
            </div>
            <h2 className="me-name">
              Youssef Talibi
              <Icon icon="solar:verified-check-bold" className="me-verified" />
            </h2>
            <div className="me-role">
              <Icon icon="solar:code-2-bold-duotone" />
              Software Developer
              <span className="me-dot" />
              <MoroccoFlag size={15} />
              Morocco
            </div>
          </motion.div>

          <motion.p className="me-bio" variants={item}>
            I'm a Software Developer from Morocco who loves turning ideas into
            clean, efficient web apps. I lean on{' '}
            <strong>AI-assisted programming</strong> to ship better software,
            faster — while always learning.
          </motion.p>

          <motion.div className="me-stats" variants={item}>
            {stats.map((s, i) => (
              <div className="me-stat" key={i}>
                <span className="me-stat__value">{s.value}</span>
                <span className="me-stat__label">{s.label}</span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ===== RIGHT — skills + education ===== */}
        <div className="me-col me-col--right">
          <motion.div className="me-section" variants={item}>
            <span className="me-label">Skills</span>
            <div className="me-chips">
              {SKILLS.map((s) => (
                <span className="me-chip" key={s.label}>
                  <Icon icon={s.icon} />
                  {s.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="me-section" variants={item}>
            <span className="me-label">Education</span>
            <div className="me-edu">
              {EDUCATION.map((e) => (
                <div className="me-edu__row" key={e.value}>
                  <Icon icon={e.icon} className="me-edu__icon" />
                  <div>
                    <strong>{e.value}</strong>
                    <em>{e.sub}</em>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
