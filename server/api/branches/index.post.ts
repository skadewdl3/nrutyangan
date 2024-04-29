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
  const branch = new Branch({
    name: data.name,
    address: data.address,
    days: {},
    coverPhoto: 'katraj.jpg',
  })

  let newBranch: any = await branch.save().catch(err => {
    console.log(err)
    return {
      status: 'error',
      message: 'Unknown error while creating branch',
    }
  })

  if (!newBranch)
    return {
      status: 'error',
      message: 'Unknown error while creating branch',
    }
  return {
    status: 'success',
    branch: newBranch,
  }
})
