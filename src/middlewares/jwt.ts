import * as koaJwt from 'koa-jwt'

export function jwt(): koaJwt.Middleware {
  return koaJwt({
    secret: process.env.JWT_SERCRET
  })
}