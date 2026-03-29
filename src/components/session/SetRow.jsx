export default function SetRow({ set, onChange, onRemove, isOnly }) {
  return (
    <div className="set-row">
      <span className="set-num">{set.setNumber}</span>
      <input
        type="number"
        className="set-input weight-input"
        placeholder="kg"
        min="0"
        step="0.5"
        value={set.weight === 0 ? '' : set.weight}
        onChange={(e) => onChange({ ...set, weight: parseFloat(e.target.value) || 0 })}
      />
      {!isOnly && (
        <button type="button" className="btn-remove-set" onClick={onRemove} title="Remove set">
          ✕
        </button>
      )}
    </div>
  )
}
