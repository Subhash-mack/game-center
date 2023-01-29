import { Request, Response } from "express"
import { getGameAnalytics } from "../../helper/helper"
import { Analytics } from "../../types/analytics"

export default class GameController {
  static getGames = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const data = await context?.query.Game.findMany({
        query: "id, image {id, url} tags {id, name} name, isActive, modifiedAt",
      })
      res.status(200).send(data)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  static putGameInactive = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const id = req.params.id
      const { isActive } = req.body
      const data = await context?.query.Game.updateOne({
        where: { id },
        data: {
          isActive: !isActive,
        },
      })
      res.status(200).send(200)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  static getGameDetail = async (req: Request, res: Response) => {
    try {
      const { context } = req
      const id = req.params.id
      const gameData = await context?.query.Game.findOne({
        where: { id },
        query:
          "id, name, description, createdAt,modifiedAt, isActive,image {id, url} tags {id, name}",
      })
      const analyticsData = (await context?.query.Analytic.findMany({
        query: "id analytics",
      })) as Analytics[]
      if(gameData){
        const result = { ...gameData, graph: getGameAnalytics(gameData?.name, analyticsData) }
        res.status(200).send(result)
      }
      else{
        res.status(400).send({message:"Invalid Id"})
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
