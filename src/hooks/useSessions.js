import { useState, useEffect, useCallback } from 'react'
import { getSessions, saveSession as persist, deleteSession as remove } from '../store/localStorage'

export function useSessions() {
  const [sessions, setSessions] = useState(() => getSessions())

  const reload = useCallback(() => setSessions(getSessions()), [])

  useEffect(() => {
    window.addEventListener('gymbase:sessions-updated', reload)
    return () => window.removeEventListener('gymbase:sessions-updated', reload)
  }, [reload])

  const saveSession = useCallback((session) => {
    persist(session)
    window.dispatchEvent(new Event('gymbase:sessions-updated'))
  }, [])

  const deleteSession = useCallback((id) => {
    remove(id)
    window.dispatchEvent(new Event('gymbase:sessions-updated'))
  }, [])

  return { sessions, saveSession, deleteSession, reload }
}
