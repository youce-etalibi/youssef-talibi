import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import FluidCursor from './FluidCursor.jsx'
import MePanel from './MePanel.jsx'
import './App.css'

/* Solar "bold-duotone" icons — soft, filled, iOS 26 style */
const NAV_ITEMS = [
  { label: 'Me', icon: 'solar:user-rounded-bold-duotone' },
  { label: 'Projects', icon: 'solar:widget-2-bold-duotone' },
  { label: 'Experience', icon: 'solar:case-minimalistic-bold-duotone' },
  { label: 'Skills', icon: 'solar:bolt-bold-duotone' },
  { label: 'Contact', icon: 'solar:chat-round-dots-bold-duotone' },
]

export default function App() {
  const [openSection, setOpenSection] = useState(null)

  return (
    <div className="stage">
      {/* Interactive WebGL fluid that follows the cursor */}
      <FluidCursor />

      {/* Foreground hero — pointer-events pass through to the fluid,
          only the buttons capture clicks */}
      <div className="overlay">
        <header className="greeting">
          <h1 className="greeting__hello">Hello</h1>
          <p className="greeting__welcome">Welcome to my world</p>
        </header>

        <div className="avatar">
          <img src="/3D_face.png" alt="3D avatar" className="avatar__img" />
          <div className="avatar__glow" aria-hidden="true" />
        </div>

        <nav className="glass-nav">
          {NAV_ITEMS.map(({ label, icon }) => (
            <button
              key={label}
              className="glass-pill"
              type="button"
              onClick={() => setOpenSection(label)}
            >
              <Icon icon={icon} className="glass-pill__icon" aria-hidden="true" />
              <span className="glass-pill__label">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {openSection === 'Me' && (
          <MePanel onClose={() => setOpenSection(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
