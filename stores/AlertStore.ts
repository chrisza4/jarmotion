import { Notifications } from 'expo'
import { action, observable } from 'mobx'
import { computedFn } from 'mobx-utils'
import { Alert } from 'react-native'
import * as AlertServices from '../apiServices/alertServices'
import { AlertStatus, IAlert } from '../domains/alert/AlertTypes'
import {
  PushNotifiactionOrigin,
  PushNotification,
  PushNotificationEntityType
} from '../domains/general/PushNotificationTypes'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'

export class AlertStoreClass {
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }
  @observable public alerts: IAlert[] = []

  public isAlerting = computedFn((forUserId: string) => {
    return this.alerts.some(
      alert =>
        alert.owner_id === forUserId &&
        alert.status !== AlertStatus.Acknowledged
    )
  })

  @action
  public async fetchAlert(id: string) {
    if (this.isExists(id)) {
      return
    }
    const newAlert = await AlertServices.fetchAlertById(id)
    this.alerts = [newAlert, ...this.alerts]
  }

  @action
  public async handleNotification(notification: PushNotification) {
    if (notification.data.type !== PushNotificationEntityType.Alert) {
      return
    }
    const alertId = notification.data.id
    await this.fetchAlert(alertId)
    if (notification.origin === PushNotifiactionOrigin.Selected) {
      await this.ackAlert(alertId)
      Alert.alert('Jarmotion', 'Thank you for noticing my alert.')
    }
  }

  @action
  public async ackAlert(id: string) {
    if (!this.isExists(id)) {
      return
    }
    const newAlert = await AlertServices.ackAlert(id)
    this.alerts = this.alerts.map(alert =>
      alert.id === newAlert.id ? newAlert : alert
    )
  }

  @action
  public async init() {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    try {
      const alerts = await AlertServices.fetchAlerts()
      this.loadState = {
        status: LoadingStateStatus.Loaded
      }
      this.alerts = alerts
    } catch (err) {
      this.loadState = {
        status: LoadingStateStatus.Error,
        errorMessage: err.message
      }
    }
    Notifications.addListener((n: PushNotification) =>
      this.handleNotification(n)
    )
  }

  private isExists(alertId: string) {
    return this.alerts.some(alert => alert.id === alertId)
  }
}

export default new AlertStoreClass()
