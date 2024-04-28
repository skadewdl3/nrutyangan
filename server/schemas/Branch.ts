import mongoose from 'mongoose'

export default new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  coverPhoto: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  days: {
    type: Object,
    required: false,
    default: [],
  },
})
