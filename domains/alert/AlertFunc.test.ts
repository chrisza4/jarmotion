import { getMockUser } from '../users/UserMocks'
import { getDisplayableAlert } from './AlertFunc'
import { getMockAlert } from './AlertMocks'
import { AlertSource } from './AlertTypes'

describe('getDisplayAbleAlert', () => {
  it('Get displayableAlert from me to my loved', () => {
    const alert = getMockAlert({ owner_id: 'me', to_user_id: 'awaId' })
    const me = getMockUser({ id: 'me', name: 'chris' })
    const others = [getMockUser({ id: 'awaId', name: 'awa' })]

    const actual = getDisplayableAlert(alert, me, others)
    expect(actual.alertId).toEqual(alert.id)
    expect(actual.message).toEqual('You sent an alert to awa')
    expect(actual.status).toEqual(alert.status)
    expect(actual.side).toEqual(AlertSource.MeSent)
  })

  it('Get displayableAlert from my loved to me', () => {
    const alert = getMockAlert({ owner_id: 'awaId', to_user_id: 'me' })
    const me = getMockUser({ id: 'me', name: 'chris' })
    const others = [getMockUser({ id: 'awaId', name: 'awa' })]

    const actual = getDisplayableAlert(alert, me, others)
    expect(actual.alertId).toEqual(alert.id)
    expect(actual.message).toEqual('You received an alert from awa!!!!')
    expect(actual.status).toEqual(alert.status)
    expect(actual.side).toEqual(AlertSource.MeReceived)
  })
})
