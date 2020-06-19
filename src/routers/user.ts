import * as Router from 'koa-router'

import { listUsers, getUserById, createUser, updateUser } from '../controllers/user'
import jwt from '../middlewares/jwt'

const jwtSecret = process.env.JWT_SECRET

const userRouter: Router = new Router()

userRouter.get('/user', jwt(jwtSecret), listUsers)
userRouter.get('/user/:userId', jwt(jwtSecret), getUserById)
userRouter.post('/user', createUser)
userRouter.put('/user/:userId', jwt(jwtSecret), updateUser)

export default userRouter