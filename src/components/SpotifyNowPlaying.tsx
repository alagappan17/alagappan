import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import { getNowPlaying, type SpotifyTrack } from '../utils/spotify'

interface SpotifyNowPlayingProps {
  theme: ThemeConfig
}

type PlaybackState = 'offline' | 'paused' | 'playing'

export function SpotifyNowPlaying({ theme }: SpotifyNowPlayingProps) {
  const isBrutalism = theme.id === 'brutalism'
  const [isLoading, setIsLoading] = useState(true)
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const trackRef = useRef<SpotifyTrack | null>(null)
  const [currentProgress, setCurrentProgress] = useState(0)
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  )

  // Fetch now playing data
  useEffect(() => {
    let isInitialLoad = true

    const fetchNowPlaying = async () => {
      // Only show loading state on initial load
      if (isInitialLoad) {
        setIsLoading(true)
      }
      try {
        const nowPlaying = await getNowPlaying()

        // Only update if data actually changed
        if (isInitialLoad) {
          // On initial load, always set the track
          setTrack(nowPlaying)
          trackRef.current = nowPlaying
          if (nowPlaying) {
            setCurrentProgress(nowPlaying.progressMs)
          }
        } else {
          // On subsequent fetches, only update if we have new data
          // and it's different from what we currently have
          if (nowPlaying) {
            const currentTrack = trackRef.current
            // Compare track data to see if it changed
            const hasChanged =
              !currentTrack ||
              currentTrack.name !== nowPlaying.name ||
              currentTrack.artist !== nowPlaying.artist ||
              currentTrack.isPlaying !== nowPlaying.isPlaying

            if (hasChanged) {
              setTrack(nowPlaying)
              trackRef.current = nowPlaying
              setCurrentProgress(nowPlaying.progressMs)
            } else {
              // Track hasn't changed, but update progress from API
              setCurrentProgress(nowPlaying.progressMs)
            }
          }
          // If nowPlaying is null but we have a track, keep the current track
          // Don't update state to prevent blank flash
        }
      } catch (error) {
        console.error('Error fetching now playing:', error)
        // Only set to null on initial load, keep previous track on subsequent errors
        if (isInitialLoad) {
          setTrack(null)
          trackRef.current = null
        }
      } finally {
        if (isInitialLoad) {
          setIsLoading(false)
          isInitialLoad = false
        }
      }
    }

    // Fetch immediately on mount
    fetchNowPlaying()

    // Poll every 5 seconds
    const interval = setInterval(fetchNowPlaying, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update progress locally when playing
  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    if (track && track.isPlaying && track.durationMs > 0) {
      // Update progress every second when playing
      progressIntervalRef.current = setInterval(() => {
        setCurrentProgress((prev) => {
          const newProgress = prev + 1000
          // Don't exceed duration
          return newProgress >= track.durationMs
            ? track.durationMs
            : newProgress
        })
      }, 1000)
    } else {
      // If paused or no track, stop updating
      setCurrentProgress(track?.progressMs || 0)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [track])

  // Determine playback state
  const getPlaybackState = (): PlaybackState => {
    if (!track) return 'offline'
    return track.isPlaying ? 'playing' : 'paused'
  }

  const playbackState = getPlaybackState()

  // Get the appropriate icon for the playback state
  const getPlaybackIcon = () => {
    switch (playbackState) {
      case 'playing':
        return '/playback/soundwave.gif'
      case 'paused':
        return '/playback/pause.png'
      case 'offline':
        return '/playback/offline.png'
    }
  }

  // Calculate progress percentage
  const progressPercentage =
    track && track.durationMs > 0
      ? Math.min((currentProgress / track.durationMs) * 100, 100)
      : 0

  if (isBrutalism) {
    return (
      <div className="relative rounded-xl border-[3px] border-black bg-white p-2.5 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-3 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 animate-pulse rounded border-[2px] border-black bg-[#FFFBF3] shadow-[2px_2px_0_0_#111] sm:h-12 sm:w-12" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-3/4 animate-pulse rounded bg-[#FFFBF3]" />
              <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#FFFBF3]" />
            </div>
          </div>
        ) : track ? (
          <motion.a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center gap-2.5 transition-all">
            {/* Cover Image */}
            <motion.img
              src={track.albumImageUrl}
              alt={track.album}
              whileHover={{ scale: 1.15, rotate: 5, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="h-10 w-10 shrink-0 rounded border-[2px] border-black shadow-[2px_2px_0_0_#111] sm:h-12 sm:w-12"
            />
            {/* Song Name and Artist */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#111] line-clamp-1 sm:text-sm">
                {track.name}
              </p>
              <p className="mt-0.5 text-[0.65rem] text-[#666] line-clamp-1 sm:text-xs">
                {track.artist}
              </p>
            </div>
            {/* Playback Icon on the right */}
            <img
              src={getPlaybackIcon()}
              alt={playbackState}
              className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
            />
          </motion.a>
        ) : null}
        {/* Progress bar at the bottom */}
        {track && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F5F5F5]">
            <motion.div
              className="h-full bg-[#FF6F91]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3, ease: 'linear' }}
            />
          </div>
        )}
        {!track && !isLoading && (
          <div className="flex items-center gap-2.5">
            {/* Placeholder Cover */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border-[2px] border-black bg-[#F5F5F5] shadow-[2px_2px_0_0_#111] sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-[#999] sm:h-6 sm:w-6"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            {/* Offline Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#999] sm:text-sm">
                Offline
              </p>
              <p className="mt-0.5 text-[0.65rem] text-[#999] sm:text-xs">
                Not playing
              </p>
            </div>
            {/* Offline Icon on the right */}
            <img
              src={getPlaybackIcon()}
              alt="offline"
              className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
            />
          </div>
        )}
      </div>
    )
  }

  // Liquid Glass Theme
  return (
    <div className="relative rounded-xl border border-white/30 bg-white/10 p-2.5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] sm:rounded-2xl sm:p-3 overflow-hidden">
      {isLoading ? (
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 animate-pulse rounded-lg border border-white/40 bg-white/10 shadow-[0_2px_8px_0_rgba(0,0,0,0.2)] sm:h-12 sm:w-12" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-3/4 animate-pulse rounded bg-white/20" />
            <div className="h-2.5 w-1/2 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      ) : track ? (
        <motion.a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          className="flex items-center gap-2.5 transition-all">
          {/* Cover Image */}
          <motion.img
            src={track.albumImageUrl}
            alt={track.album}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 shrink-0 rounded-lg border border-white/40 shadow-[0_2px_8px_0_rgba(0,0,0,0.2)] sm:h-12 sm:w-12"
          />
          {/* Song Name and Artist */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 line-clamp-1 sm:text-sm">
              {track.name}
            </p>
            <p className="mt-0.5 text-[0.65rem] text-slate-600 line-clamp-1 sm:text-xs">
              {track.artist}
            </p>
          </div>
          {/* Playback Icon on the right */}
          <img
            src={getPlaybackIcon()}
            alt={playbackState}
            className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
          />
        </motion.a>
      ) : null}
      {/* Progress bar at the bottom */}
      {track && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-fuchsia-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>
      )}
      {!track && !isLoading && (
        <div className="flex items-center gap-2.5">
          {/* Placeholder Cover */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-white/10 shadow-[0_2px_8px_0_rgba(0,0,0,0.2)] sm:h-12 sm:w-12">
            <svg
              className="h-5 w-5 text-slate-400 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          {/* Offline Text */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-400 sm:text-sm">
              Offline
            </p>
            <p className="mt-0.5 text-[0.65rem] text-slate-400 sm:text-xs">
              Not playing
            </p>
          </div>
          {/* Offline Icon on the right */}
          <img
            src={getPlaybackIcon()}
            alt="offline"
            className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
          />
        </div>
      )}
    </div>
  )
}
