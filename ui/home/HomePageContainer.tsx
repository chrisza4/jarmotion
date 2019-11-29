import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { IUser } from '../../domains/users/UserTypes'
import AlertStore from '../../stores/AlertStore'
import EmojiStore from '../../stores/EmojiStore'
import HomePage from './HomePage'

type HomePageContainerProps = {
  currentUser?: IUser
  isMyself: boolean
}

const HomePageContainer = observer(
  (props: HomePageContainerProps): JSX.Element => {
    const { currentUser } = props
    if (!currentUser) {
      return <View />
    }

    const emojis = EmojiStore.getEmojisByUserId(currentUser.id)

    return (
      <HomePage
        emojis={emojis}
        addEmojis={EmojiStore.addEmojis}
        loadState={EmojiStore.getLoadStateByUserId(currentUser.id)}
        currentUser={currentUser}
        isMyself={props.isMyself}
        alerting={AlertStore.isAlerting(currentUser.id)}
        showAlertModal={AlertStore.showAlertModal}
        setShowAlertModal={t => AlertStore.setShowAlertModal(t)}
      />
    )
  }
)

export default HomePageContainer
