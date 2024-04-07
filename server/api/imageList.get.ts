import { useFirebase } from '~/composables/useFirebase'

export default defineEventHandler(async () => {
  let bucket = await useFirebase()
  let files = await bucket.getFiles()
  return files[0]
})
