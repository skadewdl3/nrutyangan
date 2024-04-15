import { useFirebase } from '~/composables/useFirebase'

export default defineEventHandler(async event => {
  let { folder = '/' } = await readBody(event)

  let bucket = await useFirebase()
  let files = await bucket.getFiles({
    prefix: `${folder}/`,
    matchGlob: '**/*.{jpg,png,jpeg}',
  })

  return files[0].map(file => file.name)
})
