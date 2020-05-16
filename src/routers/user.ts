import * as Router from 'koa-router'

import { listUsers, getUserById, createUser, updateUser } from '../controllers/user'
import { jwt } from '../middlewares/jwt'

const userRouter: Router = new Router()

userRouter.get('/user', jwt(), listUsers)
userRouter.get('/user/:userId', jwt(), getUserById)
userRouter.post('/user', createUser)
userRouter.put('/user/:userId', jwt(), updateUser)

export default userRouter