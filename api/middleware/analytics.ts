import { Request, Response, NextFunction } from "express"
import { isValidDate, getDate } from "../../helper/helper"

export const validateDateParams = (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate } = req.query
  const sDate = startDate as string,
    eDate = endDate as string
  if ((sDate && !isValidDate(sDate)) || (endDate && !isValidDate(eDate))) {
    return res.status(400).send({ message: "Invalid start or end date" })
  }
  const start = isValidDate(sDate) ? getDate(sDate) : getDate("1-Jan-1970")
  const end = isValidDate(eDate) ? getDate(eDate) : getDate()
  req.startDate = start
  req.endDate = end
  next()
}
