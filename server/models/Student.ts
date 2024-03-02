import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  hashed_password: {
    type: String,
  },
})

export interface IStudent {
  firstName: string
  lastName: string
  email: string
}

export const Student = mongoose.model('Student', StudentSchema)
