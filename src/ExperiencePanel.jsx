import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import './ExperiencePanel.css'

/* ---- Content ----------------------------------------------------------- */
const EXPERIENCE = [
  {
    role: 'Software & Automation Developer',
    company: 'Cloud Marketing Hub',
    logo: '/experience/cmh.jpg',
    type: 'Full-time',
    period: 'Aug 2024 — Present',
    duration: '2 yrs',
    location: 'Tangier, Tanger-Tetouan-Al Hoceima, Morocco',
    mode: 'On-site',
    accent: '#6a5cff',
    current: true,
    intro:
      'Building software and automation tools that streamline internal operations.',
    points: [
      "CMH's IT department is merged with WMN — all work carried out at CMH is focused on the WMN company.",
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'TOUIL DIGICOM',
    logo: '/experience/touil_digicom.jpg',
    type: 'Internship',
    period: 'Apr 2024 — May 2024',
    duration: '2 mos',
    location: 'Boulevard Med V, Technopark, Tangier, Morocco 90000',
    mode: 'Hybrid',
    accent: '#ff5c9d',
    intro:
      "As a trainee at TOUIL DIGICOM, I actively contributed to building the startup's official website:",
    points: [
      'Designed an attractive landing page',
      'Implemented a training booking system',
      'Developed a control panel for full management of bookings',
    ],
    link: 'https://touildigicom.ma/',
    outro:
      'This experience helped me grow my full-stack development skills while contributing to the growth of an innovative company.',
  },
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
      staggerChildren: 0.14,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}
const head = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}
const badge = {
  hidden: { scale: 0, rotate: -35, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 320, damping: 18 },
  },
}
const card = {
  hidden: { opacity: 0, x: 40, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 240, damping: 26 },
  },
}
const bullet = {
  hidden: { opacity: 0, x: 14 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

export default function ExperiencePanel({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="xp-page"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      role="region"
      aria-label="Experience of Youssef Talibi"
    >
      <button className="xp-back" onClick={onClose} aria-label="Back">
        <Icon icon="solar:arrow-left-linear" />
        <span>Back</span>
      </button>

      <motion.h2 className="xp-title" variants={head}>
        Experience
      </motion.h2>
      <motion.p className="xp-sub" variants={head}>
        The road so far — building, automating, shipping
      </motion.p>

      <div className="xp-track">
        {/* the timeline line — draws itself downward */}
        <motion.span
          className="xp-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        />

        {EXPERIENCE.map((e) => (
          <div className="xp-item" key={e.company} style={{ '--accent': e.accent }}>
            {/* logo node sitting on the line */}
            <motion.div className="xp-node" variants={badge}>
              <div className="xp-node__badge">
                <img src={e.logo} alt={e.company} />
              </div>
              {e.current && <span className="xp-node__pulse" aria-hidden="true" />}
            </motion.div>

            {/* card */}
            <motion.article className="xp-card" variants={card}>
              <header className="xp-card__head">
                <h3>{e.role}</h3>
                <div className="xp-company">
                  <span className="xp-company__name">{e.company}</span>
                  <span className="xp-chip">{e.type}</span>
                  {e.current && <span className="xp-chip xp-chip--live">● Present</span>}
                </div>
              </header>

              <div className="xp-meta">
                <span>
                  <Icon icon="solar:calendar-bold-duotone" />
                  {e.period}
                  <em>· {e.duration}</em>
                </span>
                <span>
                  <Icon icon="solar:map-point-bold-duotone" />
                  {e.location}
                  <em>· {e.mode}</em>
                </span>
              </div>

              {e.intro && <p className="xp-intro">{e.intro}</p>}

              <motion.ul
                className="xp-points"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              >
                {e.points.map((p, i) => (
                  <motion.li key={i} variants={bullet}>
                    <Icon icon="solar:check-circle-bold" className="xp-points__icon" />
                    <span>{p}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {e.link && (
                <a className="xp-link" href={e.link} target="_blank" rel="noreferrer">
                  <Icon icon="solar:link-round-angle-bold-duotone" />
                  View the project
                  <Icon icon="solar:arrow-right-up-linear" className="xp-link__go" />
                </a>
              )}

              {e.outro && <p className="xp-outro">{e.outro}</p>}
            </motion.article>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
