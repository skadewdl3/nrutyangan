// write mongoose query to get all events from the events database

import EventSchema from '../schemas/Event'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { useFirebase } from '~/composables/useFirebase'

dayjs.extend(utc)
dayjs.extend(relativeTime)

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default defineEventHandler(async event => {
  const db = await useDB('nrutyangan')
  const bucket = await useFirebase()

  const Event = db.model('Event', EventSchema, 'events')

  let events = (await Event.find({}).sort({ date: -1 }).exec()).map(
    (event: any) => {
      const date = dayjs(event.date).utc()
      return {
        ...event.toObject(),
        date: date.fromNow(),
      }
    }
  )

  let urls = await Promise.all(
    events.map(async (event: any) => {
      return (
        await bucket.file(`${event.id}/${event.coverPhoto}`).getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60,
        })
      )[0]
    })
  )

  events = events.map((event: any, index: number) => {
    return {
      ...event,
      coverPhoto: urls[index],
    }
  })

  console.log(events)

  return {
    events,
  }
})
