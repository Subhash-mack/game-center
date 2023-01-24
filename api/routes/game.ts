import { Router } from "express"
import GameController from "../controller/game"
import { cacheControl, CACHE_CONTROL } from "../middleware/cache-control"

const router = Router()

router.route("/games").get(cacheControl(CACHE_CONTROL.MAX_AGE_DEFAULT), GameController.getGames)

router
  .route("/games/:id")
  .get(cacheControl(CACHE_CONTROL.MAX_AGE_DEFAULT), GameController.getGameDetail)
  .put(GameController.putGameInactive)

export default router
