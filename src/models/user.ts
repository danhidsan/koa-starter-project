import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

import { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  firstName: string
  password: string
}

const UserSchema: Schema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  password: {type: String, required: true}
})

export default mongoose.model<IUser>('User', UserSchema)