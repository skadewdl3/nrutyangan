import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import UserSchema from '../../schemas/User'
import { useDB } from '~/composables/useDB'

export default defineEventHandler(async event => {
  const db = await useDB('users')
  let body = await readBody(event)

  let User = db.model('User', UserSchema, 'admins')
  let user = new User(body)
  let hashedPassword = bcrypt.hashSync(body.password, 10)
  user.hashedPassword = hashedPassword

  let newUser: any = await user.save().catch(err => {
    if (err.code == 11000) {
      return { status: 'error', message: 'Email already exists' }
    }
  })

  console.log('new user created')
  

  if (!newUser)
    return { status: 'error', message: 'Unknown error while creating account' }
  newUser.hashedPassword = undefined

  return {
    status: 'success',
    user: newUser,
  }
})
