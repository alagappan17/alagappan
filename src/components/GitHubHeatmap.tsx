import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface GitHubHeatmapProps {
  theme: ThemeConfig
  username: string
}

// The graph renders at a fixed 1000x350; declaring it keeps the image from
// shifting layout when it arrives from the third-party host.
const GRAPH_WIDTH = 1000
const GRAPH_HEIGHT = 350

export function GitHubHeatmap({ theme, username }: GitHubHeatmapProps) {
  const isBrutalism = theme.id === 'brutalism'
  const heatmapUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${isBrutalism ? 'default' : 'github'}&hide_border=true&area=true`

  const image = (
    <motion.img
      src={heatmapUrl}
      alt="GitHub Activity Graph"
      width={GRAPH_WIDTH}
      height={GRAPH_HEIGHT}
      loading="lazy"
      decoding="async"
      className={`h-auto w-full rounded-lg ${
        isBrutalism ? 'border-[2px] border-black' : 'border border-white/40'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  )

  if (isBrutalism) {
    return (
      <div className="rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-6">
        <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
          GitHub Activity
        </h4>
        {image}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:rounded-2xl sm:p-6">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
        GitHub Activity
      </h4>
      {image}
    </div>
  )
}
