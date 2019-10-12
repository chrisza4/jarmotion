import { AlertStatus, IDisplayAlertItem } from './AlertTypes'

export function getDisplayAlertMocks(): IDisplayAlertItem {
  return {
    alertId: 'alert1',
    message: 'You get alert from Awa',
    sentAt: new Date(),
    status: AlertStatus.Created
  }
}
