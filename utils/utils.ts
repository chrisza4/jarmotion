export function sanitizeBaseUrl(url: string) {
  return url.endsWith('/') ? url : url + '/'
}

export function leftPad(str: string, length: number) {
  const spaces = length - str.length
  if (spaces <= 0) {
    return str
  }
  let space = ''
  for (let i = 0; i < spaces; i++) {
    space += ' '
  }
  return space + str
}

export function getHumanMonth(date: Date) {
  return date.getMonth() + 1
}

export function isUuid(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    uuid
  )
}

export function randomToRange(start: number, end: number) {
  const range = end - start
  return Math.random() * range + start
}
