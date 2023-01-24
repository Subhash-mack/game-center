import { session, analytics } from "../types/analytics"

const calculateTotalSession = (sessions: session[]) => {
  return sessions.reduce((acc: number, val) => {
    return acc + val.session
  }, 0)
}
export const getGames = (analytics: analytics) => {
  const games: { [key: string]: number } = {}
  for (const user in analytics) {
    analytics[user].map(game => {
      const gameData = Object.values(game)[0]
      const gameName = Object.keys(game)[0]
      if (!games[gameName]) {
        games[gameName] = calculateTotalSession(gameData)
      } else {
        games[gameName] += calculateTotalSession(gameData)
      }
    })
  }
  return games
}

export const getPlayers = (analytics: analytics) => {
  const players: { [key: string]: number } = {}
  for (const user in analytics) {
    analytics[user].map(game => {
      const gameData = Object.values(game)[0]
      if (!players[user]) {
        players[user] = calculateTotalSession(gameData)
      } else {
        players[user] += calculateTotalSession(gameData)
      }
    })
  }
  return players
}
