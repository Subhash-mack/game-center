import express,{Express, Request} from "express";
import cors from "cors";
import { Context } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";
import analyticsRouter from "./api/routes/analytics"
import gameRouter from "./api/routes/game";

export default (app: Express, context: Context) => {
    app.use(cors());
    app.use(express.json({limit:"2mb"}))
    app.use("/api/v1",async (req: Request, res, next) => {
        req.context = await context.withRequest(req, res);
        next();
      },analyticsRouter, gameRouter);
}
