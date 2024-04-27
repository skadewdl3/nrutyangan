import TestimonialSchema from '../schemas/Testimonial'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const db = await useDB('nrutyangan')

  const Testimonial = db.model('Testimonial', TestimonialSchema, 'testimonials')

  let testimonials = (
    await Testimonial.find({}).sort({ date: -1 }).limit(3).exec()
  ).map((testimonial: any) => {
    const date = dayjs(testimonial.date).utc()
    return {
      ...testimonial.toObject(),
      date: date.fromNow(),
    }
  })

  return {
    testimonials,
  }
})
