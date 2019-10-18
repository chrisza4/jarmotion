import { Notifications } from 'expo'
import _ from 'lodash'
import { action, computed, observable, runInAction } from 'mobx'
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
  @observable public alerts: { [id: string]: IAlert } = {}
  @observable public showAlertModal: boolean = false

  public isAlerting = computedFn((forUserId: string) => {
    return this.alertArr.some(
      alert =>
        alert.owner_id === forUserId &&
        alert.status !== AlertStatus.Acknowledged
    )
  })

  @action public setShowAlertModal(show: boolean) {
    this.showAlertModal = show
  }

  @action
  public async fetchAlert(id: string) {
    if (this.isExists(id)) {
      return
    }
    const newAlert = await AlertServices.fetchAlertById(id)
    this.alerts[newAlert.id] = newAlert
  }

  public async handleNotification(notification: PushNotification) {
    return runInAction(async () => {
      const buttons = [
        {
          text: 'Checkout',
          onPress: () => this.setShowAlertModal(true)
        }
      ]
      if (notification.data.type !== PushNotificationEntityType.Alert) {
        return
      }
      const alertId = notification.data.id
      await this.fetchAlert(alertId)
      if (notification.origin === PushNotifiactionOrigin.Selected) {
        await this.ackAlert(alertId)
        Alert.alert('Jarmotion', 'Thank you for noticing my alert', buttons)
      } else {
        Alert.alert('Jarmotion', 'You got a personal alert.', buttons)
      }
    })
  }

  @action
  public async ackAlert(id: string) {
    if (!this.isExists(id)) {
      return
    }
    const newAlert = await AlertServices.ackAlert(id)
    this.alerts[newAlert.id] = newAlert
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
      this.alerts = _.keyBy(alerts, a => a.id)
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

  @computed
  public get alertArr(): IAlert[] {
    return Object.values(this.alerts)
  }

  private isExists(alertId: string) {
    return !!this.alerts[alertId]
  }
}

export default new AlertStoreClass()
