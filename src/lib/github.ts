import { eachDayOfInterval, formatISO, subDays } from 'date-fns'
import { createServerFn } from '@tanstack/react-start'

export type ContributionDay = {
  date: string
  count: number
  level: number
}

// In-memory cache for contributions
let cache: { data: ContributionDay[]; timestamp: number } | null = null
const CACHE_TTL = 3600000 // 1 hour

// Server function for fetching contributions with caching
export const getContributions = createServerFn({ method: 'GET' }).handler(
  async () => {
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return cache.data
    }

    const data = await fetchGitHubContributions('antontx', 30)
    cache = { data, timestamp: Date.now() }
    return data
  }
)

// Fetch GitHub contributions from the public contributions page
async function fetchGitHubContributions(username: string, days = 30): Promise<ContributionDay[]> {
  const endDate = new Date()
  const startDate = subDays(endDate, days - 1)

  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
      { headers: { 'Accept': 'text/html' } }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch contributions: ${response.status}`)
    }

    const html = await response.text()
    return parseContributionsFromHTML(html, startDate, endDate)
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
      date: formatISO(date, { representation: 'date' }),
      count: 0,
      level: 0,
    }))
  }
}

function parseContributionsFromHTML(html: string, startDate: Date, endDate: Date): ContributionDay[] {
  const contributions: Map<string, ContributionDay> = new Map()

  // Match data-date and data-level patterns
  const cellRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g
  let match

  while ((match = cellRegex.exec(html)) !== null) {
    const date = match[1]
    const level = parseInt(match[2], 10)
    contributions.set(date, { date, count: 0, level })
  }

  // Extract actual counts from tooltips: "48 contributions on November 30th"
  const tooltipRegex = />(\d+) contributions? on ([A-Za-z]+) (\d+)/g
  const months: Record<string, string> = {
    January: '01', February: '02', March: '03', April: '04',
    May: '05', June: '06', July: '07', August: '08',
    September: '09', October: '10', November: '11', December: '12'
  }

  while ((match = tooltipRegex.exec(html)) !== null) {
    const count = parseInt(match[1], 10)
    const month = months[match[2]]
    const day = match[3].padStart(2, '0')
    if (month) {
      // Try current year and previous year
      const year = new Date().getFullYear()
      for (const y of [year, year - 1]) {
        const date = `${y}-${month}-${day}`
        if (contributions.has(date)) {
          const existing = contributions.get(date)!
          contributions.set(date, { ...existing, count })
          break
        }
      }
    }
  }

  // Generate the date range and fill in data
  return eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
    const dateStr = formatISO(date, { representation: 'date' })
    return contributions.get(dateStr) || { date: dateStr, count: 0, level: 0 }
  })
}
