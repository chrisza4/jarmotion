import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import * as LoginService from '../apiServices/loginService'
import * as RegistrationService from '../apiServices/registrationService'
import { IRegistration } from '../domains/registration/RegistrationTypes'
import AuthStore, { AuthStoreStatus } from '../stores/AuthStore'
import StarterStore, { AppLoadingStatus } from '../stores/StarterStore'
import LoginPage from './LoginPage'
import Navigations from './Navigations'
import { FullScreenLoadingState } from './uikit/LoadingScreen'

type AppLayoutProps = {
  hasLoggedIn: boolean
  authStatus: AuthStoreStatus
  init: (token?: string) => Promise<void>
  appReadiness: AppLoadingStatus
}

function AppLayout(props: AppLayoutProps) {
  useEffect(() => {
    props.init()
  }, [])

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const res = await LoginService.login(username, password)
    if (!res.jwt) {
      return false
    }
    await props.init(res.jwt)
    return true
  }

  const register = async (
    registration: IRegistration
  ): Promise<true | string> => {
    const res = await RegistrationService.register(registration)
    if (typeof res === 'string') {
      return res
    }
    if (!res || !res.jwt) {
      return 'Invalid JWT'
    }
    await props.init(res.jwt)
    return true
  }

  switch (props.appReadiness) {
    case AppLoadingStatus.Loading:
      return <FullScreenLoadingState />
    case AppLoadingStatus.Unauthorized:
      return (
        <LoginPage
          hasLoggedIn={props.hasLoggedIn}
          login={login}
          register={register}
        />
      )
    case AppLoadingStatus.Ready:
    default:
      return <Navigations />
  }
}

export default observer(() => (
  <AppLayout
    hasLoggedIn={AuthStore.hasLoggedIn}
    init={token => StarterStore.initApp(token)}
    authStatus={AuthStore.getAuthStatus}
    appReadiness={StarterStore.appReadinessStatus}
  />
))
