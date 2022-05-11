import { RequestHandler } from 'express'
import * as yup from 'yup'
import { RegisterRequest } from '../../types/requests'
import { makeAsync, validateOrFail } from '../../utilities'

const validate: RequestHandler = async (req, res, next) => {
  const schema: yup.SchemaOf<RegisterRequest> = yup.object().shape({
    email: yup.string().required().email(),
    // .test('is-email-available', '${path} is already registered', (email) =>
    //   isEmailAvailable(email as string)
    // ),
    password: yup.string().required().min(6),
  })

  await validateOrFail(req.body, schema).then(next)
}

const execute: RequestHandler = async (req, res) => {
  // const registerDto = req.body as RegisterDto
  // const user = await createUser(registerDto)
  // await sendWelcomeEmail(user)

  // return res.status(StatusCodes.CREATED).json({
  //   token: await generateJwt(user),
  //   payload: generatePayload(user),
  // })
  res.send('registering...')
}

export const register = makeAsync([validate, execute])
