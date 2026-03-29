import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SettingsProvider } from './contexts/SettingsContext'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import NewSession from './pages/NewSession'
import SessionSummary from './pages/SessionSummary'
import SessionDetail from './pages/SessionDetail'
import History from './pages/History'
import Progress from './pages/Progress'
import Library from './pages/Library'

export default function App() {
  return (
    <SettingsProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session/new" element={<NewSession />} />
          <Route path="/session/:id/summary" element={<SessionSummary />} />
          <Route path="/session/:id" element={<SessionDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </SettingsProvider>
  )
}
