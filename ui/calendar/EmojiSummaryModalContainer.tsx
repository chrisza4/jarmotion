import { observer } from 'mobx-react'
import React from 'react'
import EmojiSummaryStore from '../../stores/EmojiSummaryStore'
import { INavigationComponentProps } from '../../types/NavigationTypes'
import EmojiSummaryModal from './EmojiSummaryModal'

const EmojiSummaryModalContainer = observer(
  (props: INavigationComponentProps) => {
    return (
      <EmojiSummaryModal
        date={EmojiSummaryStore.date}
        summary={EmojiSummaryStore.currentSummary}
        navigation={props.navigation}
        loadingState={EmojiSummaryStore.loadState}
        user={EmojiSummaryStore.currentUser}
      />
    )
  }
)

export default EmojiSummaryModalContainer
