import { isUuid, leftPad, sanitizeBaseUrl } from './utils'

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

test('isUuid', () => {
  expect(isUuid('32e789bf-70f3-4102-8b00-76e53f4673ab')).toBeTruthy()
  expect(isUuid('42b27180-0dd4-11ea-a9de-4596ef2e8d96')).toBeTruthy()
  expect(isUuid('https://wwww.google.com')).toBeFalsy()
})
