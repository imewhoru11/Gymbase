import { MUSCLE_GROUPS, MUSCLE_GROUP_COLORS } from '../../data/exerciseLibrary'
import { useSettings } from '../../contexts/SettingsContext'

export default function MuscleGroupPicker({ value, onChange }) {
  const { mgLabel } = useSettings()

  return (
    <div className="muscle-group-picker">
      {MUSCLE_GROUPS.map((group) => (
        <button
          key={group}
          className={`mg-btn${value === group ? ' active' : ''}`}
          style={{ '--mg-color': MUSCLE_GROUP_COLORS[group] }}
          onClick={() => onChange(group)}
          type="button"
        >
          {mgLabel(group)}
        </button>
      ))}
    </div>
  )
}
