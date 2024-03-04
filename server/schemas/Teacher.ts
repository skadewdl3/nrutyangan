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
  teacher_id: {
    type: String,
    required: false,
  },
})
