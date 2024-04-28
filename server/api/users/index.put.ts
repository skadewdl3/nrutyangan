import UserSchema from '~/server/schemas/User'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
import bcrypt from 'bcrypt'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const { updates: data } = await readBody(event)

  const db = await useDB('users')

  const User = db.model('User', UserSchema, 'admins')

  let hashedPassword = null
  if (data.resetPassword) {
    hashedPassword = bcrypt.hashSync(data.password, 10)
  }

  let updates = hashedPassword
    ? {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        hashedPassword,
      }
    : {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }

  let found = (await User.findOneAndUpdate(
    { email: data.email },
    updates
  ).catch(err => {
    console.log(err)
    return null
  })) as any

  if (!found) {
    return {
      status: 'error',
      message: 'Unknown error while updating user',
    }
  }

  return {
    status: 'success',
    user: found,
  }
})
