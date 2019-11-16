import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import * as LoginService from '../apiServices/loginService'
import AuthStore, { AuthStoreStatus } from '../stores/AuthStore'
import StarterStore from '../stores/StarterStore'
import LoginPage from './LoginPage'
import Navigations from './Navigations'
import { FullScreenLoadingState } from './uikit/LoadingScreen'

type AppLayoutProps = {
  authStatus: AuthStoreStatus
  setAuthToken: (token: string) => Promise<void>
  init: () => Promise<void>
}

function AppLayout(props: AppLayoutProps) {
  useEffect(() => {
    props.init()
  }, [])

  const login = async (username: string, password: string) => {
    const res = await LoginService.login(username, password)
    if (!res.jwt) {
      alert('Incorrect username or password')
      return
    }
    await props.setAuthToken(res.jwt)
    await props.init()
  }

  switch (props.authStatus.auth) {
    case 'loading':
      return <FullScreenLoadingState />
    case false:
      return <LoginPage login={login} />
    case true:
      return <Navigations />
  }
}

export default observer(() => (
  <AppLayout
    init={() => StarterStore.initApp()}
    setAuthToken={(token: string) => AuthStore.setAuthToken(token)}
    authStatus={AuthStore.getAuthStatus}
  />
))
