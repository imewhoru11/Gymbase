const SESSIONS_KEY = 'gymbase_sessions'
const RECENT_KEY = 'gymbase_recent_exercises'
const RECENT_MAX = 5

export function getRecentExercises(muscleGroup) {
  try {
    const all = JSON.parse(localStorage.getItem(RECENT_KEY) || '{}')
    return all[muscleGroup] || []
  } catch {
    return []
  }
}

export function recordRecentExercises(muscleGroup, exerciseNames) {
  try {
    const all = JSON.parse(localStorage.getItem(RECENT_KEY) || '{}')
    const existing = all[muscleGroup] || []
    // prepend new names, deduplicate, keep max RECENT_MAX
    const merged = [...exerciseNames, ...existing.filter(n => !exerciseNames.includes(n))]
    all[muscleGroup] = merged.slice(0, RECENT_MAX)
    localStorage.setItem(RECENT_KEY, JSON.stringify(all))
  } catch {
    // ignore
  }
}

export function getSessions() {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveSession(session) {
  const sessions = getSessions()
  const existing = sessions.findIndex(s => s.id === session.id)
  if (existing >= 0) {
    sessions[existing] = session
  } else {
    sessions.unshift(session)
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export function deleteSession(id) {
  const sessions = getSessions().filter(s => s.id !== id)
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export function getSessionById(id) {
  return getSessions().find(s => s.id === id) || null
}

export function makeSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function makeExerciseId() {
  return `ex_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function toKg(weight, unit) {
  return unit === 'lb' ? weight * 0.453592 : weight
}

export function calcSummary(session) {
  const topExercise = session.exercises.reduce(
    (best, ex) =>
      toKg(ex.weight, ex.unit) > toKg(best.weight, best.unit) ? ex : best,
    session.exercises[0] || { weight: 0, unit: 'kg', name: '' }
  )

  return {
    exerciseCount: session.exercises.length,
    topExercise,
  }
}

// days = null means all-time
export function getProgressData(sessions, exerciseName, days = null) {
  const cutoff = days !== null ? new Date() : null
  if (cutoff) cutoff.setDate(cutoff.getDate() - days)
  const dataByDate = {}

  sessions
    .filter((s) => !cutoff || new Date(s.date) >= cutoff)
    .forEach((session) => {
      const exercise = session.exercises.find((e) => e.name === exerciseName)
      if (!exercise || exercise.weight <= 0) return
      const weightKg = toKg(exercise.weight, exercise.unit)
      if (!dataByDate[session.date] || dataByDate[session.date].weightKg < weightKg) {
        dataByDate[session.date] = { weightKg, feeling: exercise.feeling ?? null, position: exercise.position ?? null }
      }
    })

  return Object.entries(dataByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { weightKg, feeling, position }]) => ({
      x: date,
      y: Math.round(weightKg * 100) / 100,
      feeling,
      position,
    }))
}

const CUSTOM_KEY = 'gymbase_custom_exercises'

export function exportJSON() {
  const data = {
    sessions: getSessions(),
    customExercises: JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]'),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `gymbase_backup_${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importJSON(jsonString) {
  const data = JSON.parse(jsonString)
  if (!Array.isArray(data.sessions)) throw new Error('Invalid backup file')
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(data.sessions))
  if (Array.isArray(data.customExercises)) {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(data.customExercises))
  }
  return data.sessions.length
}

export function getAllExerciseNames(sessions) {
  const byGroup = {}
  sessions.forEach((session) => {
    if (!byGroup[session.muscleGroup]) byGroup[session.muscleGroup] = new Set()
    session.exercises.forEach((ex) => byGroup[session.muscleGroup].add(ex.name))
  })
  return Object.fromEntries(
    Object.entries(byGroup).map(([g, set]) => [g, [...set]])
  )
}
