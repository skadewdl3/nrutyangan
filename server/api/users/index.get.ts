import { useDB } from '~/composables/useDB'
import UserSchema from '~/server/schemas/User'

export default defineEventHandler(async () => {
  const db = await useDB('users')
  const User = db.model('User', UserSchema, 'admins')

  let users = await User.find({})

  return {
    users,
  }
})
