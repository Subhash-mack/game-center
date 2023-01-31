import { Request, Response } from "express"
import { getGamesByDates, getPlayersByDates } from "../../helper/helper"
import { Analytics } from "../../types/analytics"

export default class AnalyticController {
  static getGames = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const { startDate, endDate } = req
      const analytics = (await context?.query.Analytic.findMany({
        query: "id analytics",
      })) as Analytics[]
      if (startDate && endDate) res.status(200).send(getGamesByDates(analytics, startDate, endDate))
    } catch (err: any) {
      res.status(500).send(err)
    }
  }

  static getPlayers = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const { startDate, endDate } = req
      const analytics = (await context?.query.Analytic.findMany({
        query: "id analytics",
      })) as Analytics[]
      res.status(200).send(getPlayersByDates(analytics, startDate, endDate))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
