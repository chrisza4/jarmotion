import AsyncStorage from '@react-native-community/async-storage'

type AuthStatusNotUnauthorized = {
  auth: false
}

type AuthStatusAuthorized = {
  auth: true
  token: string
}

type AuthStatus = AuthStatusAuthorized | AuthStatusNotUnauthorized

const AUTH_TOKEN_KEY = 'auth_token'

export async function getAuthStatus(): Promise<AuthStatus> {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY)
    return token ? { auth: true, token } : { auth: false }
  } catch (err) {
    return { auth: false }
  }
}

export async function setAuthToken(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
}
