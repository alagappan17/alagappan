import { useState, useEffect } from 'react'
import { getNowPlaying } from '../utils/spotify'

/**
 * Hook to track if Spotify is currently playing music
 * Returns true when music is playing, false otherwise
 */
export function useSpotifyPlaying(): boolean {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let isMounted = true

    const checkPlaying = async () => {
      try {
        const track = await getNowPlaying()
        if (isMounted) {
          setIsPlaying(track?.isPlaying ?? false)
        }
      } catch (error) {
        console.error('Error checking Spotify playing state:', error)
        if (isMounted) {
          setIsPlaying(false)
        }
      }
    }

    // Check immediately
    checkPlaying()

    // Poll every 5 seconds to stay in sync
    const interval = setInterval(checkPlaying, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  return isPlaying
}

