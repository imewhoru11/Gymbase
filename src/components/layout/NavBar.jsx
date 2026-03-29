import { NavLink } from 'react-router-dom'
import { useSettings } from '../../contexts/SettingsContext'

export default function NavBar() {
  const { t } = useSettings()

  const links = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/session/new', label: t.nav.log },
    { to: '/history', label: t.nav.history },
    { to: '/progress', label: t.nav.progress },
  ]

  return (
    <nav className="navbar">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
