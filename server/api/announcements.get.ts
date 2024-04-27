// write mongoose query to get all events from the events database

import AnnouncementSchema from '../schemas/Announcement'
import { useDB } from '~/composables/useDB'

export default defineEventHandler(async event => {
  const db = await useDB('nrutyangan')

  const Announcement = db.model(
    'Announcement',
    AnnouncementSchema,
    'announcements'
  )

  let announcements = await Announcement.find({})

  return {
    announcements,
  }
})
