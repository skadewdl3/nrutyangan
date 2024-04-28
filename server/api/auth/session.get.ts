import jwt from 'jsonwebtoken'
import { useDB } from '~/composables/useDB'
import UserSchema from '~/server/schemas/User'
import getToken from '#auth'

export default defineEventHandler(async event => {
  const cookie = getCookie(event, 'auth:token')
  if (!cookie) {
    return {
      status: 'unauthenticated',
    }
  }
  setCookie(event, 'auth:token', cookie, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
  const config = useRuntimeConfig()

  const verification: any = jwt.verify(
    cookie as string,
    config.public.JWT_SECRET
  )

  const User = (await useDB('users')).model('User', UserSchema, 'users')

  let found = await User.findOne({ email: verification.email }).catch(err =>
    console.log(err)
  )

  if (!found)
    return {
      status: 'unauthenaticated',
    }

  if (found)
    return {
      status: 'authenticated',
      token: cookie,
      session: {
        email: found?.email,
        firstName: found?.firstName,
        lastName: found?.lastName,
        _id: found?._id,
      },
    }
  else
    return {
      status: 'unauthenticated',
    }
})
