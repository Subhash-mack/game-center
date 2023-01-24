import { Router } from "express"
import GameController from "../controller/game"

const router = Router()

router.route("/games").get(GameController.getGames)

router.route("/games/:id")
.get(GameController.getGameDetail)
.put(GameController.putGameInactive)

export default router
