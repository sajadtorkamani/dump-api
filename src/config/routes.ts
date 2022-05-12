import { Router } from 'express'
import { confirmEmail } from '../routes/accounts/confirmEmail'
import { login } from '../routes/accounts/login'
import { register } from '../routes/accounts/register'

const router = Router()

router.post('/accounts/register', register)
router.post('/accounts/login', login)
router.get('/accounts/confirm-email/:token', confirmEmail)

export default router
