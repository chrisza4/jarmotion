export function sanitizeBaseUrl(url: string) {
  return url.endsWith('/') ? url : url + '/'
}
