import _ from 'lodash'
import * as AlertServices from '../apiServices/alertServices'
import { getMockAlert } from '../domains/alert/AlertMocks'
import { AlertStatus } from '../domains/alert/AlertTypes'
import { LoadingStateStatus } from '../types/LoadingState'
import AlertStore from './AlertStore'

jest.mock('../apiServices/alertServices.ts')
describe('AlertStore', () => {
  describe('init', () => {
    it('Should fetch data into alert store if success', async () => {
      const mockFetchAlerts = AlertServices.fetchAlerts as jest.Mock
      const alerts = [getMockAlert({}), getMockAlert({})]
      mockFetchAlerts.mockResolvedValue(alerts)
      await AlertStore.init()
      expect(AlertStore.alerts).toEqual(_.keyBy(alerts, a => a.id))
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
      AlertStore.alerts = _.keyBy(alerts, a => a.id)
      const mockFetchAlertById = AlertServices.fetchAlertById as jest.Mock
      mockFetchAlertById.mockResolvedValue(getMockAlert({ id: 'alert3' }))
      await AlertStore.fetchAlert('alert3')
      expect(AlertStore.alertArr.length).toEqual(3)
      expect(AlertStore.alerts.alert3.id).toEqual('alert3')
    })
  })

  describe('ackById', () => {
    it('should acknowledge alert and get new alert on top of it', async () => {
      const alerts = [
        getMockAlert({ id: 'alert1' }),
        getMockAlert({ id: 'alert2' })
      ]
      AlertStore.alerts = _.keyBy(alerts, a => a.id)
      const mockAckAlert = AlertServices.ackAlert as jest.Mock
      mockAckAlert.mockResolvedValue(
        getMockAlert({ id: 'alert2', status: AlertStatus.Acknowledged })
      )
      await AlertStore.ackAlert('alert2')
      expect(mockAckAlert.mock.calls.length).toEqual(1)
      expect(AlertStore.alertArr.length).toEqual(2)
      expect(AlertStore.alerts.alert2.id).toEqual('alert2')
      expect(AlertStore.alerts.alert2.status).toEqual(AlertStatus.Acknowledged)
    })

    it('should do nothing if alert is not exists in store', async () => {
      const alerts = [
        getMockAlert({ id: 'alert1' }),
        getMockAlert({ id: 'alert2' })
      ]
      AlertStore.alerts = _.keyBy(alerts, a => a.id)
      const mockAckAlert = AlertServices.ackAlert as jest.Mock
      mockAckAlert.mockReset()
      await AlertStore.ackAlert('alert3')
      expect(mockAckAlert.mock.calls.length).toEqual(0)
    })
  })
})
