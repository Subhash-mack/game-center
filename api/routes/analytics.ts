import { Router } from "express"
import AnalyticController from "../controller/analytics"
import { validateDateParams } from "../middleware/analytics"
import { cacheControl, CACHE_CONTROL } from "../middleware/cache-control"

const router = Router()

router
  .route("/players/stats")
  .get(
    validateDateParams,
    cacheControl(CACHE_CONTROL.MAX_AGE_DEFAULT),
    AnalyticController.getPlayers
  )

router
  .route("/games/stats")
  .get(validateDateParams, cacheControl(CACHE_CONTROL.MAX_AGE_DEFAULT), AnalyticController.getGames)

export default router
