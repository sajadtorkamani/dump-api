import express from 'express'
import accounts from './modules/accounts'

const app = express()

app.use(accounts.router)

export default app
