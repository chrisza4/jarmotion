import { EmojiType } from '../domains/emojis/EmojiTypes'
import { ISensor } from '../domains/sensor/SensorTypes'
import { authFetch } from './apiConnector'
import { NonResourceResponse } from './apiTypes'

export async function fetchSensors(): Promise<ISensor[]> {
  const res = await authFetch<ISensor[]>('GET', `api/sensors`)
  if (res.status !== 200) {
    throw Error('Cannot fetch sensor')
  }
  return res.body
}

export async function upsertSensor(sensor: ISensor) {
  const res = await authFetch<ISensor>('POST', `api/sensors`, {
    emoji_type: sensor.emoji_type,
    threshold: sensor.threshold
  })

  if (res.status !== 200) {
    throw Error('Cannot post sensor')
  }
  return res.body
}

export async function deleteSensor(emojiType: EmojiType) {
  const res = await authFetch<NonResourceResponse>('DELETE', `api/sensors`, {
    emoji_type: emojiType
  })

  if (res.status !== 200) {
    throw Error('Cannot delete sensor')
  }
  return res.body.ok
}
