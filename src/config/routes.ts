import { Router } from 'express'
import { confirmEmail } from '../routes/accounts/confirmEmail'
import { register } from '../routes/accounts/register'

const router = Router()

router.post('/accounts/register', register)
router.get('/accounts/confirm-email/:token', confirmEmail)

export default router
