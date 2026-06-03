import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import { getNowPlaying, getTopArtists, type SpotifyTrack, type SpotifyArtist } from '../utils/spotify'

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
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimerRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setIsHovered(false), 200)
  }

  // Fetch now playing data
  useEffect(() => {
    let isInitialLoad = true

    const fetchNowPlaying = async () => {
      // Only show loading state on initial load
      if (isInitialLoad) {
        setIsLoading(true)
      }
      try {
        const [nowPlaying, artistsData] = await Promise.all([
          getNowPlaying(),
          isInitialLoad ? getTopArtists() : Promise.resolve(null)
        ])

        if (isInitialLoad && artistsData) {
          setTopArtists(artistsData)
        }

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

  const PlaybackIcon = ({ className = 'h-7 w-7 sm:h-8 sm:w-8' }: { className?: string }) => {
    if (playbackState === 'playing') {
      return (
        <div className={`shrink-0 ${className}`}>
          <div className="soundwave-container">
            {[0, 0.2, 0.4, 0.6, 0.8].map((delay) => (
              <div
                key={delay}
                className="soundwave-bar bg-current"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      )
    }
    return (
      <img
        src={
          playbackState === 'paused'
            ? '/playback/optimized/pause.webp'
            : '/playback/optimized/offline.webp'
        }
        alt={playbackState}
        width={32}
        height={32}
        loading="lazy"
        decoding="async"
        className={`shrink-0 ${className}`}
      />
    )
  }

  // Calculate progress percentage
  const progressPercentage =
    track && track.durationMs > 0
      ? Math.min((currentProgress / track.durationMs) * 100, 100)
      : 0

  if (isBrutalism) {
    return (
      <div 
        className="relative h-full w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-full rounded-xl border-[3px] border-black bg-white p-2.5 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-3 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 animate-pulse rounded border-[2px] border-black bg-[#FFFBF3] shadow-[2px_2px_0_0_#111] sm:h-12 sm:w-12" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-3/4 animate-pulse rounded bg-[#FFFBF3]" />
              <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#FFFBF3]" />
            </div>
          </div>
        ) : track ? (
          <div
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
            <PlaybackIcon />
          </div>
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
                Offline on Spotify
              </p>
              <p className="mt-0.5 text-[0.65rem] text-[#999] sm:text-xs">
                Not playing
              </p>
            </div>
            <PlaybackIcon />
          </div>
        )}
      </div>

        <AnimatePresence>
          {isHovered && topArtists.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute left-0 bottom-full z-50 mb-3 w-64 rounded-xl border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#111] sm:w-72"
            >
              <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-[#999]">
                Top 5 Artists (All Time)
              </h4>
              <div className="space-y-3">
                {topArtists.map((artist, i) => (
                  <a
                    key={artist.id}
                    href={artist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="text-sm font-black text-[#CCC] w-4">{i + 1}</span>
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="h-10 w-10 shrink-0 rounded-full border-[2px] border-black object-cover shadow-[2px_2px_0_0_#111]"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <p className="text-xs font-black text-[#111] truncate">
                        {artist.name}
                      </p>
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[#999] truncate mt-0.5">
                        {artist.genres.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
  // Liquid Glass Theme
  return (
    <div 
      className="relative h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full rounded-xl border border-white/30 bg-white/10 p-2.5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] sm:rounded-2xl sm:p-3 overflow-hidden">
      {isLoading ? (
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 animate-pulse rounded-lg border border-white/40 bg-white/10 shadow-[0_2px_8px_0_rgba(0,0,0,0.2)] sm:h-12 sm:w-12" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-3/4 animate-pulse rounded bg-white/20" />
            <div className="h-2.5 w-1/2 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      ) : track ? (
        <div
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
          <PlaybackIcon />
        </div>
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
          <PlaybackIcon />
        </div>
      )}
      </div>

      <AnimatePresence>
        {isHovered && topArtists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-full z-50 mb-3 w-64 rounded-xl border border-white/30 bg-white/10 backdrop-blur-2xl p-4 shadow-[0_16px_40px_0_rgba(0,0,0,0.3)] sm:w-72"
          >
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Top 5 Artists (All Time)
            </h4>
            <div className="space-y-3">
              {topArtists.map((artist, i) => (
                <a
                  key={artist.id}
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-sm font-bold text-slate-500 w-4">{i + 1}</span>
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="h-10 w-10 shrink-0 rounded-full border border-white/30 object-cover shadow-sm"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-xs font-medium text-slate-200 truncate">
                      {artist.name}
                    </p>
                    <p className="text-[0.6rem] font-medium uppercase tracking-wider text-slate-500 truncate mt-0.5">
                      {artist.genres.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
