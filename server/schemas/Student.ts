import mongoose from 'mongoose'

export default new mongoose.Schema({
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
  hashedPassword: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
})