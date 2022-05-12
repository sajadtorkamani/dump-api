import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import jwtService from '../../services/jwtService'
import userService from '../../services/userService'
import { RegisterRequest } from '../../types/requests'
import { makeAsync, validateOrFail } from '../../utilities'

const validate: RequestHandler = async (req, _res, next) => {
  const schema: yup.SchemaOf<RegisterRequest> = yup.object().shape({
    email: yup
      .string()
      .required()
      .email()
      .test('is-email-available', '${path} is already registered', (email) =>
        userService.isEmailAvailable(email as string)
      ),
    password: yup.string().required().min(6),
  })

  await validateOrFail(req.body, schema).then(next)
}

const execute: RequestHandler = async (req, res) => {
  const user = await userService.createUser(req.body)
  await userService.sendConfirmEmailInstructions(user)

  res.status(StatusCodes.CREATED).json({
    token: await jwtService.generateToken(user),
    user: user.toJSON()
  })
}

export const register = makeAsync([validate, execute])
