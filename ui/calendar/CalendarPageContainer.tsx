import { observer } from 'mobx-react'
import React from 'react'
import EmojiStatsStore from '../../stores/EmojiStatsStore'
import UserStore from '../../stores/UserStore'
import { combineLoadingState } from '../../types/LoadingState'
import CalendarPage from './CalendarPage'

const CalendarPageContainer = observer(() => {
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
      emojiStats={EmojiStatsStore.emojiStats}
    />
  )
})

export default CalendarPageContainer
