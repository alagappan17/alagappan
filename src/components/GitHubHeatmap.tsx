import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface GitHubHeatmapProps {
  theme: ThemeConfig
  username: string
}

export function GitHubHeatmap({ theme, username }: GitHubHeatmapProps) {
  const [heatmapUrl, setHeatmapUrl] = useState<string>('')
  const isBrutalism = theme.id === 'brutalism'

  useEffect(() => {
    // Using GitHub Readme Stats API for heatmap
    // Alternative: You can use your own backend to fetch GitHub contribution data
    const url = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${isBrutalism ? 'default' : 'github'}&hide_border=true&area=true`
    setHeatmapUrl(url)
  }, [username, isBrutalism])

  if (isBrutalism) {
    return (
      <div className="rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-6">
        <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
          GitHub Activity
        </h4>
        {heatmapUrl ? (
          <motion.img
            src={heatmapUrl}
            alt="GitHub Activity Graph"
            className="w-full rounded-lg border-[2px] border-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="flex h-32 items-center justify-center rounded-lg border-[2px] border-black bg-[#FFFBF3]">
            <p className="text-sm font-semibold text-[#111]">Loading...</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:rounded-2xl sm:p-6">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
        GitHub Activity
      </h4>
      {heatmapUrl ? (
        <motion.img
          src={heatmapUrl}
          alt="GitHub Activity Graph"
          className="w-full rounded-lg border border-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border border-white/40 bg-white/10">
          <p className="text-sm font-semibold text-slate-800">Loading...</p>
        </div>
      )}
    </div>
  )
}







