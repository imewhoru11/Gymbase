import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const feelingArrowsPlugin = {
  id: 'feelingArrows',
  afterDraw(chart) {
    const ctx = chart.ctx
    const dataset = chart.data.datasets[0]
    const rawData = dataset._rawData
    if (!rawData) return
    const meta = chart.getDatasetMeta(0)
    rawData.forEach((point, i) => {
      const el = meta.data[i]
      if (!el) return
      const { x, y } = el.getProps(['x', 'y'], true)

      // Draw order number on the dot
      if (point.position != null) {
        ctx.save()
        ctx.font = 'bold 9px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#fff'
        ctx.fillText(point.position, x, y)
        ctx.restore()
      }

      // Draw feeling arrow above/below dot
      if (point.feeling) {
        const isPlus = point.feeling === '+'
        ctx.save()
        ctx.font = 'bold 11px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = isPlus ? '#27ae60' : '#e74c3c'
        ctx.fillText(isPlus ? '▲' : '▼', x, isPlus ? y - 12 : y + 18)
        ctx.restore()
      }
    })
  },
}

export default function WeightChart({ data, color, noDataText = 'No data' }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">{noDataText}</div>
  }

  const chartData = {
    labels: data.map((d) => d.x),
    datasets: [
      {
        data: data.map((d) => d.y),
        _rawData: data,
        borderColor: color || '#4a9eff',
        backgroundColor: (color || '#4a9eff') + '22',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        fill: true,
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} kg`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#888', maxTicksLimit: 6 },
        grid: { color: '#2a2a2a' },
      },
      y: {
        ticks: { color: '#888', callback: (v) => `${v} kg` },
        grid: { color: '#2a2a2a' },
      },
    },
  }

  return (
    <div className="chart-wrapper">
      <Line data={chartData} options={options} plugins={[feelingArrowsPlugin]} />
    </div>
  )
}
