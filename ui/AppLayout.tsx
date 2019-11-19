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

  switch (props.authStatus.auth) {
    case 'loading':
      return <FullScreenLoadingState />
    case false:
      return <LoginPage login={login} register={register} />
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
