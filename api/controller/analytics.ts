import { Request, Response } from "express"
import { getGames, getPlayers } from "../../helper/helper"
import { analytics } from "../../types/analytics"

export default class AnalyticController {
  static topGames = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const analytics = (await context?.query.Analytic.findMany({
        query: "id analytics",
      })) as analytics[]
      console.log(analytics)
      res.status(200).send(getGames(analytics))
    } catch (err: any) {
      res.status(500).send(err)
    }
  }

  static topPlayers = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const analytics = (await context?.query.Analytic.findMany({
        query: "id analytics",
      })) as analytics[]
      res.status(200).send(getPlayers(analytics))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
