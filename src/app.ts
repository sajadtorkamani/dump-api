import bodyParser from 'body-parser'
import express from 'express'
import router from './config/routes'
import { handle404Error } from './middleware/handle404Error'

const app = express()

app.use(router)
app.use(bodyParser.json())
app.use(handle404Error)

export default app
