import { useFirebase } from '~/composables/useFirebase'

export default defineEventHandler(async event => {
  let { folder = '/' } = await readBody(event)
  console.log('folder is: ', folder)

  let bucket = await useFirebase()
  let files = await bucket.getFiles({
    prefix: `${folder}/`,
    matchGlob: '**/*.{jpg,png,jpeg}',
  })
  console.log(files[0].length)

  return files[0].map(file => file.name)
})
