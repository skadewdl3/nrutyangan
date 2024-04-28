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
  const announcement = new Announcement({
    title: data.title,
    description: data.description,
    date: dayjs().utc().format(),
  })

  let newAnnouncement: any = await announcement.save().catch(err => {
    console.log(err)
    return {
      status: 'error',
      message: 'Unknown error while creating announcement',
    }
  })

  if (!newAnnouncement)
    return {
      status: 'error',
      message: 'Unknown error while creating announcement',
    }
  return {
    status: 'success',
    announcement: newAnnouncement,
  }
})
