import jwt from 'jsonwebtoken'
import { useDB } from '~/composables/useDB'
import CourseSchema from '~/server/schemas/Course'
import StudentSchema from '~/server/schemas/Student'

export default defineEventHandler(async event => {
  const cookie = getCookie(event, 'auth:token')
  // setCookie(event, 'auth:token', cookie as string, {
  //   maxAge: 60 * 60 * 24,
  //   sameSite: 'lax',
  // })
  const config = useRuntimeConfig()

  const verification: any = jwt.verify(
    cookie as string,
    config.public.JWT_SECRET
  )

  const Student = (await useDB('students')).model(
    'Student',
    StudentSchema,
    'students'
  )
  const Course = (await useDB('coursedetails')).model(
    'Course',
    CourseSchema,
    'courses'
  )

  let found = await Student.findOne({ email: verification.email }).catch(err =>
    console.log(err)
  )

  if (!found)
    return {
      status: 'unauthenaticated',
    }

  let course = await Course.findOne({ course_id: found.course })

  if (found)
    return {
      status: 'authenticated',
      token: cookie,
      session: {
        email: found?.email,
        firstName: found?.firstName,
        lastName: found?.lastName,
        _id: found?._id,
        course,
      },
    }
  else
    return {
      status: 'unauthenticated',
    }
})
