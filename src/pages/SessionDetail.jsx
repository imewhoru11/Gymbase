import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSessionById } from '../store/localStorage'
import { MUSCLE_GROUP_COLORS } from '../data/exerciseLibrary'
import { useSettings } from '../contexts/SettingsContext'

export default function SessionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, mgLabel, exLabel } = useSettings()
  const session = getSessionById(id)

  if (!session) {
    return <div className="page"><p>Session not found.</p></div>
  }

  const color = MUSCLE_GROUP_COLORS[session.muscleGroup]

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/history" className="btn-back">{t.detail.back}</Link>
        <span className="mg-badge" style={{ '--mg-color': color }}>{mgLabel(session.muscleGroup)}</span>
        <span className="session-date">{session.date}</span>
      </div>

      <div className="exercises-list">
        {session.exercises.map((ex) => (
          <div key={ex.id} className="exercise-card exercise-card--readonly">
            <div className="exercise-card-header">
              <span className="exercise-position">#{ex.position}</span>
              <span className="exercise-name-static">{exLabel(ex.name)}</span>
              <span className="exercise-weight-static">{ex.weight} {ex.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="btn-template" onClick={() => navigate(`/session/new?group=${session.muscleGroup}&template=${id}`)}>
        {t.detail.useTemplate}
      </button>
    </div>
  )
}
