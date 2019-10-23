import { observer } from 'mobx-react'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import EmojiStatsStore from '../../stores/EmojiStatsStore'
import UserStore from '../../stores/UserStore'
import { combineLoadingState } from '../../types/LoadingState'
import CalendarPage from './CalendarPage'

const CalendarPageContainer = observer((props: any) => {
  return (
    <CalendarPage
      users={UserStore.users}
      fetchStats={(userId, year, month) =>
        EmojiStatsStore.fetch(userId, year, month)
      }
      loadState={combineLoadingState(
        EmojiStatsStore.loadState,
        UserStore.loadState
      )}
      onShowEmojis={() => props.navigation.navigate('Modal')}
      emojiStats={EmojiStatsStore.emojiStats}
    />
  )
})

const Modal = (props: any) => (
  <View>
    <Text>Modal</Text>
    <Button title='back' onPress={() => props.navigation.goBack()} />
  </View>
)

export default createStackNavigator(
  {
    Main: {
      screen: CalendarPageContainer
    },
    Modal: {
      screen: Modal
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

// export default CalendarPageContainer
