import { IUser } from '../users/UserTypes'
import { AlertSource, IAlert, IDisplayAlertItem } from './AlertTypes'

export function getDisplayableAlert(
  alert: IAlert,
  me: IUser,
  others: IUser[]
): IDisplayAlertItem {
  const side =
    alert.owner_id === me.id ? AlertSource.MeSent : AlertSource.MeReceived
  return side === AlertSource.MeSent
    ? alertFromMeSent(alert, others)
    : alertFromMeReceived(alert, others)
}

function alertFromMeSent(alert: IAlert, others: IUser[]) {
  const relatedUser = others.find(user => user.id === alert.to_user_id)
  const relatedName = relatedUser ? relatedUser.name : 'Unknown'
  return {
    alertId: alert.id,
    sentAt: alert.inserted_at,
    status: alert.status,
    message: `You sent an alert to ${relatedName}`,
    side: AlertSource.MeSent
  }
}

function alertFromMeReceived(alert: IAlert, others: IUser[]) {
  const relatedUser = others.find(user => user.id === alert.owner_id)
  const relatedName = relatedUser ? relatedUser.name : 'Unknown'
  return {
    alertId: alert.id,
    sentAt: alert.inserted_at,
    status: alert.status,
    message: `You received an alert from ${relatedName}!!!!`,
    side: AlertSource.MeReceived
  }
}
