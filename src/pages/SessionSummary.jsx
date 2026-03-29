import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSessionById, calcSummary } from '../store/localStorage'
import { MUSCLE_GROUP_COLORS } from '../data/exerciseLibrary'
import { useSettings } from '../contexts/SettingsContext'

export default function SessionSummary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, mgLabel, exLabel } = useSettings()
  const session = getSessionById(id)

  if (!session) {
    return <div className="page"><p>Session not found.</p></div>
  }

  const summary = calcSummary(session)
  const color = MUSCLE_GROUP_COLORS[session.muscleGroup]

  return (
    <div className="page">
      <div className="summary-header" style={{ '--mg-color': color }}>
        <div className="summary-tag" />
        <h1>{t.summary.complete}</h1>
        <p className="summary-date">{session.date} · {mgLabel(session.muscleGroup)}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{summary.exerciseCount}</span>
          <span className="stat-label">{t.summary.exercises}</span>
        </div>
        {summary.topExercise && (
          <div className="stat-card stat-card--highlight">
            <span className="stat-value">{summary.topExercise.weight} {summary.topExercise.unit}</span>
            <span className="stat-label">{t.summary.heaviest}</span>
            <span className="stat-sub">{exLabel(summary.topExercise.name)}</span>
          </div>
        )}
      </div>

      <div className="summary-breakdown">
        <h3>{t.summary.allExercises}</h3>
        {session.exercises.map((ex) => (
          <div key={ex.id} className="best-set-row">
            <span className="best-set-name">{exLabel(ex.name)}</span>
            <span className="best-set-data">{ex.weight} {ex.unit}</span>
          </div>
        ))}
      </div>

      <div className="summary-actions">
        <button className="btn-primary" onClick={() => navigate('/')}>
          {t.summary.done}
        </button>
        <Link className="btn-ghost" to={`/session/${id}`}>
          {t.summary.viewDetail}
        </Link>
      </div>
    </div>
  )
}
