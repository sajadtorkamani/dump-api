import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { UpdateDumpRequest } from '../../types/requests'
import { makeAsync, validateOrFail } from '../../utilities'

const validate: RequestHandler = async (req, _res, next) => {
  const schema: yup.SchemaOf<UpdateDumpRequest> = yup.object().shape({
    content: yup.string().optional(),
  })

  await validateOrFail(req.body, schema).then(next)
}

const execute: RequestHandler = async (req, res) => {
  // Must authenticate user.

  res.send('Updating dump...')
}

export const updateDump = makeAsync([validate, execute])
