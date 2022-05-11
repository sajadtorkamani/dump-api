import { RequestHandler } from 'express'

export const register: RequestHandler = (req, res) => {
  res.send('Register')
}

const endpoints = {
  register,
}

export default endpoints
