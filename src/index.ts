import * as dotenv from 'dotenv'

import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as bodyParser from 'koa-bodyparser'

//DB
import db from './db'

// Routers
import userRouter from './routers/user'
import authRouter from './routers/auth'

dotenv.config()

const apiRouter = new Router()

const app = new Koa()

/** Middlewares */
app.use(json())
app.use(logger())
app.use(bodyParser())

apiRouter.get('/', async (ctx: Koa.Context, next: () => Promise<void>)  => {
  const health: {} = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }

  ctx.body = health

  await next()
})

apiRouter.use('/api', userRouter.routes(), userRouter.allowedMethods(), authRouter.routes(), authRouter.allowedMethods())

app.use(apiRouter.routes())

db(process.env.MONGODB_URI)

app.listen(process.env.PORT, () => console.log('Server started.'))
