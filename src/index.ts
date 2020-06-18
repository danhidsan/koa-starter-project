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

const app = new Koa()

/** Middlewares */
app.use(json())
app.use(logger())
app.use(bodyParser())

const apiRouter = new Router({ prefix: '/api' })
apiRouter.use(authRouter.routes(), authRouter.allowedMethods())
apiRouter.use(userRouter.routes(), userRouter.allowedMethods())

const router = new Router()
router.get('/', async (ctx: Koa.Context, next: () => Promise<void>)  => {
  const health: {} = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }

  ctx.body = health

  await next()
})

app
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(router.routes())
  .use(router.allowedMethods())

db(process.env.MONGODB_URI)

// tslint:disable-next-line:no-console
app.listen(3000, () => console.log(`Server started in port ${3000}`))

