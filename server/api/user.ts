import { useDB } from '~/composables/useDB'
import UserSchema from '../schemas/User'

export default defineEventHandler(async () => {
  const db = await useDB('users')
  const User = db.model('User', UserSchema, 'admins')

  User.findOne({})
})
