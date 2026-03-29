import * as XLSX from 'xlsx'

export function exportToExcel(sessions) {
  if (!sessions.length) return

  // Flatten all sessions into rows
  const rows = []
  sessions
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((session) => {
      session.exercises.forEach((ex) => {
        rows.push({
          Date: session.date,
          'Muscle Group': session.muscleGroup,
          'Order': ex.position,
          Exercise: ex.name,
          Weight: ex.weight,
          Unit: ex.unit,
        })
      })
    })

  const ws = XLSX.utils.json_to_sheet(rows)

  // Column widths
  ws['!cols'] = [
    { wch: 12 }, // Date
    { wch: 14 }, // Muscle Group
    { wch: 7 },  // Order
    { wch: 28 }, // Exercise
    { wch: 8 },  // Weight
    { wch: 6 },  // Unit
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Workouts')

  const today = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(wb, `gymbase_${today}.xlsx`)
}
