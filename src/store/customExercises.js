const KEY = 'gymbase_custom_exercises'

// Stored as: [{ id, muscleGroup, category, name }]
export function getCustomExercises() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function addCustomExercise({ muscleGroup, category, name }) {
  const list = getCustomExercises()
  const entry = {
    id: `cex_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    muscleGroup,
    category,
    name: name.trim(),
  }
  localStorage.setItem(KEY, JSON.stringify([...list, entry]))
  window.dispatchEvent(new Event('gymbase:custom-exercises-updated'))
  return entry
}

export function removeCustomExercise(id) {
  const list = getCustomExercises().filter(e => e.id !== id)
  localStorage.setItem(KEY, JSON.stringify(list))
  window.dispatchEvent(new Event('gymbase:custom-exercises-updated'))
}
