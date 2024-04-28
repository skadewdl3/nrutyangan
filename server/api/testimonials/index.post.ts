import TestimonialSchema from '~/server/schemas/Testimonial'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const data = await readBody(event)
  const db = await useDB('nrutyangan')

  const Testimonial = db.model('Testimonial', TestimonialSchema, 'testimonials')
  const testimonial = new Testimonial({
    author: data.author,
    content: data.content,
    stars: 5,
    date: dayjs().utc().format(),
  })

  let newTestimonial: any = await testimonial.save().catch(err => {
    console.log(err)
    return {
      status: 'error',
      message: 'Unknown error while creating testimonial',
    }
  })

  if (!newTestimonial)
    return {
      status: 'error',
      message: 'Unknown error while creating testimonial',
    }
  return {
    status: 'success',
    testimonial: newTestimonial,
  }
})
