import UserSchema from '~/server/schemas/User'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const data = getQuery(event)

  const db = await useDB('users')

  const User = db.model('User', UserSchema, 'admins')

  console.log(data.email)

  let found = (await User.findOneAndDelete({ email: data.email }).catch(err => {
    console.log(err)
    return null
  })) as any

  if (!found) {
    return {
      status: 'error',
      message: 'Unknown error while deleting user',
    }
  }

  return {
    status: 'success',
    user: found,
  }
})
