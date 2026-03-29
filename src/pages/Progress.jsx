import { useState, useMemo } from 'react'
import { useSessions } from '../hooks/useSessions'
import { getProgressData, toKg } from '../store/localStorage'
import { MUSCLE_GROUPS, MUSCLE_GROUP_COLORS, EXERCISE_LIBRARY } from '../data/exerciseLibrary'
import WeightChart from '../components/progress/WeightChart'
import { useSettings } from '../contexts/SettingsContext'

const RANGES = [
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
  { label: 'All', days: null },
]

export default function Progress() {
  const { sessions } = useSessions()
  const { t, mgLabel, exLabel } = useSettings()
  const [muscleGroup, setMuscleGroup] = useState(MUSCLE_GROUPS[0])
  const [exercise, setExercise] = useState('')
  const [range, setRange] = useState(null)

  const exerciseOptions = useMemo(() => {
    const libraryNames = Object.values(EXERCISE_LIBRARY[muscleGroup] || {}).flat()
    const loggedNames = sessions
      .filter((s) => s.muscleGroup === muscleGroup)
      .flatMap((s) => s.exercises.map((e) => e.name))
    return [...new Set([...libraryNames, ...loggedNames])]
  }, [muscleGroup, sessions])

  const progressData = useMemo(() => {
    if (!exercise) return []
    return getProgressData(sessions, exercise, range)
  }, [sessions, exercise, range])

  const pr = useMemo(() => {
    if (!exercise) return null
    let maxKg = null
    let maxEntry = null
    sessions.forEach((s) => {
      const ex = s.exercises.find((e) => e.name === exercise)
      if (!ex || ex.weight <= 0) return
      const kg = toKg(ex.weight, ex.unit)
      if (maxKg === null || kg > maxKg) {
        maxKg = kg
        maxEntry = { weight: ex.weight, unit: ex.unit, date: s.date }
      }
    })
    return maxEntry
  }, [sessions, exercise])

  const color = MUSCLE_GROUP_COLORS[muscleGroup]

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t.progress.title}</h1>
      </div>

      <div className="filter-tabs">
        {MUSCLE_GROUPS.map((group) => (
          <button
            key={group}
            className={`filter-tab${muscleGroup === group ? ' active' : ''}`}
            style={{ '--mg-color': MUSCLE_GROUP_COLORS[group] }}
            onClick={() => { setMuscleGroup(group); setExercise('') }}
          >
            {mgLabel(group)}
          </button>
        ))}
      </div>

      <select
        className="exercise-select"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      >
        <option value="">{t.progress.selectExercise}</option>
        {exerciseOptions.map((ex) => (
          <option key={ex} value={ex}>{exLabel(ex)}</option>
        ))}
      </select>

      {pr && (
        <div className="pr-badge" style={{ '--mg-color': color }}>
          <span className="pr-label">PR</span>
          <span className="pr-weight">{pr.weight} {pr.unit}</span>
          <span className="pr-date">{pr.date}</span>
        </div>
      )}

      {exercise && (
        <div className="range-tabs">
          {RANGES.map((r) => (
            <button
              key={r.label}
              className={`range-tab${range === r.days ? ' active' : ''}`}
              onClick={() => setRange(r.days)}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      <WeightChart data={progressData} color={color} noDataText={t.progress.noData} />
    </div>
  )
}
