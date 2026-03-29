import { createContext, useContext, useState, useEffect } from 'react'
import { translations, MUSCLE_GROUP_LABELS, CATEGORY_LABELS } from '../i18n/translations'
import { EXERCISE_ZH } from '../data/exerciseLibrary'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('gymbase_theme') || 'dark')
  const [lang, setLang]   = useState(() => localStorage.getItem('gymbase_lang')  || 'zh')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('gymbase_theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('gymbase_lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleLang  = () => setLang(l => l === 'zh' ? 'en' : 'zh')

  const t = translations[lang]

  function mgLabel(key) {
    return MUSCLE_GROUP_LABELS[key]?.[lang] ?? key
  }

  function catLabel(key) {
    return CATEGORY_LABELS[key]?.[lang] ?? key
  }

  // Display name for an exercise: zh name when lang=zh, English otherwise
  function exLabel(englishName) {
    if (lang === 'zh') return EXERCISE_ZH[englishName] ?? englishName
    return englishName
  }

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t, mgLabel, catLabel, exLabel }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
