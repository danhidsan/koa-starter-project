import * as Router from 'koa-router'

import { login } from '../controllers/auth'

const authRouter: Router = new Router()

authRouter.post('/login', login)

export default authRouter