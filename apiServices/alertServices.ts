import { IAlert } from '../domains/alert/AlertTypes'
import { authFetch } from './apiConnector'

export async function fetchAlerts(): Promise<IAlert[]> {
  const res = await authFetch<IAlert[]>('GET', `api/alert`)
  if (res.status !== 200) {
    throw Error('Cannot fetch alert')
  }
  return res.body
}

export async function fetchAlertById(id: string): Promise<IAlert> {
  const res = await authFetch<IAlert>('GET', `api/alert/${id}`)
  if (res.status !== 200) {
    throw Error('Cannot fetch alert')
  }
  return res.body
}

export async function ackAlert(id: string): Promise<IAlert> {
  const res = await authFetch<IAlert>('POST', `api/alert/${id}/ack`)
  if (res.status !== 200) {
    throw Error('Cannot ack alert')
  }
  return res.body
}

export async function sendAlert(toUserId: string): Promise<IAlert> {
  const res = await authFetch<IAlert>('POST', 'api/alert', {
    to_user_id: toUserId
  })
  if (res.status !== 200) {
    throw Error('Cannot send alert')
  }
  return res.body
}
