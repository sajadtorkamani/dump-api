import { Router } from 'express'
import endpoints from './endpoints'

const router = Router()

router.post('/accounts/register', endpoints.register)

export default router