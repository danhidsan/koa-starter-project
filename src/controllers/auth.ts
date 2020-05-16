import * as koa from 'koa'
import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

import User, { IUser } from '../models/user'

export const login = async (ctx: koa.Context) => {
  const { email, password } = ctx.request.body

  const userQuery: Promise<IUser> = User.findOne({email: email}).exec()

  await userQuery.then(async (user: IUser) => {
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (isMatch){
      const token: string = sign({_id: user.id}, process.env.JWT_SECRET)
      return ctx.body({token: token})
    }
    ctx.status = 404
    ctx.body = {message: 'Invalid credentials'}
  }).catch((error: Error) => {
    
  })
  
}
