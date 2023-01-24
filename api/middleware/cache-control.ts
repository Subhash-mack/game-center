import { Request, Response, NextFunction } from "express"

export enum CACHE_CONTROL {
  NO_STORE = "no-cache, no-store, must-revalidate",
  NO_CACHE = "no-cache, must-revalidate",
  MAX_AGE_ZERO = "max-age=0",
  MAX_AGE_ONE_MINUTE = "max-age=60",
  MAX_AGE_FIVE_MINUTE = "max-age=300",
  MAX_AGE_DEFAULT = "max-age=900",
}

export const cacheControl =
  (value: CACHE_CONTROL) =>
  (_: Request, res: Response, next: NextFunction): void => {
    res.header("Cache-Control", value)
    if (value === CACHE_CONTROL.NO_STORE) {
      res.header("Pragma", "no-cache")
      res.header("Expires", "0")
    }
    return next()
  }
