import * as koa from 'koa'
import * as bcrypt from 'bcrypt'
import { jwtSign } from '../utils/jwt'

import User, { IUser } from '../models/user'

export const login = async (ctx: koa.Context) => {
  const { email, password } = ctx.request.body

  const userQuery: Promise<IUser> = User.findOne({email: email}).exec()

  await userQuery.then(async (user: IUser) => {
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch){
      ctx.status = 404
      return ctx.body = {message: 'Invalid credentials'}
    }
    await jwtSign({_id: user.id})
      .then((token) => {
        ctx.body = {token: token}
      })
      .catch((err) => {
        
      })
  }).catch((error: Error) => {
    
  })
  
}
