import { observer } from 'mobx-react'
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import UserStore from '../../stores/UserStore'
import { INavigationComponentProps } from '../../types/NavigationTypes'
import LoverPage from './LoverPage'
import MyQrPage from './MyQrPage'

const LoverPageContainer = observer((props: INavigationComponentProps) => {
  return (
    <LoverPage
      me={UserStore.me}
      lover={UserStore.couple}
      onShowMyQr={() => props.navigation.navigate('MyQrPage')}
    />
  )
})

const MyQrPageContainer = (props: INavigationComponentProps) => {
  return (
    <MyQrPage
      userId={UserStore.me.id}
      onBack={() => props.navigation.goBack()}
    />
  )
}

export default createStackNavigator(
  {
    Main: {
      screen: LoverPageContainer
    },
    MyQrPage: {
      screen: MyQrPageContainer
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)
