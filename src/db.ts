import * as mongoose from 'mongoose'

export default (uri: string) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.info('Successfully connected with database'))
  .catch((error) => {
    console.error('Error connecting to database: ', error)
    return process.exit(1)
  })
}