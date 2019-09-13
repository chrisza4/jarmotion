import { sanitizeBaseUrl } from './utils'

describe('sanitizeBaseUrl', () => {
  it('Automatically fill / at the end if not exists', () => {
    expect(sanitizeBaseUrl('https://a5578c7f.ngrok.io')).toEqual(
      'https://a5578c7f.ngrok.io/'
    )
    expect(sanitizeBaseUrl('https://a5578c7f.ngrok.io/')).toEqual(
      'https://a5578c7f.ngrok.io/'
    )
  })
})
