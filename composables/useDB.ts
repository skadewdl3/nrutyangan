import mongoose from 'mongoose'

let result: any = undefined
let currentDB: string = 'default'

const config = useRuntimeConfig()
const mongoURI = `${config.public.MONGO_URI}/${currentDB}` as string

const options = {}

export const useDB = async (dbName: string) => {
  if (!result) {
    result = await mongoose
      .connect(mongoURI, options)
      .catch(err => console.log(err))
  }
  return mongoose.connection.useDb(dbName)
}
