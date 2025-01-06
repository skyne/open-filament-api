import dotenv from 'dotenv'

dotenv.config();

export const app = {
  env: process.env.NODE_ENV || 'production',
  port: (process.env.PORT || 3000) as number,
}


export const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  dbName: process.env.MONGO_DB || 'test',
  user: process.env.MONGO_USER || 'user',
  password: process.env.MONGO_PASSWORD || 'password',
}
