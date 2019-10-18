export enum PushNotificationEntityType {
  Alert = 'alert'
}

export enum PushNotifiactionOrigin {
  Selected = 'selected',
  Received = 'received'
}

export type PushNotification = {
  origin: PushNotifiactionOrigin
  data: {
    type: PushNotificationEntityType
    id: string
  }
  remote: boolean
  isMultiple: boolean
}
