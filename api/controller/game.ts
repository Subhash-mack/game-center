import { Request, Response } from "express"

export default class GameController {
  static getGames = async (req: Request, res: Response) => {
    const { context } = req
    const data = await context?.query.Game.findMany({
      query: "id, image {id, url} tags {id, name} name, isActive, modifiedAt",
    })
    res.status(200).send(data)
  }
  static getGameDetail = async (req: Request, res: Response) => {
    const { context } = req
    const id = req.params.id
    const data = await context?.query.Game.findOne({
      where: { id },
      query:
        "id, name, description, createdAt,modifiedAt, isActive,image {id, url} tags {id, name}",
    })
    res.status(200).send(data)
  }
}
