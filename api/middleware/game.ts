import { Request, Response, NextFunction } from "express"
export const putRequestValidation = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.body?.isActive !== "boolean") {
    return res.status(400).send({ message: "Invalid request body" })
  }
  return next()
}
