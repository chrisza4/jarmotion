import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import * as LoginService from '../apiServices/loginService'
import * as RegistrationService from '../apiServices/registrationService'
import { IRegistration } from '../domains/registration/RegistrationTypes'
import AuthStore, { AuthStoreStatus } from '../stores/AuthStore'
import StarterStore from '../stores/StarterStore'
import LoginPage from './LoginPage'
import Navigations from './Navigations'
import { FullScreenLoadingState } from './uikit/LoadingScreen'

type AppLayoutProps = {
  authStatus: AuthStoreStatus
  setAuthToken: (token: string) => Promise<void>
  init: () => Promise<void>
  appReady: boolean
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
    await props.setAuthToken(res.jwt)
    await props.init()
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
    await props.setAuthToken(res.jwt)
    await props.init()
    return true
  }

  if (props.authStatus.auth === 'loading') {
    return <FullScreenLoadingState />
  } else if (!props.authStatus.auth) {
    return <LoginPage login={login} register={register} />
  } else if (!props.appReady) {
    return <FullScreenLoadingState />
  }
  return <Navigations />
}

export default observer(() => (
  <AppLayout
    init={() => StarterStore.initApp()}
    setAuthToken={(token: string) => AuthStore.setAuthToken(token)}
    authStatus={AuthStore.getAuthStatus}
    appReady={StarterStore.isReady}
  />
))
