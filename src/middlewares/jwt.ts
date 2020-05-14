import * as koaJwt from 'koa-jwt'

export function jwt(): koaJwt.Middleware {
  return koaJwt({
    secret: "$3(R3TP@$$"
  })
}