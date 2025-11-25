import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface TopItem {
  name: string
  artist?: string
  imageUrl?: string
  url: string
}

interface SpotifyTopItemsProps {
  theme: ThemeConfig
}

export function SpotifyTopItems({ theme }: SpotifyTopItemsProps) {
  const topArtists: TopItem[] = []
  const topTracks: TopItem[] = []
  const isLoading = false
  const isBrutalism = theme.id === 'brutalism'

  if (isLoading) {
    return (
      <div className={isBrutalism ? 'rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-6' : 'rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:rounded-2xl sm:p-6'}>
        <p className={isBrutalism ? 'text-sm font-semibold text-[#111]' : 'text-sm font-semibold text-slate-800'}>
          Loading...
        </p>
      </div>
    )
  }

  if (isBrutalism) {
    return (
      <div className="space-y-6">
        {/* Top Artists */}
        <div className="rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-6">
          <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
            Top Artists
          </h4>
          <div className="space-y-2">
            {topArtists.map((artist, index) => (
              <motion.a
                key={artist.name}
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-lg border-[2px] border-black bg-[#FFFBF3] p-2 transition-all hover:shadow-[3px_3px_0_0_#111] sm:p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-black bg-[#FF6F91] text-xs font-black text-white sm:h-8 sm:w-8 sm:text-sm">
                  {index + 1}
                </span>
                {artist.imageUrl && (
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="h-10 w-10 rounded-full border-[2px] border-black sm:h-12 sm:w-12"
                  />
                )}
                <span className="flex-1 text-sm font-bold text-[#111] sm:text-base">
                  {artist.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Top Tracks */}
        <div className="rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_0_#111] sm:rounded-2xl sm:p-6">
          <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
            Top Tracks
          </h4>
          <div className="space-y-2">
            {topTracks.map((track, index) => (
              <motion.a
                key={track.name}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-lg border-[2px] border-black bg-[#FFFBF3] p-2 transition-all hover:shadow-[3px_3px_0_0_#111] sm:p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-black bg-[#2EC4B6] text-xs font-black text-white sm:h-8 sm:w-8 sm:text-sm">
                  {index + 1}
                </span>
                {track.imageUrl && (
                  <img
                    src={track.imageUrl}
                    alt={track.name}
                    className="h-10 w-10 rounded-lg border-[2px] border-black sm:h-12 sm:w-12"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#111] sm:text-base">
                    {track.name}
                  </p>
                  {track.artist && (
                    <p className="text-xs text-[#666] sm:text-sm">
                      {track.artist}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Artists */}
      <div className="rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:rounded-2xl sm:p-6">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
          Top Artists
        </h4>
        <div className="space-y-2">
          {topArtists.map((artist, index) => (
            <motion.a
              key={artist.name}
              href={artist.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-lg border border-white/40 bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 sm:p-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 bg-fuchsia-400/30 text-xs font-semibold text-slate-900 sm:h-8 sm:w-8 sm:text-sm">
                {index + 1}
              </span>
              {artist.imageUrl && (
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="h-10 w-10 rounded-full border border-white/40 sm:h-12 sm:w-12"
                />
              )}
              <span className="flex-1 text-sm font-semibold text-slate-900 sm:text-base">
                {artist.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Top Tracks */}
      <div className="rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:rounded-2xl sm:p-6">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
          Top Tracks
        </h4>
        <div className="space-y-2">
          {topTracks.map((track, index) => (
            <motion.a
              key={track.name}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-lg border border-white/40 bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 sm:p-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 bg-purple-400/30 text-xs font-semibold text-slate-900 sm:h-8 sm:w-8 sm:text-sm">
                {index + 1}
              </span>
              {track.imageUrl && (
                <img
                  src={track.imageUrl}
                  alt={track.name}
                  className="h-10 w-10 rounded-lg border border-white/40 sm:h-12 sm:w-12"
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 sm:text-base">
                  {track.name}
                </p>
                {track.artist && (
                  <p className="text-xs text-slate-600 sm:text-sm">
                    {track.artist}
                  </p>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}






