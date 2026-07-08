import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import './ContactPanel.css'

const CONTACTS = [
  {
    label: 'LinkedIn',
    value: 'youssef-talibi--fs',
    href: 'https://www.linkedin.com/in/youssef-talibi--fs/',
    icon: 'logos:linkedin-icon',
    accent: '#0a66c2',
  },
  {
    label: 'GitHub',
    value: 'youce-etalibi',
    href: 'https://github.com/youce-etalibi',
    icon: 'logos:github-icon',
    accent: '#24292f',
  },
  {
    label: 'Email',
    value: 'youssef.talibi11@gmail.com',
    href: 'mailto:youssef.talibi11@gmail.com',
    icon: 'logos:google-gmail',
    accent: '#ea4335',
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
      staggerChildren: 0.08,
      delayChildren: 0.14,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}
const item = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

export default function ContactPanel({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="ct-page"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      role="region"
      aria-label="Contact Youssef Talibi"
    >
      <button className="ct-back" onClick={onClose} aria-label="Back">
        <Icon icon="solar:arrow-left-linear" />
        <span>Back</span>
      </button>

      <motion.h2 className="ct-title" variants={item}>
        Let's Connect
      </motion.h2>
      <motion.p className="ct-sub" variants={item}>
        Reach out — I'm always open to a good conversation
      </motion.p>

      <div className="ct-list">
        {CONTACTS.map((c) => (
          <motion.a
            className="ct-card"
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            style={{ '--accent': c.accent }}
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <span className="ct-card__icon">
              <Icon icon={c.icon} />
            </span>
            <span className="ct-card__text">
              <strong>{c.label}</strong>
              <em>{c.value}</em>
            </span>
            <Icon icon="solar:arrow-right-up-linear" className="ct-card__go" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
