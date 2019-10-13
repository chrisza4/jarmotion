import { action, computed, observable } from 'mobx'
import { computedFn } from 'mobx-utils'
import * as AlertServices from '../apiServices/alertServices'
import { AlertStatus, IAlert } from '../domains/alert/AlertTypes'
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
  }
}

export default new AlertStoreClass()
