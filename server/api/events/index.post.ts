import EventSchema from '~/server/schemas/Event'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async e => {
  const data = await readBody(e)
  const db = await useDB('nrutyangan')

  const Event = db.model('Event', EventSchema, 'events')
  const event = new Event({
    name: data.name,
    date: dayjs().utc().format(),
    id: 'images',
    coverPhoto: 'IMG-20240318-WA0012.jpg',
  })

  let newEvent: any = await event.save().catch(err => {
    console.log(err)
    return {
      status: 'error',
      message: 'Unknown error while creating event',
    }
  })

  if (!newEvent)
    return {
      status: 'error',
      message: 'Unknown error while creating event',
    }
  return {
    status: 'success',
    event: newEvent,
  }
})
