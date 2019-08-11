import React, { useEffect, useState } from 'react'
import * as LoginService from '../apiServices/loginService'
import { getAuthStatus, setAuthToken } from '../localServices/AuthServices'
import LoginPage from './LoginPage'
import Navigations from './Navigations'
import LoadingState from './uikit/LoadingState'

enum AuthState {
  Loading,
  Authorized,
  Unauthorized
}

function AppLayout() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.Loading)
  useEffect(() => {
    const run = async () => {
      const authStatus = await getAuthStatus()
      setAuthState(
        authStatus.auth ? AuthState.Authorized : AuthState.Unauthorized
      )
    }
    run()
  })

  const login = async (username: string, password: string) => {
    const res = await LoginService.login(username, password)
    if (!res.jwt) {
      alert('Incorrect username or password')
      return
    }
    await setAuthToken(res.jwt)
    setAuthState(AuthState.Authorized)
  }

  switch (authState) {
    case AuthState.Loading:
      return <LoadingState />
    case AuthState.Unauthorized:
      return <LoginPage login={login} />
    case AuthState.Authorized:
      return <Navigations />
  }
}

export default AppLayout
