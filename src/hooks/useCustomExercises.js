import { useState, useEffect, useCallback } from 'react'
import {
  getCustomExercises,
  addCustomExercise as add,
  removeCustomExercise as remove,
} from '../store/customExercises'

export function useCustomExercises() {
  const [customs, setCustoms] = useState(() => getCustomExercises())

  const reload = useCallback(() => setCustoms(getCustomExercises()), [])

  useEffect(() => {
    window.addEventListener('gymbase:custom-exercises-updated', reload)
    return () => window.removeEventListener('gymbase:custom-exercises-updated', reload)
  }, [reload])

  const addCustomExercise = useCallback((entry) => {
    add(entry)
  }, [])

  const removeCustomExercise = useCallback((id) => {
    remove(id)
  }, [])

  return { customs, addCustomExercise, removeCustomExercise }
}
