import { useDB } from '~/composables/useDB'
import { useFirebase } from '~/composables/useFirebase'
import BranchSchema from '~/server/schemas/Branch'

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

  branches = branches.map((event: any, index: number) => {
    return {
      ...event.toObject(),
      coverPhoto: urls[index],
    }
  })

  console.log(branches)

  return {
    branches,
  }
})
