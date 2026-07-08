import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import gsap from 'gsap'
import './ProjectsPanel.css'

/* ---- Featured (public) projects --------------------------------------- */
const FEATURED = [
  {
    title: 'Learnova',
    tagline: 'Smart Learning & School Management Platform',
    period: 'Jun 2026 – Jul 2026',
    image: '/projects/learnova.png',
    desc: 'A modern e-learning and academic management platform for schools and training centers. It brings schedules, grades, absences, announcements, online courses, progress tracking, and role-based dashboards into one clean, secure system — with JWT auth, Google OAuth, a multilingual UI and full RTL Arabic support.',
    tags: ['Laravel 12', 'React 19', 'JWT', 'Google OAuth', 'Multilingual'],
    link: 'https://github.com/youce-etalibi/LEARNOVA-APP.git',
    accent: '#6a5cff',
  },
  {
    title: 'Evolution',
    tagline: 'All-in-One Fitness Platform',
    period: 'May 2024',
    image: '/projects/evolution.jpg',
    desc: 'A complete fitness web app: build personalized workouts and track your progress over time, a calories calculator that computes daily needs from your goals, age, weight, height and activity level, and an integrated store for clothes, supplements and equipment.',
    tags: ['Laravel', 'React.js', 'E-commerce'],
    link: 'https://github.com/youce-etalibi/EvoApp',
    accent: '#ff5c9d',
  },
  {
    title: 'TOUIL DIGICOM',
    tagline: 'Official Company Website',
    period: 'Apr 2024 – May 2024',
    image: '/projects/touil_digicom.png',
    desc: "Led the creation of the company's official website from concept to execution — a dynamic platform with a captivating landing page and a seamless training-booking system, backed by a user-friendly admin dashboard reflecting the company's vision and an improved user experience.",
    tags: ['Landing Page', 'Booking System', 'Admin Dashboard'],
    link: 'https://touildigicom.ma/',
    accent: '#ff9a5c',
  },
]

/* ---- Private / confidential company projects (under NDA) --------------- */
const PRIVATE = [
  { title: 'Internal Automation Suite', icon: 'solar:settings-bold-duotone' },
  { title: 'Marketing Analytics Dashboard', icon: 'solar:chart-2-bold-duotone' },
  { title: 'Lead Management System', icon: 'solar:users-group-rounded-bold-duotone' },
  { title: 'Email Campaign Engine', icon: 'solar:letter-bold-duotone' },
  { title: 'CRM Integration Tools', icon: 'solar:link-circle-bold-duotone' },
  { title: 'Workflow Automation Bots', icon: 'solar:magic-stick-3-bold-duotone' },
  { title: 'Reporting & BI Platform', icon: 'solar:pie-chart-2-bold-duotone' },
  { title: 'Data Pipeline Services', icon: 'solar:database-bold-duotone' },
  { title: 'Client Onboarding Portal', icon: 'solar:user-plus-bold-duotone' },
  { title: 'API Integration Hub', icon: 'solar:cloud-bold-duotone' },
]

/* ---- Framer variants (page + hovers) ---------------------------------- */
const page = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProjectsPanel({ onClose }) {
  const scope = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  /* GSAP staggered reveal of headings + cards */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pj-anim', {
        y: 46,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.25,
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      className="pj-page"
      ref={scope}
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      role="region"
      aria-label="Projects by Youssef Talibi"
    >
      <button className="pj-back" onClick={onClose} aria-label="Back">
        <Icon icon="solar:arrow-left-linear" />
        <span>Back</span>
      </button>

      <h2 className="pj-title pj-anim">Projects</h2>
      <p className="pj-sub pj-anim">A catalogue of things I've designed &amp; built</p>

      {/* ===== Featured ===== */}
      <div className="pj-grid">
        {FEATURED.map((p) => (
          <motion.article
            className="pj-card pj-anim"
            key={p.title}
            style={{ '--accent': p.accent }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <div className="pj-thumb">
              <img src={p.image} alt={p.title} loading="lazy" />
              <span className="pj-thumb__glow" aria-hidden="true" />
            </div>
            <div className="pj-body">
              <div className="pj-head">
                <h3>{p.title}</h3>
                <span className="pj-period">{p.period}</span>
              </div>
              <p className="pj-tagline">{p.tagline}</p>
              <p className="pj-desc">{p.desc}</p>
              <div className="pj-tags">
                {p.tags.map((t) => (
                  <span className="pj-tag" key={t}>{t}</span>
                ))}
              </div>
              <a className="pj-link" href={p.link} target="_blank" rel="noreferrer">
                <Icon
                  icon={
                    p.link.includes('github')
                      ? 'mdi:github'
                      : 'solar:link-round-angle-bold-duotone'
                  }
                />
                {p.link.includes('github') ? 'View on GitHub' : 'Visit website'}
                <Icon icon="solar:arrow-right-up-linear" className="pj-link__go" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      {/* ===== Private / NDA ===== */}
      <div className="pj-private-head pj-anim">
        <Icon icon="solar:lock-keyhole-bold-duotone" />
        <div>
          <strong>Confidential Work</strong>
          <span>
            10+ projects built at Cloud Marketing Hub (WMN) — private under company
            policy &amp; NDA.
          </span>
        </div>
      </div>

      <div className="pj-locked-grid">
        {PRIVATE.map((p) => (
          <motion.div
            className="pj-locked pj-anim"
            key={p.title}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            title="Private — under NDA"
          >
            <Icon icon={p.icon} className="pj-locked__icon" />
            <span className="pj-locked__title">{p.title}</span>
            <span className="pj-locked__badge">
              <Icon icon="solar:lock-keyhole-minimalistic-bold" />
              Private
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
