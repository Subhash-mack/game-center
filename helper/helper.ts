import { session, analytics } from "../types/analytics"

const calculateTotalSession = (sessions: session[]) => {
  return sessions.reduce((acc: number, val) => {
    return acc + val.session
  }, 0)
}
export const getGames = (analytics: analytics[]) => {
  const games: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        const gameData = Object.values(game)[0]
        const gameName = Object.keys(game)[0]
        if (!games[gameName]) {
          games[gameName] = calculateTotalSession(gameData)
        } else {
          games[gameName] += calculateTotalSession(gameData)
        }
      })
    }
  }
  return games
}

export const getPlayers = (analytics: analytics[]) => {
  const players: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        const gameData = Object.values(game)[0]
        if (!players[user]) {
          players[user] = calculateTotalSession(gameData)
        } else {
          players[user] += calculateTotalSession(gameData)
        }
      })
    }
  }

  return players
}

export const getGameAnalytics = (gameName: string, analytics: analytics[]) => {
  const graph: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        if (gameName === Object.keys(game)[0]) {
          const gameData = Object.values(game)[0]
          gameData.forEach(({ date, session }) => {
            if (!graph[date]) graph[date] = session
            else graph[date] += session
          })
        }
      })
    }
  }
  return graph
}
