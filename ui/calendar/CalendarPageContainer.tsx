import { observer } from 'mobx-react'
import Moment from 'moment'
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import EmojiStatsStore from '../../stores/EmojiStatsStore'
import EmojiSummaryStore from '../../stores/EmojiSummaryStore'
import UserStore from '../../stores/UserStore'
import { combineLoadingState } from '../../types/LoadingState'
import { INavigationComponentProps } from '../../types/NavigationTypes'
import CalendarPage from './CalendarPage'
import EmojiSummaryModalContainer from './EmojiSummaryModalContainer'

const CalendarPageContainer = observer((props: INavigationComponentProps) => {
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
      onShowEmojis={(user, date) => {
        EmojiSummaryStore.fetchEmojiSummarys(user, Moment(date))
        props.navigation.navigate('Modal')
      }}
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
      screen: EmojiSummaryModalContainer
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

// export default CalendarPageContainer
