import { Router } from 'express'
import { register } from '../routes/accounts/register'

const router = Router()

router.post('/accounts/register', register)

export default router
