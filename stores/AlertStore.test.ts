import * as AlertServices from '../apiServices/alertServices'
import { getMockAlert } from '../domains/alert/AlertMocks'
import AlertStore from './AlertStore'
import { LoadingStateStatus } from '../types/LoadingState'

jest.mock('../apiServices/alertServices.ts')
describe('AlertStore', () => {
  describe('init', () => {
    it('Should fetch data into alert store if success', async () => {
      const mockFetchAlerts = AlertServices.fetchAlerts as jest.Mock
      const alerts = [getMockAlert({}), getMockAlert({})]
      mockFetchAlerts.mockResolvedValue(alerts)
      await AlertStore.init()
      expect(AlertStore.alerts).toEqual(alerts)
    })

    it('Should turn into error loading state if cannot load data', async () => {
      const mockFetchAlerts = AlertServices.fetchAlerts as jest.Mock
      mockFetchAlerts.mockRejectedValue(Error('Not connected'))
      await AlertStore.init()
      expect(AlertStore.loadState.status).toEqual(LoadingStateStatus.Error)
    })
  })

  describe('fetchById', () => {
    it('Should fetch new alert on top of the exists alert', async () => {
      const alerts = [
        getMockAlert({ id: 'alert1' }),
        getMockAlert({ id: 'alert2' })
      ]
      AlertStore.alerts = alerts
      const mockFetchAlertById = AlertServices.fetchAlertById as jest.Mock
      mockFetchAlertById.mockResolvedValue(getMockAlert({ id: 'alert3' }))
      await AlertStore.fetchAlertById('alert3')
      expect(AlertStore.alerts.length).toEqual(3)
      expect(AlertStore.alerts[0].id).toEqual('alert3')
    })
  })
})
