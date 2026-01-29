'use client'

import { useEffect, useState, useRef } from 'react'

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionWeek {
  days: ContributionDay[]
}

export default function GitHubContributions() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [contributions, setContributions] = useState<ContributionWeek[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('contributions')
  const [startMonth, setStartMonth] = useState('')
  const [endMonth, setEndMonth] = useState('')
  const [animatedCells, setAnimatedCells] = useState<Set<string>>(new Set())
  const [hoveredCell, setHoveredCell] = useState<{ weekIdx: number; dayIdx: number } | null>(null)
  const graphRef = useRef<HTMLDivElement>(null)

  const username = 'kevish-is-building'

  useEffect(() => {
    fetchGitHubData()
  }, [])

  // Animation effect - fills cells one by one
  useEffect(() => {
    if (contributions.length > 0 && !loading) {
      const totalCells = contributions.reduce((acc, week) => acc + week.days.length, 0)
      let cellIndex = 0
      
      const animateInterval = setInterval(() => {
        if (cellIndex >= totalCells) {
          clearInterval(animateInterval)
          return
        }
        
        // Calculate which cell to animate
        let currentIndex = 0
        for (let weekIdx = 0; weekIdx < contributions.length; weekIdx++) {
          for (let dayIdx = 0; dayIdx < contributions[weekIdx].days.length; dayIdx++) {
            if (currentIndex === cellIndex) {
              setAnimatedCells(prev => new Set(prev).add(`${weekIdx}-${dayIdx}`))
            }
            currentIndex++
          }
        }
        cellIndex++
      }, 5) // Speed of animation (5ms per cell)
      
      return () => clearInterval(animateInterval)
    }
  }, [contributions, loading])

  const fetchGitHubData = async () => {
    try {
      // Fetch user profile
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      const userData = await userResponse.json()

      // Fetch all repos to calculate total stars
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      const reposData = await reposResponse.json()
      
      const totalStars = Array.isArray(reposData) 
        ? reposData.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0)
        : 0

      setStats({
        publicRepos: userData.public_repos || 0,
        followers: userData.followers || 0,
        following: userData.following || 0,
        totalStars: totalStars
      })

      await fetchContributions()
      
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
      generatePlaceholderContributions()
    } finally {
      setLoading(false)
    }
  }

  const fetchContributions = async () => {
    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      const data = await response.json()
      
      if (data && data.contributions) {
        const allContributions = data.contributions.flat()
        // Get full year of data (52 weeks)
        const weeksToShow = 52
        const daysNeeded = weeksToShow * 7
        const recentDays = allContributions.slice(-daysNeeded)
        
        // Group into weeks (7 days each)
        const weeks: ContributionWeek[] = []
        for (let i = 0; i < recentDays.length; i += 7) {
          const weekDays = recentDays.slice(i, i + 7)
          weeks.push({
            days: weekDays.map((day: { date: string; count: number; level: number }) => ({
              date: day.date,
              count: day.count,
              level: day.level
            }))
          })
        }
        
        setContributions(weeks)
        setTotalContributions(data.total?.lastYear || allContributions.reduce((acc: number, day: { count: number }) => acc + day.count, 0))
        
        // Set month labels
        if (recentDays.length > 0) {
          const startDate = new Date(recentDays[0].date)
          const endDate = new Date(recentDays[recentDays.length - 1].date)
          setStartMonth(startDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
          setEndMonth(endDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
        }
      }
    } catch (error) {
      console.error('Error fetching contributions:', error)
      generatePlaceholderContributions()
    }
  }

  const generatePlaceholderContributions = () => {
    const weeks: ContributionWeek[] = []
    const today = new Date()
    const weeksToShow = 52
    let total = 0
    
    for (let w = weeksToShow - 1; w >= 0; w--) {
      const weekDays: ContributionDay[] = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (w * 7 + (6 - d)))
        const count = Math.floor(Math.random() * 10)
        total += count
        weekDays.push({
          date: date.toISOString().split('T')[0],
          count,
          level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4
        })
      }
      weeks.push({ days: weekDays })
    }
    
    setContributions(weeks)
    setTotalContributions(total)
    
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - (weeksToShow * 7))
    setStartMonth(startDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
    setEndMonth(today.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
  }

  const getLevelColor = (level: number, isAnimated: boolean) => {
    if (!isAnimated) return '#ebedf0'
    switch (level) {
      case 1: return '#d4f0c4'
      case 2: return '#a8e085'
      case 3: return '#7cc754'
      case 4: return '#c5f467'
      default: return '#ebedf0'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const getDayName = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="w-full max-w-[700px] max-lg:max-w-full">
        <div className="bg-[#f8f9fa] rounded-2xl p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-24"></div>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {[...Array(52)].map((_, i) => (
              <div key={i} className="flex flex-col gap-[2px]">
                {[...Array(7)].map((_, j) => (
                  <div key={j} className="w-[10px] h-[10px] bg-gray-200 rounded-sm"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'contributions', label: 'Contributions', value: formatNumber(totalContributions) },
    { id: 'repos', label: 'Repositories', value: formatNumber(stats?.publicRepos || 0) },
    { id: 'followers', label: 'Followers', value: formatNumber(stats?.followers || 0) },
    { id: 'following', label: 'Following', value: formatNumber(stats?.following || 0) },
    { id: 'stars', label: 'Total Stars', value: formatNumber(stats?.totalStars || 0) },
  ]

  return (
    <div className="w-full max-w-[700px] max-lg:max-w-full">
      <div className="bg-[#f8f9fa] rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">GITHUB contributions</p>
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>

        {/* Stats Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#c5f467] text-black'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}: <span className="font-bold">{tab.value}</span>
            </button>
          ))}
        </div>

        {/* Contribution Graph with Animation */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 relative" ref={graphRef}>
          <p className="text-xs text-gray-500 mb-3">Contribution Graph (Last Year)</p>
          <div className="w-full overflow-x-auto overflow-y-visible">
            <div className="flex gap-[2px] min-w-max">
              {contributions.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[2px]">
                  {week.days.map((day, dayIdx) => {
                    const cellKey = `${weekIdx}-${dayIdx}`
                    const isAnimated = animatedCells.has(cellKey)
                    const isHovered = hoveredCell?.weekIdx === weekIdx && hoveredCell?.dayIdx === dayIdx
                    
                    return (
                      <div
                        key={dayIdx}
                        className="w-[10px] h-[10px] max-md:w-2 max-md:h-2 rounded-sm cursor-pointer transition-all duration-150 relative hover:scale-150 hover:z-10"
                        style={{ 
                          backgroundColor: getLevelColor(day.level, isAnimated),
                          transform: isAnimated ? 'scale(1)' : 'scale(0)',
                          opacity: isAnimated ? 1 : 0
                        }}
                        onMouseEnter={() => setHoveredCell({ weekIdx, dayIdx })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {/* Tooltip */}
                        {isHovered && (
                          <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2 px-3 rounded-lg text-[11px] max-md:text-[10px] max-md:py-1.5 max-md:px-2.5 whitespace-nowrap z-[100] shadow-lg pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-gray-800">
                            <div className="font-semibold">{day.count} contribution{day.count !== 1 ? 's' : ''}</div>
                            <div className="text-gray-400">{getDayName(day.date)}</div>
                            <div className="text-gray-400">{formatDate(day.date)}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline */}
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>{startMonth}</span>
            <span>{endMonth}</span>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-2 text-xs text-gray-500">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#d4f0c4]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#a8e085]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#7cc754]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#c5f467]"></div>
            <span>More</span>
          </div>
        </div>

        {/* View Profile */}
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          View Full Profile
        </a>
      </div>
    </div>
  )
}
