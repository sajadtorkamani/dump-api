import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import userService from '../../services/userService'
import { makeAsync } from '../../utilities'

const execute: RequestHandler = async (req, res) => {
  const isEmailConfirmed = await userService.confirmUserEmail(req.params.token)

  return isEmailConfirmed
    ? res.send('Email confirmed. Yay')
    : res.send('Confirmation token has either expired or is invalid.')
}

export const confirmEmail = makeAsync([execute])
