import { sanitizeBaseUrl, leftPad } from './utils'

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

test('leftPad', () => {
  expect(leftPad('1', 2)).toEqual(' 1')
  expect(leftPad('1', 4)).toEqual('   1')
  expect(leftPad('22', 2)).toEqual('22')
})
