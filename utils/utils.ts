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
