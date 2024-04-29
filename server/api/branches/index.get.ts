import { useDB } from '~/composables/useDB'
import { useFirebase } from '~/composables/useFirebase'
import BranchSchema from '~/server/schemas/Branch'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

export default defineEventHandler(async () => {
  const db = await useDB('nrutyangan')
  const Branch = db.model('Branch', BranchSchema, 'branches')
  const bucket = await useFirebase()

  let branches = await Branch.find({})

  let urls = await Promise.all(
    branches.map(async (event: any) => {
      return (
        await bucket.file(`branches/${event.coverPhoto}`).getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60,
        })
      )[0]
    })
  )

  branches = branches.map((branch: any, index: number) => {
    let days = {}
    branch = branch.toObject()

    for (let day in branch.days) {
      // @ts-ignore
      days[day] = branch.days[day].map(({ start, end }) => {
        start = String(start)
        if (!start.includes('.')) start += '.0'

        end = String(end)
        if (!end.includes('.')) end += '.0'

        return `${dayjs(start, 'H.m').format('h:mm A')} - ${dayjs(
          end,
          'H.m'
        ).format('h:mm A')}`
      })
    }
    return {
      ...branch,
      days,
      coverPhoto: urls[index],
    }
  })

  return {
    branches,
  }
})
