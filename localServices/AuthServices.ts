import * as SecureStore from 'expo-secure-store'
import { AsyncStorage } from 'react-native'
import { AuthStatus } from '../domains/auth/AuthTypes'

const AUTH_TOKEN_KEY = 'auth_token'

export async function getAuthStatus(): Promise<AuthStatus> {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
    return token ? { auth: true, token } : { auth: false }
  } catch (err) {
    return { auth: false }
  }
}

export async function setAuthToken(token: string) {
  await Promise.all([
    SecureStore.setItemAsync(AUTH_TOKEN_KEY, token),
    AsyncStorage.setItem('was_logged_in', 'yes')
  ])
}

export async function hasLoggedIn() {
  const flag = await AsyncStorage.getItem('was_logged_in')
  return !!flag
}
