import { Request, Response } from "express"
import { getGames, getPlayers } from "../../helper/helper"
import { Analytics } from "../../types/analytics"

export default class AnalyticController {
  static topGames = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const analytics = (await context?.query.Analytic.findMany({
        query: "id analytics",
      })) as Analytics[]
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
      })) as Analytics[]
      res.status(200).send(getPlayers(analytics))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
