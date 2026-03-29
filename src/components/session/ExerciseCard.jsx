import ExerciseSelect from './ExerciseSelect'

export default function ExerciseCard({ exercise, muscleGroup, onChange, onRemove, position }) {
  const feeling = exercise.feeling ?? null

  function setFeeling(val) {
    onChange({ ...exercise, feeling: feeling === val ? null : val })
  }

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <span className="exercise-position">#{position}</span>
        <ExerciseSelect
          muscleGroup={muscleGroup}
          value={exercise.name}
          onChange={(name) => onChange({ ...exercise, name })}
        />
        <button type="button" className="btn-remove-exercise" onClick={onRemove} title="Remove">
          ✕
        </button>
      </div>

      <div className="weight-row">
        <input
          type="number"
          className="set-input weight-input"
          placeholder="Weight"
          min="0"
          step="0.5"
          value={exercise.weight === 0 ? '' : exercise.weight}
          onChange={(e) => onChange({ ...exercise, weight: parseFloat(e.target.value) || 0 })}
        />
        <div className="unit-toggle">
          <button
            type="button"
            className={`unit-btn${exercise.unit === 'kg' ? ' active' : ''}`}
            onClick={() => onChange({ ...exercise, unit: 'kg' })}
          >
            kg
          </button>
          <button
            type="button"
            className={`unit-btn${exercise.unit === 'lb' ? ' active' : ''}`}
            onClick={() => onChange({ ...exercise, unit: 'lb' })}
          >
            lb
          </button>
        </div>
        <div className="feeling-toggle">
          <button
            type="button"
            className={`feeling-btn feeling-btn--minus${feeling === '-' ? ' active' : ''}`}
            onClick={() => setFeeling('-')}
            title="Heavy / struggled"
          >
            ▼
          </button>
          <button
            type="button"
            className={`feeling-btn feeling-btn--plus${feeling === '+' ? ' active' : ''}`}
            onClick={() => setFeeling('+')}
            title="Light / had more in the tank"
          >
            ▲
          </button>
        </div>
      </div>
    </div>
  )
}
