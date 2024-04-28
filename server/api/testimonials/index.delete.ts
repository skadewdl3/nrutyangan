import TestimonialSchema from '~/server/schemas/Testimonial'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const data = getQuery(event)

  const db = await useDB('nrutyangan')

  const Testimonial = db.model('Testimonial', TestimonialSchema, 'testimonials')

  let found = (await Testimonial.findOneAndDelete({ _id: data.id }).catch(
    err => {
      console.log(err)
      return null
    }
  )) as any

  if (!found) {
    return {
      status: 'error',
      message: 'Unknown error while deleting testimonial',
    }
  }

  return {
    status: 'success',
    testimonial: found,
  }
})
