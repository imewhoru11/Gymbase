import { useState } from 'react'
import { EXERCISE_LIBRARY } from '../../data/exerciseLibrary'
import { useSettings } from '../../contexts/SettingsContext'
import { useCustomExercises } from '../../hooks/useCustomExercises'
import { getRecentExercises } from '../../store/localStorage'

export default function ExerciseSelect({ muscleGroup, value, onChange }) {
  const { t, catLabel, exLabel } = useSettings()
  const { customs } = useCustomExercises()
  const [freeText, setFreeText] = useState(false)
  const [freeVal, setFreeVal] = useState('')

  const library = EXERCISE_LIBRARY[muscleGroup] || {}
  const recent = getRecentExercises(muscleGroup)

  // Merge custom exercises into library by category
  const merged = { ...library }
  customs
    .filter(c => c.muscleGroup === muscleGroup)
    .forEach(c => {
      if (!merged[c.category]) merged[c.category] = []
      if (!merged[c.category].includes(c.name)) {
        merged[c.category] = [...merged[c.category], c.name]
      }
    })

  function handleSelect(e) {
    if (e.target.value === '__freetext__') {
      setFreeText(true)
      onChange('')
    } else {
      onChange(e.target.value)
    }
  }

  if (freeText) {
    return (
      <div className="exercise-select-row">
        <input
          className="exercise-custom-input"
          type="text"
          placeholder={t.session.exercisePlaceholder}
          value={freeVal}
          onChange={e => { setFreeVal(e.target.value); onChange(e.target.value) }}
          autoFocus
        />
        <button
          type="button"
          className="btn-ghost"
          onClick={() => { setFreeText(false); onChange('') }}
        >
          {t.session.libraryBack}
        </button>
      </div>
    )
  }

  return (
    <select className="exercise-select" value={value || ''} onChange={handleSelect}>
      <option value="" disabled>{t.session.selectExercise}</option>
      {recent.length > 0 && (
        <optgroup label={t.session.recent}>
          {recent.map((ex) => (
            <option key={`recent-${ex}`} value={ex}>{exLabel(ex)}</option>
          ))}
        </optgroup>
      )}
      {Object.entries(merged).map(([category, exercises]) => (
        <optgroup key={category} label={catLabel(category)}>
          {exercises.map((ex) => (
            <option key={ex} value={ex}>{exLabel(ex)}</option>
          ))}
        </optgroup>
      ))}
      <option value="__freetext__">{t.session.custom}</option>
    </select>
  )
}
