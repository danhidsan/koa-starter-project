import * as koa from 'koa'
import * as bcrypt from 'bcrypt'

import User, {IUser} from '../models/user'


export const listUsers = async (ctx: koa.Context, next: () => Promise<void>) => {

  const users: Promise<IUser[]> = User.find().exec()

  await users.then((results)=>{
    ctx.body = results
  }).catch((error) => {
    ctx.status = 500
    ctx.body = error
  })

}

export const getUserById = async (ctx: koa.Context, next: () => Promise<void>) => {

  const user: Promise<IUser> = User.findById(ctx.params.userId).exec()

  await user.then((userResult: IUser) => {
    ctx.body = userResult
  }).catch((error) => {
    if (error.name === "CastError") {
      ctx.status = 404
      ctx.body = {message: "User not found"}
    } else {
      ctx.body = error
    }
  })
}

export const createUser = async (ctx: koa.Context, next: () => Promise<void>) => {

  const { username, email, firstName, password } = ctx.request.body

  var newUser: IUser = new User({
    username: username,
    email: email,
    firstName: firstName
  })

  await bcrypt.hash(password, 10)
    .then((hash: string) => {
      newUser.password = hash
    }).catch((error) => {
      return next()
    })
    

  await newUser.save().then((savedUser: IUser)=>{
    ctx.body = {user: savedUser}
  }).catch((error)=>{
    ctx.status = 400
    ctx.body = {error: error}
  })
}

export const updateUser = async (ctx: koa.Context, next: () => Promise<void>) => {

  const { userId } = ctx.params
  const updateParams: {} = ctx.request.body

  await User.findByIdAndUpdate(userId, updateParams).exec().then((updatedUser: IUser) => {
    ctx.body = { message: 'User updated', user: updatedUser }
  }).catch((error)=> {
    if (error.name === "CastError") {
      ctx.body = { message: 'User not found' }
    }else {
      ctx.body = error
    }
  })
}