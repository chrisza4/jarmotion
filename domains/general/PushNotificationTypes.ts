export enum PushNotificationEntityType {
  Alert = 'alert'
}

export interface IPushNotification {
  origin: 'selected' | 'received'
  data: {
    type: PushNotificationEntityType
    id: string
  }
  remote: boolean
  isMultiple: boolean
}
