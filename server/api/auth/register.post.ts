import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import StudentSchema from '../../schemas/Student'
import { useDB } from '~/composables/useDB'

export default defineEventHandler(async event => {
  const db = await useDB('students')
  let body = await readBody(event)

  let Student = db.model('Student', StudentSchema)
  let student = new Student(body)
  let hashedPassword = bcrypt.hashSync(body.password, 10)
  student.hashedPassword = hashedPassword

  let newStudent: any = await student.save().catch(err => {
    if (err.code == 11000) {
      return { status: 'error', message: 'Email already exists' }
    }
  })

  if (!newStudent)
    return { status: 'error', message: 'Unknown error while creating account' }
  newStudent.hashedPassword = undefined

  return {
    status: 'success',
    student: newStudent,
  }
})
