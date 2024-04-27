import mongoose from 'mongoose'

export default new mongoose.Schema({
  author: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
})
