import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Setting2, Logout } from 'iconsax-react'
import './ProfileMenu.css'

interface ProfileMenuProps {
  name?: string
  email?: string
}

/**
 * Learner-sidebar profile card. Hovers to `--input-background-hover` and opens
 * a small menu (currently just "Log out", which restarts the onboarding flow).
 */
export default function ProfileMenu({
  name = 'Anthonny Wallace',
  email = 'anthonny@email.com',
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="mt-side__profile-wrap" ref={ref}>
      {open && (
        <div className="profile-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            className="profile-menu__item"
            onClick={() => {
              setOpen(false)
              navigate('/onboarding')
            }}
          >
            <Logout size={18} color="var(--text-secondary)" variant="Linear" />
            <span>Log out</span>
          </button>
        </div>
      )}
      <button
        type="button"
        className="mt-side__profile"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="mt-side__profile-info">
          <p className="mt-side__profile-name">{name}</p>
          <p className="mt-side__profile-email">{email}</p>
        </div>
        <Setting2 size={16} color="var(--text-secondary)" variant="Linear" />
      </button>
    </div>
  )
}
