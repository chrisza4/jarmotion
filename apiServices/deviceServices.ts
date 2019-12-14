import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { authFetch } from './apiConnector'

export async function regisDevice() {
  const token = await requestToken()
  if (!token) {
    return
  }
  await authFetch<null>('POST', 'api/devices', { token })
}

export async function revokeDevice() {
  const token = await requestToken()
  if (!token) {
    return
  }
  await authFetch<null>('DELETE', 'api/devices', { token })
}

async function requestToken(): Promise<string | null> {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return null
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync()
  return token
}
