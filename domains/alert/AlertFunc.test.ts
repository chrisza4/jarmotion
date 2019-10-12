import { getMockUser } from '../users/UserMocks'
import { getDisplayableAlert } from './AlertFunc'
import { getMockAlert } from './AlertMocks'
import { AlertSource } from './AlertTypes'

describe('getDisplayAbleAlert', () => {
  it('Get displayableAlert from me to my loved', () => {
    const alert = getMockAlert({ owner_id: 'me', to_user_id: 'awa' })
    const me = getMockUser('chakrit', 'chris', 'me')
    const others = [getMockUser('awa', 'awa', 'awa')]

    const actual = getDisplayableAlert(alert, me, others)
    expect(actual.alertId).toEqual(alert.id)
    expect(actual.message).toEqual('You sent an alert to awa')
    expect(actual.status).toEqual(alert.status)
    expect(actual.side).toEqual(AlertSource.MeSent)
  })

  it('Get displayableAlert from my loved to me', () => {
    const alert = getMockAlert({ owner_id: 'awa', to_user_id: 'me' })
    const me = getMockUser('chakrit', 'chris', 'me')
    const others = [getMockUser('awa', 'awa', 'awa')]

    const actual = getDisplayableAlert(alert, me, others)
    expect(actual.alertId).toEqual(alert.id)
    expect(actual.message).toEqual('You received an alert from awa!!!!')
    expect(actual.status).toEqual(alert.status)
    expect(actual.side).toEqual(AlertSource.MeReceived)
  })
})
