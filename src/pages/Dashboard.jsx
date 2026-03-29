import { useNavigate, Link } from 'react-router-dom'
import { useSessions } from '../hooks/useSessions'
import { MUSCLE_GROUPS, MUSCLE_GROUP_COLORS } from '../data/exerciseLibrary'
import { useSettings } from '../contexts/SettingsContext'
import { getTodayCST } from '../utils/date'

export default function Dashboard() {
  const navigate = useNavigate()
  const { sessions } = useSessions()
  const { t, mgLabel } = useSettings()
  const recent = sessions.slice(0, 5)
  const today = getTodayCST()

  return (
    <div className="page">
      <div className="dashboard-header">
        <h1>GymBase</h1>
        <span className="today-date">{today}</span>
      </div>

      <div className="mg-grid">
        {MUSCLE_GROUPS.map((group) => {
          const color = MUSCLE_GROUP_COLORS[group]
          const lastSession = sessions.find((s) => s.muscleGroup === group)
          return (
            <button
              key={group}
              className="mg-start-btn"
              style={{ '--mg-color': color }}
              onClick={() => navigate(`/session/new?group=${group}`)}
            >
              <span className="mg-start-name">{mgLabel(group)}</span>
              {lastSession && (
                <span className="mg-start-last">{lastSession.date}</span>
              )}
            </button>
          )
        })}
      </div>

      {recent.length > 0 && (
        <div className="recent-section">
          <h3>{t.dashboard.recent}</h3>
          {recent.map((session) => {
            const color = MUSCLE_GROUP_COLORS[session.muscleGroup]
            return (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-card-left">
                  <span className="mg-badge" style={{ '--mg-color': color }}>{mgLabel(session.muscleGroup)}</span>
                  <span className="session-card-date">{session.date}</span>
                </div>
                <div className="session-card-mid">
                  <span>{session.exercises.length} {t.dashboard.exercises}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
