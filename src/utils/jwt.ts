import { sign } from 'jsonwebtoken'

interface SignData {
  _id: string
}

export const jwtSign = (data: SignData): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(data, process.env.JWT_SECRET, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}