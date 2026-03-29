import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import { useSettings } from '../../contexts/SettingsContext'

export default function AppShell() {
  const { theme, toggleTheme, lang, toggleLang } = useSettings()

  return (
    <div className="app-shell">
      <div className="top-controls">
        <button className="ctrl-btn" onClick={toggleLang} title="Switch language">
          {lang === 'zh' ? 'EN' : '中'}
        </button>
        <button className="ctrl-btn" onClick={toggleTheme} title="Switch theme">
          {theme === 'dark' ? '○' : '●'}
        </button>
      </div>
      <div className="page-content">
        <Outlet />
      </div>
      <NavBar />
    </div>
  )
}
