import { useDB } from '~/composables/useDB'
import StudentSchema from '~/server/schemas/Student'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async event => {
  const db = await useDB('students')
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  const Student = db.model('Student', StudentSchema)

  let found = (await Student.findOne({ email: body.email }).catch(err =>
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
