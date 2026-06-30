import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import {
  getRunsLast90Days,
  getRecentRunsForDisplay,
  findBestRun,
  formatDistance,
  formatRelativeDate,
  formatPace,
  formatDuration,
  type StravaActivity,
} from '../utils/strava'

interface StravaInteractiveProps {
  theme: ThemeConfig
}

export function StravaInteractive({ theme }: StravaInteractiveProps) {
  const isBrutalism = theme.id === 'brutalism'
  const [isLoading, setIsLoading] = useState(true)
  const [runs90d, setRuns90d] = useState<StravaActivity[]>([])
  const [recentRuns, setRecentRuns] = useState<StravaActivity[]>([])

  // Hover states
  const [hoverRun, setHoverRun] = useState(false)

  // We want a slight delay before closing to avoid flickering
  const runTimerRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setIsLoading(true)
      // Two targeted fetches in parallel — 90-day runs for stats/scoring,
      // and a small recent-runs fetch for the display cards
      const [ninetyDay, recent] = await Promise.all([
        getRunsLast90Days(),
        getRecentRunsForDisplay(4),
      ])
      if (cancelled) return
      setRuns90d(ninetyDay)
      setRecentRuns(recent)
      setIsLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleMouseEnterRun = () => {
    if (runTimerRef.current) clearTimeout(runTimerRef.current)
    setHoverRun(true)
  }
  const handleMouseLeaveRun = () => {
    runTimerRef.current = setTimeout(() => setHoverRun(false), 200)
  }

  // Calculations — 90-day total comes directly from API-filtered runs
  const totalKm90d = runs90d.reduce((acc, r) => acc + r.distance, 0)

  // Best run: longest distance, tiebreaker = faster pace
  const bestRun: StravaActivity | null = findBestRun(runs90d)

  if (isBrutalism) {
    return (
      <div
        className="relative h-full w-full sm:w-fit"
        onMouseEnter={handleMouseEnterRun}
        onMouseLeave={handleMouseLeaveRun}>
        <div className="relative z-10 flex h-full cursor-default items-center gap-3 rounded-xl border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_0_#111] transition-transform hover:-translate-y-1 hover:shadow-[4px_6px_0_0_#111] text-left">
          {isLoading ? (
            <div className="flex w-full gap-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-[#EBEBEB]" />
              <div className="flex flex-col justify-center gap-1.5 flex-1">
                <div className="h-2 w-full animate-pulse rounded bg-[#EBEBEB]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-[#EBEBEB]" />
              </div>
            </div>
          ) : (
            <>
              <span className="text-3xl">🏃</span>
              <div className="flex flex-col justify-center">
                <span className="text-[0.55rem] font-black uppercase tracking-wider text-[#111] leading-tight">
                  Run Distance
                </span>
                <span className="text-[0.45rem] font-black uppercase tracking-wider text-[#999] leading-tight">
                  Past 90 Days
                </span>
                <span className="mt-0.5 text-base font-black text-[#FC4C02]">
                  {formatDistance(totalKm90d)}
                </span>
              </div>
            </>
          )}
        </div>

        <AnimatePresence>
          {hoverRun && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="absolute right-0 bottom-full z-50 mb-3 w-64 rounded-xl border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#111] sm:w-72">
              <h4 className="mb-2 text-xs font-black uppercase tracking-wider text-[#999]">
                Recent Runs
              </h4>
              <div className="space-y-3">
                {recentRuns.map((run) => (
                  <a
                    key={run.id}
                    href={`https://www.strava.com/activities/${run.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-0.5 group/run"
                  >
                    <p className="text-xs font-black text-[#111] truncate group-hover/run:text-[#FC4C02] transition-colors">
                      {run.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem] font-bold text-[#555]">
                      <span className="text-[#FC4C02]">
                        {formatDistance(run.distance)}
                      </span>
                      <span className="text-[#CCC]">·</span>
                      <span>{formatPace(run.average_speed || 0)}</span>
                      <span className="text-[#CCC]">·</span>
                      <span>{formatDuration(run.moving_time)}</span>
                      {run.total_elevation_gain > 0 && (
                        <>
                          <span className="text-[#CCC]">·</span>
                          <span>{Math.round(run.total_elevation_gain)} mtrs</span>
                        </>
                      )}
                      {run.calories && (
                        <>
                          <span className="text-[#CCC]">·</span>
                          <span>{run.calories} kcal</span>
                        </>
                      )}
                    </div>
                    <p className="text-[0.5rem] font-bold uppercase tracking-wider text-[#999]">
                      {formatRelativeDate(run.start_date)}
                    </p>
                  </a>
                ))}
              </div>

              {bestRun && (
                <div className="mt-4 border-t-[2.5px] border-dashed border-[#EBEBEB] pt-3 flex flex-col gap-0.5">
                  <h4 className="mb-1 text-[0.55rem] font-black uppercase tracking-wider text-[#FC4C02]">
                    👑 Best Recent Run
                  </h4>
                  <a
                    href={`https://www.strava.com/activities/${bestRun.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-[#111] truncate hover:text-[#FC4C02] transition-colors"
                  >
                    {bestRun.name}
                  </a>
                  <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem] font-bold text-[#555]">
                    <span className="text-[#FC4C02]">
                      {formatDistance(bestRun.distance)}
                    </span>
                    <span className="text-[#CCC]">·</span>
                    <span>{formatPace(bestRun.average_speed || 0)}</span>
                    <span className="text-[#CCC]">·</span>
                    <span>{formatDuration(bestRun.moving_time)}</span>
                    {bestRun.total_elevation_gain > 0 && (
                      <>
                        <span className="text-[#CCC]">·</span>
                        <span>{Math.round(bestRun.total_elevation_gain)} mtrs</span>
                      </>
                    )}
                    {bestRun.calories && (
                      <>
                        <span className="text-[#CCC]">·</span>
                        <span>{bestRun.calories} kcal</span>
                      </>
                    )}
                  </div>
                  <p className="text-[0.5rem] font-bold uppercase tracking-wider text-[#999]">
                    {formatRelativeDate(bestRun.start_date)}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Liquid Glass Theme
  return (
    <div
      className="relative h-full w-full sm:w-fit"
      onMouseEnter={handleMouseEnterRun}
      onMouseLeave={handleMouseLeaveRun}>
      <div className="relative z-10 flex h-full cursor-default items-center gap-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-xl p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all hover:bg-white/20 text-left">
        {isLoading ? (
          <div className="flex w-full gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-white/20" />
            <div className="flex flex-col justify-center gap-1.5 flex-1">
              <div className="h-2 w-full animate-pulse rounded bg-white/20" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-white/20" />
            </div>
          </div>
        ) : (
          <>
            <span className="text-3xl drop-shadow-md">🏃</span>
            <div className="flex flex-col justify-center">
              <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-slate-300 leading-tight">
                Run Distance
              </span>
              <span className="text-[0.45rem] font-semibold uppercase tracking-wider text-slate-400 leading-tight">
                Past 90 Days
              </span>
              <span className="mt-0.5 text-base font-bold text-fuchsia-400">
                {formatDistance(totalKm90d)}
              </span>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {hoverRun && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full z-50 mb-3 w-64 rounded-xl border border-white/30 bg-white/10 backdrop-blur-2xl p-4 shadow-[0_16px_40px_0_rgba(0,0,0,0.3)] sm:w-72">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recent Runs
            </h4>
            <div className="space-y-3">
              {recentRuns.map((run) => (
                <a
                  key={run.id}
                  href={`https://www.strava.com/activities/${run.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 group/run"
                >
                  <p className="text-xs font-medium text-slate-200 truncate group-hover/run:text-fuchsia-400 transition-colors">
                    {run.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem] text-slate-400">
                    <span className="font-semibold text-fuchsia-400">
                      {formatDistance(run.distance)}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span>{formatPace(run.average_speed || 0)}</span>
                    <span className="text-slate-500">·</span>
                    <span>{formatDuration(run.moving_time)}</span>
                    {run.total_elevation_gain > 0 && (
                      <>
                        <span className="text-slate-500">·</span>
                        <span>{Math.round(run.total_elevation_gain)} mtrs</span>
                      </>
                    )}
                    {run.calories && (
                      <>
                        <span className="text-slate-500">·</span>
                        <span>{run.calories} kcal</span>
                      </>
                    )}
                  </div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-wider text-slate-500">
                    {formatRelativeDate(run.start_date)}
                  </p>
                </a>
              ))}
            </div>

            {bestRun && (
              <div className="mt-4 border-t border-white/10 pt-3 flex flex-col gap-0.5">
                <h4 className="mb-1 text-[0.55rem] font-semibold uppercase tracking-wider text-fuchsia-400">
                  👑 Best Recent Run
                </h4>
                <a
                  href={`https://www.strava.com/activities/${bestRun.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-200 truncate hover:text-fuchsia-400 transition-colors"
                >
                  {bestRun.name}
                </a>
                <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem] text-slate-400">
                  <span className="font-semibold text-fuchsia-400">
                    {formatDistance(bestRun.distance)}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span>{formatPace(bestRun.average_speed || 0)}</span>
                  <span className="text-slate-500">·</span>
                  <span>{formatDuration(bestRun.moving_time)}</span>
                  {bestRun.total_elevation_gain > 0 && (
                    <>
                      <span className="text-slate-500">·</span>
                      <span>{Math.round(bestRun.total_elevation_gain)} mtrs</span>
                    </>
                  )}
                  {bestRun.calories && (
                    <>
                      <span className="text-slate-500">·</span>
                      <span>{bestRun.calories} kcal</span>
                    </>
                  )}
                </div>
                <p className="text-[0.55rem] font-medium uppercase tracking-wider text-slate-500">
                  {formatRelativeDate(bestRun.start_date)}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
