import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import * as LoginService from '../apiServices/loginService'
import AuthStore, { AuthStoreStatus } from '../stores/AuthStore'
import LoginPage from './LoginPage'
import Navigations from './Navigations'
import LoadingState from './uikit/LoadingState'

type AppLayoutProps = {
  authStatus: AuthStoreStatus
  setAuthToken: (token: string) => Promise<void>
  init: () => Promise<void>
}

function AppLayout(props: AppLayoutProps) {
  useEffect(() => {
    props.init()
  })

  const login = async (username: string, password: string) => {
    const res = await LoginService.login(username, password)
    if (!res.jwt) {
      alert('Incorrect username or password')
      return
    }
    await props.setAuthToken(res.jwt)
  }

  switch (props.authStatus.auth) {
    case 'loading':
      return <LoadingState />
    case false:
      return <LoginPage login={login} />
    case true:
      return <Navigations />
  }
}

export default observer(() => (
  <AppLayout
    init={() => AuthStore.initFromStorage()}
    setAuthToken={(token: string) => AuthStore.setAuthToken(token)}
    authStatus={AuthStore.getAuthStatus}
  />
))
