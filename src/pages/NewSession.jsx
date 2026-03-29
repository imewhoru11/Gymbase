import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MuscleGroupPicker from '../components/session/MuscleGroupPicker'
import ExerciseCard from '../components/session/ExerciseCard'
import { useSessions } from '../hooks/useSessions'
import { makeSessionId, makeExerciseId, recordRecentExercises } from '../store/localStorage'
import { MUSCLE_GROUPS, MUSCLE_GROUP_COLORS } from '../data/exerciseLibrary'
import { useSettings } from '../contexts/SettingsContext'
import { getTodayCST } from '../utils/date'

function makeBlankExercise(position) {
  return {
    id: makeExerciseId(),
    name: '',
    position,
    weight: 0,
    unit: 'kg',
    feeling: null,
  }
}

export default function NewSession() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { saveSession } = useSessions()
  const { t } = useSettings()

  const [muscleGroup, setMuscleGroup] = useState(searchParams.get('group') || MUSCLE_GROUPS[0])
  const [exercises, setExercises] = useState([makeBlankExercise(1)])
  const [date, setDate] = useState(getTodayCST())

  function updateExercise(index, updated) {
    setExercises(exercises.map((ex, i) => (i === index ? updated : ex)))
  }

  function addExercise() {
    setExercises([...exercises, makeBlankExercise(exercises.length + 1)])
  }

  function removeExercise(index) {
    setExercises(
      exercises
        .filter((_, i) => i !== index)
        .map((ex, i) => ({ ...ex, position: i + 1 }))
    )
  }

  function handleFinish() {
    const validExercises = exercises
      .filter((ex) => ex.name.trim() && ex.weight > 0)
      .map((ex, i) => ({ ...ex, position: i + 1 }))

    if (!validExercises.length) return

    const session = {
      id: makeSessionId(),
      date,
      muscleGroup,
      exercises: validExercises,
    }

    saveSession(session)
    recordRecentExercises(muscleGroup, validExercises.map(e => e.name))
    navigate(`/session/${session.id}/summary`)
  }

  const color = MUSCLE_GROUP_COLORS[muscleGroup]
  const canFinish = exercises.some((ex) => ex.name.trim() && ex.weight > 0)

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t.session.title}</h1>
        <input
          type="date"
          className="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <MuscleGroupPicker value={muscleGroup} onChange={setMuscleGroup} />

      <div className="exercises-list">
        {exercises.map((ex, i) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            muscleGroup={muscleGroup}
            position={i + 1}
            onChange={(updated) => updateExercise(i, updated)}
            onRemove={() => removeExercise(i)}
          />
        ))}
      </div>

      <button type="button" className="btn-add-exercise" onClick={addExercise}>
        {t.session.addExercise}
      </button>

      <div className="finish-bar">
        <button
          type="button"
          className="btn-finish"
          style={{ '--mg-color': color }}
          onClick={handleFinish}
          disabled={!canFinish}
        >
          {t.session.finish}
        </button>
      </div>
    </div>
  )
}
