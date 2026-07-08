import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import FluidCursor from './FluidCursor.jsx'
import MePanel from './MePanel.jsx'
import './App.css'

/* Avatar images cycled in an infinite crossfade loop */
const AVATAR_IMAGES = ['/3D_face.png', '/img1.png', '/img2.png', '/img3.png']
const AVATAR_INTERVAL = 3000 // ms each image stays before switching

function LoopingAvatar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % AVATAR_IMAGES.length),
      AVATAR_INTERVAL
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="avatar">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={AVATAR_IMAGES[index]}
          src={AVATAR_IMAGES[index]}
          alt="3D avatar"
          className="avatar__img"
          initial={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="avatar__glow" aria-hidden="true" />
    </div>
  )
}

/* Solar "bold-duotone" icons — soft, filled, iOS 26 style */
const NAV_ITEMS = [
  { label: 'Me', icon: 'solar:user-rounded-bold-duotone' },
  { label: 'Projects', icon: 'solar:widget-2-bold-duotone' },
  { label: 'Experience', icon: 'solar:case-minimalistic-bold-duotone' },
  { label: 'Skills', icon: 'solar:bolt-bold-duotone' },
  { label: 'Contact', icon: 'solar:chat-round-dots-bold-duotone' },
]

const hero = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    filter: 'blur(10px)',
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function App() {
  const [openSection, setOpenSection] = useState(null)

  return (
    <div className="stage">
      {/* Interactive WebGL fluid that follows the cursor */}
      <FluidCursor />

      {/* Foreground — hero and section panels swap in the same centre spot.
          pointer-events pass through to the fluid; interactive bits opt in. */}
      <div className="overlay">
        <AnimatePresence mode="wait">
          {openSection === 'Me' ? (
            <MePanel key="me" onClose={() => setOpenSection(null)} />
          ) : (
            <motion.div
              key="hero"
              className="hero"
              variants={hero}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <header className="greeting">
                <h1 className="greeting__hello">Hello</h1>
                <p className="greeting__welcome">Welcome to my world</p>
              </header>

              <LoopingAvatar />

              <nav className="glass-nav">
                {NAV_ITEMS.map(({ label, icon }) => (
                  <button
                    key={label}
                    className="glass-pill"
                    type="button"
                    onClick={() => setOpenSection(label)}
                  >
                    <Icon
                      icon={icon}
                      className="glass-pill__icon"
                      aria-hidden="true"
                    />
                    <span className="glass-pill__label">{label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
