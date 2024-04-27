import { useDB } from '~/composables/useDB'
import UserSchema from '~/server/schemas/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async event => {
  const db = await useDB('users')
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  const User = db.model('User', UserSchema, 'admins')

  let found = (await User.findOne({ email: body.email }).catch(err =>
    console.log(err)
  )) as any

  if (bcrypt.compareSync(body.password, found.hashedPassword)) {
    let token = jwt.sign(
      {
        email: found.email,
        id: found._id,
      },
      runtimeConfig.public.JWT_SECRET as string,
      { expiresIn: '1d' }
    )

    return {
      token,
    }
  }

  return {
    token: null,
  }
})
