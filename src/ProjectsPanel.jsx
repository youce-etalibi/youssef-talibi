import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import gsap from 'gsap'
import './ProjectsPanel.css'

const PUBLIC_PROJECTS = [
  {
    title: 'FinFlous',
    tagline: 'Personal Finance Manager',
    period: 'Jun 2026 - Jul 2026',
    image: '/projects/finflous.png',
    desc: 'An all-in-one personal finance app for tracking expenses, managing budgets, saving toward goals, and organizing household finances in one intuitive workspace.',
    tools: [
      { label: 'Supabase', icon: 'simple-icons:supabase' },
      { label: 'React 19', icon: 'simple-icons:react' },
      { label: 'JWT', icon: 'logos:jwt-icon' },
    ],
    link: 'https://finflous.vercel.app/',
    accent: '#148447',
  },
  {
    title: 'Learnova',
    tagline: 'Smart Learning & School Management',
    period: 'Jun 2026 - Jul 2026',
    image: '/projects/learnova.png',
    desc: 'A modern academic platform bringing schedules, grades, absences, announcements, courses, progress tracking, and role-based dashboards into one secure multilingual system.',
    tools: [
      { label: 'Laravel 12', icon: 'simple-icons:laravel' },
      { label: 'React 19', icon: 'simple-icons:react' },
      { label: 'Google OAuth', icon: 'flat-color-icons:google' },
    ],
    link: 'https://github.com/youce-etalibi/LEARNOVA-APP.git',
    accent: '#6a5cff',
  },
  {
    title: 'Evolution',
    tagline: 'All-in-One Fitness Platform',
    period: 'May 2024',
    image: '/projects/evolution.jpg',
    desc: 'A complete fitness platform for personalized workouts, progress tracking, daily calorie calculations, and shopping for clothing, supplements, and equipment.',
    tools: [
      { label: 'Laravel', icon: 'simple-icons:laravel' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'E-commerce', icon: 'solar:cart-large-2-bold-duotone' },
    ],
    link: 'https://github.com/youce-etalibi/EvoApp',
    accent: '#e84f8d',
  },
  {
    title: 'TOUIL DIGICOM',
    tagline: 'Company Website & Booking Platform',
    period: 'Apr 2024 - May 2024',
    image: '/projects/touil_digicom.png',
    desc: 'The company website, designed and delivered from concept to launch with a dynamic landing page, training booking flow, and an easy-to-use administration dashboard.',
    tools: [
      { label: 'Web Design', icon: 'solar:palette-bold-duotone' },
      { label: 'Booking', icon: 'solar:calendar-bold-duotone' },
      { label: 'Admin', icon: 'solar:shield-user-bold-duotone' },
    ],
    link: 'https://touildigicom.ma/',
    accent: '#ef7e3e',
  },
]

const COMPANY_PROJECTS = [
  {
    title: 'Scripto Buildo',
    tagline: 'No-Code Browser Automation Builder',
    image: '/projects/scripto_buildo.png',
    desc: 'A visual drag-and-drop platform for building browser automations with reusable actions, conditions, navigation, and script generation - no programming required.',
    tools: [
      { label: 'No-Code', icon: 'solar:widget-add-bold-duotone' },
      { label: 'Automation', icon: 'solar:magic-stick-3-bold-duotone' },
      { label: 'Workflows', icon: 'solar:branching-paths-down-bold-duotone' },
    ],
    accent: '#6d55e8',
  },
  {
    title: 'Summit',
    tagline: 'Resource & Revenue Performance',
    image: '/projects/summit.png',
    desc: 'A management platform for organizing resources, setting financial targets, tracking revenue goals, and evaluating performance across teams from one dashboard.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
    ],
    accent: '#4f6bff',
  },
  {
    title: 'Warmix Agent Executor',
    tagline: 'Distributed Automation Engine',
    image: '/projects/wamix_agent.png',
    desc: 'An execution agent that receives remote requests, launches browser automation across multiple environments, and reports task progress and execution status.',
    tools: [
      { label: 'Python', icon: 'simple-icons:python' },
      { label: 'Selenium', icon: 'simple-icons:selenium' },
      { label: 'Playwright', icon: 'simple-icons:playwright' },
    ],
    accent: '#3c7bdb',
  },
  {
    title: 'Maestro Box',
    tagline: 'Enterprise Employee Workspace',
    image: '/projects/maestrobox.png',
    desc: 'A unified workspace for employee profiles, meetings, workshops, training, breaks, organizational hierarchy, community activity, and the internal company portal.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
    ],
    accent: '#624ad8',
  },
  {
    title: 'Maestro Box Connect',
    tagline: 'Community, Chat & Control Panel',
    image: '/projects/mb_community_chat_control_panel.png',
    desc: 'One integrated app combining the employee community, organized team messaging, and centralized administration for users, roles, permissions, and application access.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { label: 'RBAC', icon: 'solar:shield-keyhole-bold-duotone' },
    ],
    accent: '#ec5d8f',
  },
  {
    title: 'Seedlytics',
    tagline: 'Email Account Management & Monitoring',
    image: '/projects/seedlytics.png',
    desc: 'A centralized platform that brings email accounts from multiple providers into one dashboard for status monitoring, activity tracking, and operational management.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
    ],
    accent: '#9a55d7',
  },
  {
    title: 'Warmix Local',
    tagline: 'Automated Email Warm-Up Executor',
    image: '/projects/wamix_local.png',
    desc: 'A reliable local execution environment that automates email warm-up scripts inside RDP sessions, reducing repetitive manual browser work.',
    tools: [
      { label: 'Python', icon: 'simple-icons:python' },
      { label: 'Selenium', icon: 'simple-icons:selenium' },
      { label: 'RDP', icon: 'solar:monitor-smartphone-bold-duotone' },
    ],
    accent: '#3479c9',
  },
  {
    title: 'Mailkit',
    tagline: 'Email Marketing Productivity Toolkit',
    image: '/projects/mailkit.png',
    desc: 'A collection of practical email marketing tools in one user-friendly workspace, built to automate repetitive operations and help production teams work faster.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
    ],
    accent: '#ef775c',
  },
  {
    title: 'Rampora',
    tagline: 'Browser-Based Warm-Up Automation',
    image: '/projects/rampora.png',
    desc: 'A centralized email warm-up platform using a custom browser extension to remotely launch, manage, and monitor automated tasks across multiple browsers.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { label: 'Extension', icon: 'solar:plug-circle-bold-duotone' },
    ],
    accent: '#e65d72',
  },
  {
    title: 'Spamurai',
    tagline: 'Email IP Monitoring & Spam Detection',
    image: '/projects/spamurai.png',
    desc: 'A monitoring system for tracking IP reputation, detecting inbox-to-spam changes, comparing fresh and old IP performance, and supporting better sending decisions.',
    tools: [
      { label: 'Go Fiber', icon: 'simple-icons:go' },
      { label: 'React', icon: 'simple-icons:react' },
      { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
    ],
    accent: '#db444f',
  },
]

const page = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

const thumbnailFor = (image) => image
  .replace('/projects/', '/projects/thumbs/')
  .replace(/\.(png|jpe?g)$/i, '.jpg')

function ProjectCard({ project, isPrivate = false, onPreview, priority = false }) {
  return (
    <motion.article className="pj-card pj-anim" style={{ '--accent': project.accent }} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <button className="pj-thumb" type="button" onClick={() => onPreview(project)} aria-label={`Open ${project.title} image in full screen`}>
        <img
          src={thumbnailFor(project.image)}
          alt={`${project.title} project preview`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          width="960"
          height="540"
          onLoad={(event) => event.currentTarget.classList.add('is-loaded')}
        />
        <span className="pj-thumb__glow" aria-hidden="true" />
        {isPrivate && <span className="pj-private-badge"><Icon icon="solar:lock-keyhole-minimalistic-bold" />Internal</span>}
        <span className="pj-zoom-hint"><Icon icon="solar:maximize-square-3-bold-duotone" />View image</span>
      </button>
      <div className="pj-body">
        <div className="pj-head">
          <h3>{project.title}</h3>
          {project.period && <span className="pj-period">{project.period}</span>}
        </div>
        <p className="pj-tagline">{project.tagline}</p>
        <p className="pj-desc">{project.desc}</p>
        <div className="pj-tools" aria-label="Tools and technologies">
          {project.tools.map((tool) => <span className="pj-tool" key={tool.label}><Icon icon={tool.icon} aria-hidden="true" />{tool.label}</span>)}
        </div>
        {project.link && (
          <a className="pj-link" href={project.link} target="_blank" rel="noreferrer">
            <Icon icon={project.link.includes('github') ? 'mdi:github' : 'solar:link-round-angle-bold-duotone'} />
            {project.link.includes('github') ? 'View on GitHub' : 'Visit website'}
            <Icon icon="solar:arrow-right-up-linear" className="pj-link__go" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function ProjectsPanel({ onClose }) {
  const scope = useRef(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      if (preview) setPreview(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, preview])

  useEffect(() => {
    if (!preview) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [preview])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pj-anim', { y: 40, opacity: 0, filter: 'blur(8px)', duration: 0.75, stagger: 0.055, ease: 'power3.out', delay: 0.18 })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <motion.div className="pj-page" ref={scope} variants={page} initial="hidden" animate="show" exit="exit" role="region" aria-label="Projects by Youssef Talibi">
      <button className="pj-back" type="button" onClick={onClose} aria-label="Back"><Icon icon="solar:arrow-left-linear" /><span>Back</span></button>
      <header className="pj-hero pj-anim">
        <span className="pj-eyebrow">Selected work</span>
        <h2 className="pj-title">Projects</h2>
        <p className="pj-sub">Products, platforms, and automation systems I have designed and built.</p>
      </header>
      <section className="pj-section pj-section--company" aria-labelledby="company-projects-title">
        <div className="pj-company-head pj-anim">
          <div className="pj-company-icon"><img src="/experience/cmh.jpg" alt="Cloud Marketing Hub logo" /></div>
          <div className="pj-company-copy">
            <span className="pj-section-kicker">Cloud Marketing Hub (WMN)</span>
            <h3 id="company-projects-title">Enterprise & internal products</h3>
            <p>Production tools built for real teams and operations. Product details are shared at a high level to respect company confidentiality.</p>
          </div>
          <span className="pj-count">{COMPANY_PROJECTS.length} projects</span>
        </div>
        <div className="pj-grid">{COMPANY_PROJECTS.map((project, index) => <ProjectCard project={project} key={project.title} isPrivate onPreview={setPreview} priority={index === 0} />)}</div>
      </section>
      <section className="pj-section" aria-labelledby="public-projects-title">
        <div className="pj-section-head pj-anim">
          <div><span className="pj-section-kicker">Public work</span><h3 id="public-projects-title">Featured projects</h3></div>
          <span className="pj-count">{PUBLIC_PROJECTS.length} projects</span>
        </div>
        <div className="pj-grid">{PUBLIC_PROJECTS.map((project) => <ProjectCard project={project} key={project.title} onPreview={setPreview} />)}</div>
      </section>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="pj-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => event.target === event.currentTarget && setPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} image preview`}
          >
            <motion.figure
              className="pj-lightbox__frame"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <button className="pj-lightbox__close" type="button" onClick={() => setPreview(null)} aria-label="Close image preview">
                <Icon icon="solar:close-circle-bold" />
              </button>
              <img src={preview.image} alt={`${preview.title} full project preview`} />
              <figcaption>
                <span>{preview.title}</span>
                <small>{preview.tagline}</small>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
