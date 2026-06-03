import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import {
  getRecentActivities,
  isRunActivity,
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
  const [activities, setActivities] = useState<StravaActivity[]>([])

  // Hover states
  const [hoverRun, setHoverRun] = useState(false)

  // We want a slight delay before closing to avoid flickering
  const runTimerRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setIsLoading(true)
      const data = await getRecentActivities()
      if (cancelled) return
      setActivities(data)
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

  // Calculations
  const now = new Date().getTime()
  const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000

  const runs = activities.filter((a) => isRunActivity(a.sport_type))

  const recentRuns90d = runs.filter(
    (a) => new Date(a.start_date).getTime() > ninetyDaysAgo,
  )
  const totalKm90d = recentRuns90d.reduce((acc, r) => acc + r.distance, 0)
  const last4Runs = runs.slice(0, 4)

  // Best run (longest distance)
  const bestRun =
    runs.length > 0
      ? [...runs].sort((a, b) => b.distance - a.distance)[0]
      : null

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
                {last4Runs.map((run) => (
                  <div key={run.id} className="flex flex-col gap-0.5">
                    <p className="text-xs font-black text-[#111] truncate">
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
                      <span className="text-[#CCC]">·</span>
                      <span>{run.calories ? `${run.calories} kcal` : ''}</span>
                    </div>
                    <p className="text-[0.5rem] font-bold uppercase tracking-wider text-[#999]">
                      {formatRelativeDate(run.start_date)}
                    </p>
                  </div>
                ))}
              </div>

              {bestRun && (
                <div className="mt-4 border-t-[2.5px] border-dashed border-[#EBEBEB] pt-3 flex flex-col gap-0.5">
                  <h4 className="mb-1 text-[0.55rem] font-black uppercase tracking-wider text-[#FC4C02]">
                    👑 Best Recent Run
                  </h4>
                  <p className="text-xs font-black text-[#111] truncate">
                    {bestRun.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem] font-bold text-[#555]">
                    <span className="text-[#FC4C02]">
                      {formatDistance(bestRun.distance)}
                    </span>
                    <span className="text-[#CCC]">·</span>
                    <span>{formatPace(bestRun.average_speed || 0)}</span>
                    <span className="text-[#CCC]">·</span>
                    <span>{formatDuration(bestRun.moving_time)}</span>
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
              {last4Runs.map((run) => (
                <div key={run.id} className="flex flex-col gap-0.5">
                  <p className="text-xs font-medium text-slate-200 truncate">
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
                    <span className="text-slate-500">·</span>
                    <span>{run.calories ? `${run.calories} kcal` : ''}</span>
                  </div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-wider text-slate-500">
                    {formatRelativeDate(run.start_date)}
                  </p>
                </div>
              ))}
            </div>

            {bestRun && (
              <div className="mt-4 border-t border-white/10 pt-3 flex flex-col gap-0.5">
                <h4 className="mb-1 text-[0.55rem] font-semibold uppercase tracking-wider text-fuchsia-400">
                  👑 Best Recent Run
                </h4>
                <p className="text-xs font-medium text-slate-200 truncate">
                  {bestRun.name}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-[0.6rem] text-slate-400">
                  <span className="font-semibold text-fuchsia-400">
                    {formatDistance(bestRun.distance)}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span>{formatPace(bestRun.average_speed || 0)}</span>
                  <span className="text-slate-500">·</span>
                  <span>{formatDuration(bestRun.moving_time)}</span>
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
