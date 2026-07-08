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
const BIRTH_YEAR = 2004
const CAREER_START_YEAR = 2023 // "more than 2 years of experience"

const currentYear = new Date().getFullYear()
const AGE = currentYear - BIRTH_YEAR
const YEARS_EXP = currentYear - CAREER_START_YEAR

/* ---- Content ----------------------------------------------------------- */
const EDUCATION = [
  {
    tag: 'DTS',
    value: 'Digital Development',
    sub: 'Higher Technician Diploma · Morocco',
    icon: 'solar:diploma-bold-duotone',
    accent: '#6a5cff',
  },
  {
    tag: 'BSc',
    value: 'Computer Engineering',
    sub: 'High Tech Moroccan School',
    icon: 'solar:square-academic-cap-2-bold-duotone',
    accent: '#ff5c9d',
  },
]

const SKILLS = [
  { label: 'Web Apps', icon: 'solar:code-square-bold-duotone' },
  { label: 'Problem Solving', icon: 'solar:lightbulb-bolt-bold-duotone' },
  { label: 'Clean Code', icon: 'solar:broom-bold-duotone' },
  { label: 'AI-Assisted Dev', icon: 'solar:magic-stick-3-bold-duotone' },
  { label: 'React', icon: 'solar:atom-bold-duotone' },
  { label: 'JavaScript', icon: 'solar:programming-bold-duotone' },
  { label: 'Fast Delivery', icon: 'solar:rocket-2-bold-duotone' },
  { label: 'Always Learning', icon: 'solar:book-bookmark-bold-duotone' },
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
const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const card = {
  hidden: { opacity: 0, scale: 0.9, y: 40, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 26,
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 24,
    filter: 'blur(8px)',
    transition: { duration: 0.22 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

export default function MePanel({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const stats = [
    { value: <Counter to={AGE} />, label: 'Years old', icon: 'solar:cake-bold-duotone', accent: '#ff9a5c' },
    { value: <><Counter to={YEARS_EXP} />+</>, label: 'Years exp.', icon: 'solar:medal-ribbons-star-bold-duotone', accent: '#6a5cff' },
    { value: <Counter to={EDUCATION.length} />, label: 'Degrees', icon: 'solar:square-academic-cap-bold-duotone', accent: '#ff5c9d' },
  ]

  return (
    <motion.div
      className="me-backdrop"
      variants={backdrop}
      initial="hidden"
      animate="show"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="me-card"
        variants={card}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="About Youssef Talibi"
      >
        <button className="me-close" onClick={onClose} aria-label="Close">
          <Icon icon="solar:close-circle-bold-duotone" />
        </button>

        {/* ---- Left: framed photo ---- */}
        <motion.div className="me-photo" variants={item}>
          <div className="me-photo__ring">
            <img src="/img.jpg" alt="Youssef Talibi" />
            <div className="me-photo__shine" aria-hidden="true" />
          </div>
          <div className="me-photo__flag">
            <MoroccoFlag size={26} />
            <span>Morocco</span>
          </div>
          <div className="me-photo__status">
            <span className="me-photo__dot" />
            Open to work
          </div>
        </motion.div>

        {/* ---- Right: content ---- */}
        <div className="me-content">
          <motion.div className="me-head" variants={item}>
            <h2 className="me-name">
              Youssef Talibi
              <Icon icon="solar:verified-check-bold" className="me-verified" />
            </h2>
            <div className="me-role">
              <Icon icon="solar:code-2-bold-duotone" />
              Software Developer
              <span className="me-dot-sep" />
              <MoroccoFlag size={18} />
              Morocco
            </div>
          </motion.div>

          {/* Stat tiles */}
          <motion.div className="me-stats" variants={item}>
            {stats.map((s, i) => (
              <div className="me-stat" key={i} style={{ '--accent': s.accent }}>
                <Icon icon={s.icon} className="me-stat__icon" />
                <div className="me-stat__value">{s.value}</div>
                <div className="me-stat__label">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p className="me-bio" variants={item}>
            I'm a Software Developer from Morocco who loves turning ideas into
            clean, efficient web applications. I enjoy solving problems and I
            lean on <strong>AI-assisted programming</strong> to ship better
            software, faster — while never stopping learning.
          </motion.p>

          {/* Education — American-style shield badges */}
          <motion.div className="me-section" variants={item}>
            <div className="me-section__title">
              <Icon icon="solar:square-academic-cap-2-bold-duotone" />
              Education
            </div>
            <div className="me-badges">
              {EDUCATION.map((e) => (
                <div className="me-shield" key={e.tag} style={{ '--accent': e.accent }}>
                  <span className="me-shield__key">
                    <Icon icon={e.icon} />
                    {e.tag}
                  </span>
                  <span className="me-shield__val">
                    {e.value}
                    <em>{e.sub}</em>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills — pill tags */}
          <motion.div className="me-section" variants={item}>
            <div className="me-section__title">
              <Icon icon="solar:star-shine-bold-duotone" />
              What I do
            </div>
            <div className="me-tags">
              {SKILLS.map((s) => (
                <span className="me-tag" key={s.label}>
                  <Icon icon={s.icon} />
                  {s.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AI highlight banner */}
          <motion.div className="me-ai" variants={item}>
            <Icon icon="solar:magic-stick-3-bold-duotone" className="me-ai__icon" />
            <div>
              <strong>AI-Assisted Engineering</strong>
              <span>Boosting productivity & code quality with modern AI tooling.</span>
            </div>
            <Icon icon="solar:arrow-right-up-bold-duotone" className="me-ai__go" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
