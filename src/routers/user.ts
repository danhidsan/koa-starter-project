import * as Router from "koa-router"

import { listUsers, getUserById, createUser, updateUser } from "../controllers/user"

const userRouter: Router = new Router()

userRouter.get('/user', listUsers)
userRouter.get('/user/:userId', getUserById)
userRouter.post('/user', createUser)
userRouter.put('/user/:userId', updateUser)

export default userRouter