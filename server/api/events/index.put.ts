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

  let found = (await Event.findOneAndUpdate(
    { _id: data.id },
    data.updates
  ).catch(err => {
    console.log(err)
    return null
  })) as any

  if (!found) {
    return {
      status: 'error',
      message: 'Unknown error while updating event',
    }
  }

  return {
    status: 'success',
    event: found,
  }
})
