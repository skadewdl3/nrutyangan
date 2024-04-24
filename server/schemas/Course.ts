import mongoose from 'mongoose'

export default new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  course_id: {
    type: String,
    trim: true,
    required: true,
  },
  teacher_id: {
    type: Array,
    required: false,
  },
})
