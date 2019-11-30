import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures'
import { NavigationEvents } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import EmojiStore from '../../stores/EmojiStore'
import UserStore from '../../stores/UserStore'
import { LoadingStateStatus } from '../../types/LoadingState'
import { FullScreenLoadingState } from '../uikit/LoadingScreen'
import HomePageContainer from './HomePageContainer'

const EmptyPage = () => <FullScreenLoadingState />

const HomePageMe = observer((props: any) => {
  const me = UserStore.me
  if (!me.id) {
    return <EmptyPage />
  }

  useEffect(() => {
    EmojiStore.loadEmoji(me.id)
  }, [])

  return (
    <GestureRecognizer onSwipeRight={() => props.navigation.navigate('Couple')}>
      <HomePageContainer
        currentUser={me}
        isMyself
        loverId={UserStore.couple.id}
      />
      <NavigationEvents onDidFocus={() => EmojiStore.loadEmoji(me.id)} />
    </GestureRecognizer>
  )
})

const HomePageCouple = observer((props: any) => {
  const loadState = UserStore.loadState.status
  const couple = UserStore.couple

  const navigateToLoverIfNeeded = () => {
    if (loadState === LoadingStateStatus.Loaded && !couple.id) {
      props.navigation.navigate('Lover')
    }
  }

  useEffect(() => {
    navigateToLoverIfNeeded()
  })

  useEffect(() => {
    EmojiStore.loadEmoji(couple.id)
  }, [])

  if (!couple.id) {
    return (
      <NavigationEvents onDidFocus={navigateToLoverIfNeeded}>
        <EmptyPage />
      </NavigationEvents>
    )
  }

  return (
    <GestureRecognizer onSwipeLeft={() => props.navigation.navigate('Me')}>
      <HomePageContainer
        currentUser={couple}
        isMyself={false}
        loverId={UserStore.couple.id}
      />
      <NavigationEvents
        onDidFocus={() => {
          EmojiStore.loadEmoji(couple.id)
        }}
      />
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
