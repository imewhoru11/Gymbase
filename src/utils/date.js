// Returns today's date as YYYY-MM-DD in US Central Time (auto-handles DST)
export function getTodayCST() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
  }).format(new Date())
}
