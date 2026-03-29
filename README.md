# Gymbase

A personal gym workout tracking app built with React. Logs strength training sessions by muscle group, tracks weight progression over time, and visualizes progress with charts.

## Features

- **Session logging** — Record workouts by muscle group (Chest, Shoulder, Back, Legs, Arms, Abs) with exercises, weights, and subjective feeling (+/-)
- **Progress charts** — Weight progression per exercise with PR tracking and time range filters (1M / 3M / 1Y / All)
- **Exercise library** — 70+ built-in exercises organized by equipment type; add custom exercises
- **History & export** — Browse past sessions, export to Excel (XLSX), or backup/restore as JSON
- **Dashboard** — Quick-start by muscle group with last-session dates and recent session preview
- **Dark/light theme** and Chinese/English language toggle

All data is stored locally in the browser (localStorage). No backend, no account required.

## Tech Stack

- React 18 + React Router v6
- Vite
- Chart.js / react-chartjs-2
- xlsx (Excel export)
- Plain CSS with CSS variables

## Getting Started

```bash
npm install
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Data Model

Each session stores:
- Date, muscle group
- List of exercises: name, weight, unit (kg/lb), feeling (+/-)

Storage keys: `gymbase_sessions`, `gymbase_custom_exercises`, `gymbase_theme`, `gymbase_lang`

## Project Structure

```
src/
├── pages/        # Dashboard, NewSession, SessionDetail, Progress, History, Library
├── components/   # Layout, session inputs, progress chart
├── hooks/        # useSessions (CRUD + event sync), useCustomExercises
├── store/        # localStorage read/write
├── data/         # Exercise library (70+ exercises)
├── utils/        # Date formatting, Excel export
└── i18n/         # Chinese / English translations
```
