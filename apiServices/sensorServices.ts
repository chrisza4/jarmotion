import { ISensor } from '../domains/sensor/SensorTypes'
import { authFetch } from './apiConnector'

export async function fetchSensors(): Promise<ISensor[]> {
  const res = await authFetch<ISensor[]>('GET', `api/sensors`)
  if (res.status !== 200) {
    throw Error('Cannot fetch sensor')
  }
  return res.body
}
