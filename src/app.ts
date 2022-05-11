import bodyParser from 'body-parser'
import express from 'express'
import router from './config/routes'
import { handle404Error } from './middleware/handle404Error'
import { handleError } from './middleware/handleError'

const app = express()

app.use(bodyParser.json())
app.use(router)
app.use(handle404Error)
app.use(handleError)

export default app
