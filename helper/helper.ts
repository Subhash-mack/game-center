import { months } from "../config/constants"
import { Session, Analytics } from "../types/analytics"

export const isValidDate = (date: string) => !Number.isNaN(new Date(date).getTime())

export const getDate = (date?: string) => (date ? new Date(date) : new Date())

const calculateTotalSession = (sessions: Session[]) => {
  return sessions.reduce((acc: number, val) => {
    return acc + val.session
  }, 0)
}

const filterByDate = (sessions: Session[], startDate: Date, endDate: Date) =>
  sessions.filter(session => {
    const date = getDate(session.date)
    return date >= startDate && date <= endDate
  })

const isLeapYear = (year: number) => year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)

export const getGamesByDates = (analytics: Analytics[], startDate: Date, endDate: Date) => {
  const games: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        const gameData = Object.values(game)[0]
        const gameName = Object.keys(game)[0]
        games[gameName] =
          (games[gameName] || 0) + calculateTotalSession(filterByDate(gameData, startDate, endDate))
      })
    }
  }
  const statDetails = convertObjectToArray(games, "name", "session")
  return { statDetails, results: statDetails.length }
}

export const getPlayersByDates = (analytics: Analytics[], startDate: Date, endDate: Date) => {
  const players: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        const gameData = Object.values(game)[0]
        players[user] =
          (players[user] || 0) + calculateTotalSession(filterByDate(gameData, startDate, endDate))
      })
    }
  }
  const statDetails = convertObjectToArray(players, "name", "session")
  return { statDetails, results: statDetails.length }
}

export const getGameAnalytics = (gameName: string, analytics: Analytics[]) => {
  const totalSessions: { [key: string]: number } = {}
  const avgSessions: { [key: string]: number } = {}
  for (const analytic of analytics) {
    const analyticsData = analytic["analytics"]
    for (const user in analyticsData) {
      analyticsData[user].map(game => {
        if (gameName === Object.keys(game)[0]) {
          const gameData = Object.values(game)[0]
          gameData.forEach(({ date, session }) => {
            const monthYear = date.split("-").slice(1).join("-")
            avgSessions[monthYear] = (avgSessions[monthYear] || 0) + session
            totalSessions[date] = (totalSessions[date] || 0) + session
          })
        }
      })
    }
  }
  for (const date in avgSessions) {
    const [month, year] = date.split("-")
    const days = months[month]
    avgSessions[date] = Math.round(
      avgSessions[date] / (month === "Feb" && isLeapYear(Number(year)) ? days + 1 : days)
    )
  }

  return {
    totalSessions: convertObjectToArray(totalSessions, "date", "session"),
    avgSessions: convertObjectToArray(avgSessions, "date", "session"),
  }
}

export const convertObjectToArray = (
  data: { [key: string]: number },
  prop1: string,
  prop2: string
) => Object.entries(data).map(([key1, key2]) => ({ [prop1]: key1, [prop2]: key2 }))
