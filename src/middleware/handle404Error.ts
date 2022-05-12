import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

const debug = require('debug')('app:middleware:handle404Error')

export const handle404Error: RequestHandler = (req, res) => {
  debug(`Not found: ${req.method} ${req.url}`)
  
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "Not found. This endpoint doesn't exist." })
}
