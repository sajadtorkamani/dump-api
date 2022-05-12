import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import jwtService from '../../services/jwtService'
import userService from '../../services/userService'
import { LoginRequest } from '../../types/requests'
import { makeAsync, validateOrFail } from '../../utilities'

const validate: RequestHandler = async (req, _res, next) => {
  const schema: yup.SchemaOf<LoginRequest> = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })

  await validateOrFail(req.body, schema).then(next)
}

const execute: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  const user = await userService.verifyCredentials(email, password)

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid credentials',
    })
  }

  res.status(StatusCodes.CREATED).json({
    token: await jwtService.generateToken(user),
    user: user.toJSON(),
  })
}

export const login = makeAsync([validate, execute])
