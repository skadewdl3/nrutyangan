import { useFirebase } from '~/composables/useFirebase'

export default defineEventHandler(async event => {
  const { name } = await readBody(event)
  let bucket = await useFirebase()
  let urls = await bucket.file(name).getSignedUrl({
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60,
  })
  return urls[0]
})
