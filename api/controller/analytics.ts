import { Request, Response } from "express"
import { getGames, getPlayers } from "../../helper/helper"

export default class AnalyticController {
  static topGames = async (req: Request, res: Response) => {
    const { context } = req
    const data = await context?.query.Analytic.findMany({ query: "id analytics" })
    const analytics = data?.[0]?.analytics
    res.status(200).send(getGames(analytics))
  }

  static topPlayers = async (req: Request, res: Response) => {
    const { context } = req
    const data = await context?.query.Analytic.findMany({ query: "id analytics" })
    const analytics = data?.[0]?.analytics
    res.status(200).send(getPlayers(analytics))
  }
}
