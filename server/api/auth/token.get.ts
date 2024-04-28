export default defineEventHandler(event => {
  const cookie = getCookie(event, 'auth:token')
  return cookie as string
})
