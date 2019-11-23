import { observer } from 'mobx-react'
import React from 'react'
import GestureRecognizer from 'react-native-swipe-gestures'
import { NavigationEventPayload, NavigationEvents } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import UserStore from '../../stores/UserStore'
import { FullScreenLoadingState } from '../uikit/LoadingScreen'
import HomePageContainer from './HomePageContainer'

const EmptyPage = () => <FullScreenLoadingState />

const HomePageMe = observer((props: any) => {
  const me = UserStore.me
  if (!me.id) {
    return <EmptyPage />
  }

  return (
    <GestureRecognizer onSwipeRight={() => props.navigation.navigate('Couple')}>
      <HomePageContainer currentUser={me} isMyself />
    </GestureRecognizer>
  )
})

const HomePageCouple = observer((props: any) => {
  // tslint:disable-next-line: variable-name
  const navigateToLover = (_payload: NavigationEventPayload) => {
    if (!UserStore.couple.id) {
      props.navigation.navigate('Lover')
    }
  }

  const couple = UserStore.couple
  if (!couple.id) {
    return (
      <NavigationEvents onDidFocus={navigateToLover}>
        <EmptyPage />
      </NavigationEvents>
    )
  }

  return (
    <GestureRecognizer onSwipeLeft={() => props.navigation.navigate('Me')}>
      <HomePageContainer currentUser={couple} isMyself={false} />
    </GestureRecognizer>
  )
})

const HomePageNavigator = createStackNavigator(
  {
    Couple: {
      screen: HomePageCouple,
      path: 'couple'
    },
    Me: {
      screen: HomePageMe,
      path: 'me'
    }
  },
  {
    initialRouteName: 'Couple',
    headerMode: 'none'
  }
)

export default HomePageNavigator
