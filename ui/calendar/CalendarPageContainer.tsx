import { observer } from 'mobx-react'
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import EmojiStatsStore from '../../stores/EmojiStatsStore'
import UserStore from '../../stores/UserStore'
import { combineLoadingState } from '../../types/LoadingState'
import { INavitationComponentProps } from '../../types/NavigationTypes'
import CalendarPage from './CalendarPage'
import EmojiSummaryModal from './EmojiSummaryModal'

const CalendarPageContainer = observer((props: INavitationComponentProps) => {
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

export default createStackNavigator(
  {
    Main: {
      screen: CalendarPageContainer
    },
    Modal: {
      screen: EmojiSummaryModal
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

// export default CalendarPageContainer
