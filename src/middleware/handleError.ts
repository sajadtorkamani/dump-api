import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from '../errors/ValidationError'

const debug = require('debug')('app:middleware:handleError')

/**
 * Handle any errors that haven't been caught in previous middleware.
 */
export const handleError: ErrorRequestHandler = (err, req, res, _next) => {
  debug(err)

  switch (err.name) {
    case ValidationError.name:
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: (err as ValidationError).errors,
      })

    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong.',
      })
  }
}
