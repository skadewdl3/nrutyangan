import mongoose from 'mongoose'

export default new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
})
