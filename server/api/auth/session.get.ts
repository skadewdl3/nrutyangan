import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const session = getServerSession(event)

  if (!session) return { status: 'unauthenticated' }
  return { status: 'authenticated', session }
})
