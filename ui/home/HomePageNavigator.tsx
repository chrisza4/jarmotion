import { observer } from 'mobx-react'
import React from 'react'
import GestureRecognizer from 'react-native-swipe-gestures'
import { createStackNavigator } from 'react-navigation-stack'
import UserStore from '../../stores/UserStore'
import LoadingState from '../uikit/LoadingState'
import HomePageContainer from './HomePageContainer'

const EmptyPage = () => <LoadingState />

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
  const couple = UserStore.couple
  if (!couple.id) {
    return <EmptyPage />
  }

  return (
    <GestureRecognizer onSwipeLeft={() => props.navigation.navigate('Me')}>
      <HomePageContainer currentUser={couple} isMyself={false} />
    </GestureRecognizer>
  )
})

export default createStackNavigator(
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
