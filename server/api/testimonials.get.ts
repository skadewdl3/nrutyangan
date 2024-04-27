// write mongoose query to get all events from the events database

import TestimonialSchema from '../schemas/Testimonial'
import { useDB } from '~/composables/useDB'

export default defineEventHandler(async event => {
  const db = await useDB('nrutyangan')

  const Testimonial = db.model('Testimonial', TestimonialSchema, 'testimonials')

  let testimonials = await Testimonial.find({})
    .sort({ date: -1 })
    .limit(3)
    .exec()

  return {
    testimonials,
  }
})
