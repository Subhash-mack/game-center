import { Router } from "express"
import AnalyticController from "../controller/analytics"

const router = Router()

router.route("/top-players").get(AnalyticController.topPlayers)

router.route("/top-games").get(AnalyticController.topGames)

export default router
