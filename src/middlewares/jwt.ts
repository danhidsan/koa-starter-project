import * as koaJwt from 'koa-jwt'

export default function jwt(jwtSecret: string): koaJwt.Middleware {
    return koaJwt({
      secret: jwtSecret
    })
  }
