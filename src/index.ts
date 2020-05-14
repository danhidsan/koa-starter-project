import * as Koa from "koa"
import * as Router from "koa-router"

import * as logger from "koa-logger"
import * as json from "koa-json"

import * as bodyParser from "koa-bodyparser"

//DB
import db from './db'

// Routers
import userRouter from './routers/user'
import authRouter from './routers/auth'

const apiRouter = new Router()

const app = new Koa()

/** Middlewares */
app.use(json())
app.use(logger())
app.use(bodyParser())

apiRouter.use('/api', userRouter.routes(), userRouter.allowedMethods(), authRouter.routes(), authRouter.allowedMethods())

app.use(apiRouter.routes())

db("mongodb://localhost:27017/table-db")

app.listen(3000, () => console.log("Server started."))
