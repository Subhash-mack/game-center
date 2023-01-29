import { Session, Analytics, AnalyticsGraph } from "../types/analytics"

const calculateTotalSession = (sessions: Session[]) => {
  return sessions.reduce((acc: number, val) => {
    return acc + val.session
  }, 0)
}
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
            const month = date.split("-")[1]
            graph.avgSessions[month] = (graph.avgSessions[month] || 0) + session
            graph.totalSessions[date] = (graph.totalSessions[date] || 0) + session
          })
        }
      })
    }
  }
  return graph
}
