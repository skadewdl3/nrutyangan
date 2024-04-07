import { useFirebase } from '~/composables/useFirebase'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  let names = body.names
  let bucket = await useFirebase()
  let urls = await Promise.all(
    names.map(async (name: string) => {
        return (
          await bucket.file(name).getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60,
          })
        )[0]
    })
  )
  return urls
})
