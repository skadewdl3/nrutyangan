import BranchSchema from '~/server/schemas/Branch'
import { useDB } from '~/composables/useDB'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timeToNow from 'dayjs/plugin/relativeTime.js'
dayjs.extend(timeToNow)
dayjs.extend(utc)

export default defineEventHandler(async event => {
  const data = await readBody(event)

  const db = await useDB('nrutyangan')

  const Branch = db.model('Branch', BranchSchema, 'branches')

  let found = (await Branch.findOneAndUpdate(
    { _id: data.id },
    data.updates
  ).catch(err => {
    console.log(err)
    return null
  })) as any

  if (!found) {
    return {
      status: 'error',
      message: 'Unknown error while updating branch',
    }
  }

  return {
    status: 'success',
    branch: found,
  }
})
