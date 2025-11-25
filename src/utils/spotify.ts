// Spotify Web API utility functions

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN

export interface SpotifyTrack {
  name: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
  isPlaying: boolean
  progressMs: number
  durationMs: number
}

/**
 * Get a new access token using the refresh token
 */
export async function getAccessToken(): Promise<string | null> {
  if (!clientId || !clientSecret || !refreshToken) {
    console.error(
      'Spotify credentials are missing. Please check your environment variables.'
    )
    return null
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Failed to get access token:', errorData)
      return null
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}

/**
 * Get the currently playing track from Spotify
 */
export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // 204 means no content (not playing anything)
    if (response.status === 204) {
      return null
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Failed to get now playing:', errorData)
      return null
    }

    const data = await response.json()

    // Extract track information
    const track = data.item
    if (!track) {
      return null
    }

    // Get the smallest album image (usually 64x64 or 300x300)
    const albumImage =
      track.album?.images?.find(
        (img: { height: number }) => img.height <= 300
      ) ||
      track.album?.images?.[track.album.images.length - 1] ||
      null

    // Extract artist names (join multiple artists with comma)
    const artist =
      track.artists?.map((a: { name: string }) => a.name).join(', ') ||
      'Unknown Artist'

    return {
      name: track.name || 'Unknown Track',
      artist,
      album: track.album?.name || 'Unknown Album',
      albumImageUrl: albumImage?.url || '',
      songUrl: track.external_urls?.spotify || '#',
      isPlaying: data.is_playing || false,
      progressMs: data.progress_ms || 0,
      durationMs: track.duration_ms || 0,
    }
  } catch (error) {
    console.error('Error getting now playing:', error)
    return null
  }
}
