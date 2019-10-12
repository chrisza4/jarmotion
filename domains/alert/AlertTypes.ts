export interface IAlert {
  id: string
  owner_id: string
  to_user_id: string
  status: AlertStatus
  inserted_at: Date
}

export enum AlertStatus {
  Created = 'created',
  PushFailed = 'push_failed',
  Pending = 'pending',
  Acknowledged = 'acknowledged'
}
