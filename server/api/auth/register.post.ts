import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Student } from '../../models/Student'

export default defineEventHandler(async event => {
  let body = await readBody(event)
  console.log(body)

  // let student = new Student()
})
