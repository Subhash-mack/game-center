import { Router } from "express"
import AnalyticController from "../controller/analytics"
import { cacheControl, CACHE_CONTROL } from "../middleware/cache-control"

const router = Router()

router
  .route("/players/stats")
  .get(cacheControl(CACHE_CONTROL.MAX_AGE_DEFAULT), AnalyticController.topPlayers)

router
  .route("/games/stats")
  .get(cacheControl(CACHE_CONTROL.MAX_AGE_DEFAULT), AnalyticController.topGames)

export default router
