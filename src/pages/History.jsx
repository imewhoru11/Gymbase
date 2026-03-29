import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSessions } from '../hooks/useSessions'
import { MUSCLE_GROUPS, MUSCLE_GROUP_COLORS } from '../data/exerciseLibrary'
import { exportToExcel } from '../utils/exportExcel'
import { exportJSON, importJSON } from '../store/localStorage'
import { useSettings } from '../contexts/SettingsContext'

export default function History() {
  const { sessions, deleteSession, reload } = useSessions()
  const { t, mgLabel } = useSettings()
  const [filter, setFilter] = useState('All')
  const fileInputRef = useRef(null)

  const filtered = filter === 'All'
    ? sessions
    : sessions.filter((s) => s.muscleGroup === filter)

  function handleDelete(e, id) {
    e.preventDefault()
    if (confirm('Delete this session?')) deleteSession(id)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const count = importJSON(ev.target.result)
        window.dispatchEvent(new Event('gymbase:sessions-updated'))
        window.dispatchEvent(new Event('gymbase:custom-exercises-updated'))
        reload()
        alert(`✓ 已恢复 ${count} 条训练记录`)
      } catch {
        alert('文件格式错误，请选择正确的备份文件')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t.history.title}</h1>
        <div className="header-actions">
          <button
            className="btn-export"
            onClick={() => exportToExcel(sessions)}
            disabled={sessions.length === 0}
          >
            {t.history.export}
          </button>
          <button className="btn-export" onClick={exportJSON} disabled={sessions.length === 0}>
            {t.history.backup}
          </button>
          <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
          <button className="btn-export" onClick={() => fileInputRef.current.click()}>
            {t.history.restore}
          </button>
        </div>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab${filter === 'All' ? ' active' : ''}`}
          onClick={() => setFilter('All')}
        >
          {t.history.all}
        </button>
        {MUSCLE_GROUPS.map((group) => (
          <button
            key={group}
            className={`filter-tab${filter === group ? ' active' : ''}`}
            style={{ '--mg-color': MUSCLE_GROUP_COLORS[group] }}
            onClick={() => setFilter(group)}
          >
            {mgLabel(group)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">{t.history.empty}</p>
      ) : (
        <div className="session-list">
          {filtered.map((session) => {
            const color = MUSCLE_GROUP_COLORS[session.muscleGroup]
            return (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-card-left">
                  <span className="mg-badge" style={{ '--mg-color': color }}>{mgLabel(session.muscleGroup)}</span>
                  <span className="session-card-date">{session.date}</span>
                </div>
                <div className="session-card-mid">
                  <span>{session.exercises.length} {t.history.exercises}</span>
                </div>
                <button
                  className="btn-delete"
                  onClick={(e) => handleDelete(e, session.id)}
                >
                  ✕
                </button>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
