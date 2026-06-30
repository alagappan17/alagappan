// Strava API v3 utility functions
// Uses the same refresh-token pattern as spotify.ts

const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token'
const ACTIVITIES_ENDPOINT = 'https://www.strava.com/api/v3/athlete/activities'
const STATS_ENDPOINT = 'https://www.strava.com/api/v3/athletes'

const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID
const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET
const refreshToken = import.meta.env.VITE_STRAVA_REFRESH_TOKEN
const athleteId = import.meta.env.VITE_STRAVA_ATHLETE_ID

export interface StravaActivity {
  id: number
  name: string
  sport_type: string
  start_date: string // ISO 8601
  distance: number // meters
  moving_time: number // seconds
  elapsed_time: number // seconds
  total_elevation_gain: number // meters
  kilojoules?: number // kJ (only for rides, approximate for others)
  calories?: number // kcal — present in summary list
  average_heartrate?: number
  average_speed?: number // meters per second
}

export interface StravaStats {
  all_run_totals: {
    count: number
    distance: number // meters
    moving_time: number // seconds
    elevation_gain: number // meters
  }
  ytd_run_totals: {
    count: number
    distance: number
    elevation_gain: number
  }
  recent_run_totals: {
    count: number
    distance: number
    elevation_gain: number
  }
}



// Sport type → human-friendly label
export function getActivityLabel(sportType: string): string {
  const map: Record<string, string> = {
    Run: 'Run',
    TrailRun: 'Trail Run',
    VirtualRun: 'Virtual Run',
    Walk: 'Walk',
    Hike: 'Hike',
    WeightTraining: 'Weights',
    Workout: 'Workout',
    Crossfit: 'CrossFit',
    Yoga: 'Yoga',
    Swim: 'Swim',
    Ride: 'Ride',
    VirtualRide: 'Virtual Ride',
    EBikeRide: 'E-Bike',
    Soccer: 'Soccer',
    Tennis: 'Tennis',
    Badminton: 'Badminton',
    BoxingWorkout: 'Boxing',
    Kickboxing: 'Kickboxing',
    MartialArts: 'Martial Arts',
    RockClimbing: 'Climbing',
    StandUpPaddling: 'Paddling',
    Kayaking: 'Kayaking',
    Snowboard: 'Snowboard',
    Skiing: 'Skiing',
    IceSkate: 'Ice Skating',
  }
  return map[sportType] ?? sportType
}

// Sport type → emoji icon
export function getActivityIcon(sportType: string): string {
  const map: Record<string, string> = {
    Run: '🏃',
    TrailRun: '🏃',
    VirtualRun: '🏃',
    Walk: '🚶',
    Hike: '🥾',
    WeightTraining: '🏋️',
    Workout: '💪',
    Crossfit: '🔥',
    Yoga: '🧘',
    Swim: '🏊',
    Ride: '🚴',
    VirtualRide: '🚴',
    EBikeRide: '⚡',
    Soccer: '⚽',
    Tennis: '🎾',
    Badminton: '🏸',
    BoxingWorkout: '🥊',
    Kickboxing: '🥊',
    MartialArts: '🥋',
    RockClimbing: '🧗',
    StandUpPaddling: '🏄',
    Kayaking: '🛶',
    Snowboard: '🏂',
    Skiing: '⛷️',
  }
  return map[sportType] ?? '🏅'
}

// Whether the activity type is a run (for distance display)
export function isRunActivity(sportType: string): boolean {
  return ['Run', 'TrailRun', 'VirtualRun'].includes(sportType)
}

/**
 * Get a new access token from Strava using the stored refresh token.
 * Strava tokens expire in 6 hours — always refresh on load.
 */
export async function getStravaAccessToken(): Promise<string | null> {
  if (!clientId || !clientSecret || !refreshToken) {
    return null
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.access_token as string
  } catch {
    return null
  }
}



/**
 * Fetch all runs from the last 90 days (up to 200).
 * Uses the `after` timestamp param to filter server-side, then filters
 * client-side to run sport types only.
 *
 * Used for: 90-day total distance + best run scoring.
 */
export async function getRunsLast90Days(): Promise<StravaActivity[]> {
  const accessToken = await getStravaAccessToken()
  if (!accessToken) return []

  const ninetyDaysAgoEpoch = Math.floor(
    (Date.now() - 90 * 24 * 60 * 60 * 1000) / 1000,
  )

  try {
    const response = await fetch(
      `${ACTIVITIES_ENDPOINT}?after=${ninetyDaysAgoEpoch}&per_page=200&page=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )
    if (!response.ok) return []
    const data = (await response.json()) as StravaActivity[]
    // No server-side sport_type filter — filter client-side
    return data.filter((a) => isRunActivity(a.sport_type))
  } catch {
    return []
  }
}

/**
 * Fetch only the N most recent activities for the hover-card display list.
 * Fetches a small page to minimise payload.
 */
export async function getRecentRunsForDisplay(
  count: number = 4,
): Promise<StravaActivity[]> {
  const accessToken = await getStravaAccessToken()
  if (!accessToken) return []

  try {
    // Fetch a small buffer (3× count) so we have enough runs after filtering
    const bufferSize = Math.min(count * 3, 30)
    const response = await fetch(
      `${ACTIVITIES_ENDPOINT}?per_page=${bufferSize}&page=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )
    if (!response.ok) return []
    const data = (await response.json()) as StravaActivity[]
    return data.filter((a) => isRunActivity(a.sport_type)).slice(0, count)
  } catch {
    return []
  }
}

/**
 * Fetch all-time athlete stats.
 */
export async function getAthleteStats(): Promise<StravaStats | null> {
  const accessToken = await getStravaAccessToken()
  if (!accessToken || !athleteId) return null

  try {
    const response = await fetch(`${STATS_ENDPOINT}/${athleteId}/stats`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) return null
    return (await response.json()) as StravaStats
  } catch {
    return null
  }
}



/**
 * Find the best run from a list.
 *
 * Primary sort: longest distance, floored to 0.1 km (same granularity as
 * formatDistance) so two runs that display as "10 km" are treated as equal.
 * Tiebreaker: faster average pace (higher average_speed wins).
 */
export function findBestRun(runs: StravaActivity[]): StravaActivity | null {
  if (runs.length === 0) return null
  return [...runs].sort((a, b) => {
    // Floor to nearest 100 m (= 0.1 km) to match what formatDistance shows
    const distA = Math.floor(a.distance / 100)
    const distB = Math.floor(b.distance / 100)
    if (distB !== distA) return distB - distA
    // Same displayed distance → faster pace wins
    return (b.average_speed ?? 0) - (a.average_speed ?? 0)
  })[0]
}



/** Format distance: meters → '10.2 km' (actual distance, 1 decimal place) */
export function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`
}

/** Format relative time: ISO date → '2 days ago', 'Today', etc. */
export function formatRelativeDate(isoDate: string): string {
  const now = new Date()
  const date = new Date(isoDate)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Format pace: m/s → '5:30/km' */
export function formatPace(mps: number): string {
  if (!mps || mps <= 0) return '0:00/km'
  const secsPerKm = 1000 / mps
  const mins = Math.floor(secsPerKm / 60)
  const secs = Math.floor(secsPerKm % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}/km`
}

/** Format duration: seconds → '1h 20m' or '45m' */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}
