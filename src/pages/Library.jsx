import { useState } from 'react'
import { MUSCLE_GROUPS, MUSCLE_GROUP_COLORS, EXERCISE_LIBRARY } from '../data/exerciseLibrary'
import { useCustomExercises } from '../hooks/useCustomExercises'
import { useSettings } from '../contexts/SettingsContext'

const CATEGORIES = ['Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Other']

function AddRow({ muscleGroup, onAdd, t, catLabel }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Barbell')

  function handleAdd() {
    if (!name.trim()) return
    onAdd({ muscleGroup, category, name })
    setName('')
  }

  return (
    <tr className="lib-add-row">
      <td>
        <select
          className="lib-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{catLabel(c)}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          className="lib-input"
          type="text"
          placeholder={t.library.exerciseName}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
      </td>
      <td>
        <button
          className="lib-add-btn"
          onClick={handleAdd}
          disabled={!name.trim()}
        >
          {t.library.add}
        </button>
      </td>
    </tr>
  )
}

export default function Library() {
  const { customs, addCustomExercise, removeCustomExercise } = useCustomExercises()
  const { t, mgLabel, catLabel, exLabel } = useSettings()

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t.library.title}</h1>
      </div>

      {MUSCLE_GROUPS.map(group => {
        const color = MUSCLE_GROUP_COLORS[group]
        const builtIn = EXERCISE_LIBRARY[group] || {}
        const groupCustoms = customs.filter(c => c.muscleGroup === group)

        // Merge: built-in by category, then custom by category
        const allByCategory = {}
        Object.entries(builtIn).forEach(([cat, exercises]) => {
          allByCategory[cat] = exercises.map(name => ({ name, isCustom: false }))
        })
        groupCustoms.forEach(c => {
          if (!allByCategory[c.category]) allByCategory[c.category] = []
          allByCategory[c.category].push({ name: c.name, isCustom: true, id: c.id })
        })

        const totalCount = Object.values(allByCategory).reduce((s, arr) => s + arr.length, 0)

        return (
          <section key={group} className="lib-section">
            <div className="lib-section-header" style={{ '--mg-color': color }}>
              <span className="lib-section-name">{mgLabel(group)}</span>
              <span className="lib-section-count">{totalCount}</span>
            </div>

            <table className="lib-table">
              <thead>
                <tr>
                  <th>{t.library.category}</th>
                  <th>{t.library.exercise}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(allByCategory).map(([cat, exercises]) =>
                  exercises.map((ex, i) => (
                    <tr key={ex.name + i} className={ex.isCustom ? 'lib-row lib-row--custom' : 'lib-row'}>
                      <td className="lib-cell-cat">{i === 0 ? catLabel(cat) : ''}</td>
                      <td className="lib-cell-name">
                        {exLabel(ex.name)}
                        {ex.isCustom && <span className="lib-custom-tag">{t.library.custom}</span>}
                      </td>
                      <td className="lib-cell-action">
                        {ex.isCustom && (
                          <button
                            className="lib-remove-btn"
                            onClick={() => removeCustomExercise(ex.id)}
                            title={t.library.remove}
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
                <AddRow
                  muscleGroup={group}
                  onAdd={addCustomExercise}
                  t={t}
                  catLabel={catLabel}
                />
              </tbody>
            </table>
          </section>
        )
      })}
    </div>
  )
}
