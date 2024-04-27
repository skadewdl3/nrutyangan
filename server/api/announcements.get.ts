// write mongoose query to get all events from the events database

import AnnouncementSchema from '../schemas/Announcement'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
dayjs.extend(utc)

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

  const Announcement = db.model(
    'Announcement',
    AnnouncementSchema,
    'announcements'
  )

  let announcements = (
    await Announcement.find({}).sort({ date: -1 }).exec()
  ).map((announcement: any) => {
    const date = dayjs(announcement.date).utc()
    return {
      ...announcement.toObject(),
      month: months[date.month()],
      date: date.date() + 1,
    }
  })

  return {
    announcements,
  }
})
