import AnnouncementSchema from '~/server/schemas/Announcement'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const data = await readBody(event)

  const db = await useDB('nrutyangan')

  const Announcement = db.model(
    'Announcement',
    AnnouncementSchema,
    'announcements'
  )

  let found = (await Announcement.findOneAndUpdate(
    { _id: data.id },
    data.updates
  ).catch(err => {
    console.log(err)
    return null
  })) as any

  if (!found) {
    return {
      status: 'error',
      message: 'Unknown error while updating announcement',
    }
  }

  return {
    status: 'success',
    announcement: found,
  }
})
