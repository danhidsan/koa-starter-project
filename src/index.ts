import * as Koa from "koa"
import * as Router from "koa-router"

import * as logger from "koa-logger"
import * as json from "koa-json"

import * as bodyParser from "koa-bodyparser"

//DB
import db from './db'

// Routers
import userRouter from './routers/user'
import user from "./models/user"

const app = new Koa()
const router = new Router()

/** Middlewares */
app.use(json())
app.use(logger())
app.use(bodyParser())

/** Routes */
app.use(router.routes()).use(router.allowedMethods())

router.get("/", async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = { message: "This is your GET route" }

  await next()
})

router.post("/data", async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = {
    message: "This is your POST route, attached you can find the data you sent",
    body: ctx.request.body,
  };

  await next()
});

router.use("/api", userRouter.routes()).use(userRouter.allowedMethods())

db("mongodb://localhost:27017/table-db")

app.listen(3000, () => console.log("Server started."))
