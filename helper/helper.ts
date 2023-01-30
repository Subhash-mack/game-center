import { months } from "../config/constants"
import { Session, Analytics, AnalyticsGraph } from "../types/analytics"

const calculateTotalSession = (sessions: Session[]) => {
  return sessions.reduce((acc: number, val) => {
    return acc + val.session
  }, 0)
}

const isLeapYear = (year: number) => year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)

export const getGames = (analytics: Analytics[]) => {
  const games: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        const gameData = Object.values(game)[0]
        const gameName = Object.keys(game)[0]
        games[gameName] = (games[gameName] || 0) + calculateTotalSession(gameData)
      })
    }
  }
  return games
}

export const getPlayers = (analytics: Analytics[]) => {
  const players: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        const gameData = Object.values(game)[0]
        players[user] = (players[user] || 0) + calculateTotalSession(gameData)
      })
    }
  }
  return players
}

export const getGameAnalytics = (gameName: string, analytics: Analytics[]) => {
  const graph: AnalyticsGraph = { totalSessions: {}, avgSessions: {} }
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        if (gameName === Object.keys(game)[0]) {
          const gameData = Object.values(game)[0]
          gameData.forEach(({ date, session }) => {
            const monthYear = date.split("-").slice(1).join("-")
            graph.avgSessions[monthYear] = (graph.avgSessions[monthYear] || 0) + session
            graph.totalSessions[date] = (graph.totalSessions[date] || 0) + session
          })
        }
      })
    }
  }
  for (const date in graph.avgSessions) {
    const [month, year] = date.split("-")
    const days = months[month]
    graph.avgSessions[date] = Math.round(
      graph.avgSessions[date] / (month === "Feb" && isLeapYear(Number(year)) ? days + 1 : days)
    )
  }
  return graph
}
