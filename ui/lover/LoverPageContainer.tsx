import { observer } from 'mobx-react'
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import UserStore from '../../stores/UserStore'
import { INavigationComponentProps } from '../../types/NavigationTypes'
import LoverPage from './LoverPage'
import MyQrPage from './MyQrPage'
import ScanQrPage from './ScanQrPage'

const LoverPageContainer = observer((props: INavigationComponentProps) => {
  return (
    <LoverPage
      me={UserStore.me}
      lover={UserStore.couple}
      onShowMyQr={() => props.navigation.navigate('MyQrPage')}
      onShowScanQr={() => props.navigation.navigate('ScanQrPage')}
    />
  )
})

const MyQrPageContainer = observer((props: INavigationComponentProps) => {
  return (
    <MyQrPage
      userId={UserStore.me.id}
      onBack={() => props.navigation.goBack()}
    />
  )
})

const ScanQrPageContainer = observer((props: INavigationComponentProps) => {
  return (
    <ScanQrPage
      onBack={() => props.navigation.goBack()}
      couple={UserStore.couple}
      onAddUser={userId => UserStore.addLover(userId)}
      onNavigateToHome={() => props.navigation.navigate({ routeName: 'Home' })}
    />
  )
})

export default createStackNavigator(
  {
    Main: {
      screen: LoverPageContainer
    },
    MyQrPage: {
      screen: MyQrPageContainer
    },
    ScanQrPage: {
      screen: ScanQrPageContainer
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)
