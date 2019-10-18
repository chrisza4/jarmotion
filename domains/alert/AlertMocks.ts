import {
  AlertSource,
  AlertStatus,
  IAlert,
  IDisplayAlertItem
} from './AlertTypes'

export function getMockDisplayAlert(): IDisplayAlertItem {
  return {
    alertId: 'alert1',
    message: 'You get alert from Awa',
    sentAt: new Date(),
    status: AlertStatus.Created,
    side: AlertSource.MeReceived
  }
}

export function getMockAlert(props: Partial<IAlert>): IAlert {
  return {
    id: 'alert1',
    inserted_at: new Date(),
    status: AlertStatus.Created,
    owner_id: 'user1',
    to_user_id: 'user2',
    ...props
  }
}
