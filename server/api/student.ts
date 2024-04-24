import { useDB } from '~/composables/useDB'
import StudentSchema from '../schemas/Student'

export default defineEventHandler(async () => {
  const db = await useDB('students')
  const Student = db.model('Student', StudentSchema)

  Student.findOne({})
})
