import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { IUser } from '../../domains/users/UserTypes'
import EmojiStore from '../../stores/EmojiStore'
import AlertStore from '../../stores/AlertStore'
import HomePage from './HomePage'
import UserStore from '../../stores/UserStore'

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

    useEffect(() => {
      if (props.currentUser) {
        EmojiStore.loadEmoji(props.currentUser.id)
      }
    }, [])
    const emojis = EmojiStore.getEmojisByUserId(currentUser.id)
    return (
      <HomePage
        emojis={emojis}
        addEmojis={EmojiStore.addEmojis}
        loadState={EmojiStore.getLoadStateByUserId(currentUser.id)}
        currentUser={currentUser}
        me={UserStore.me}
        others={[UserStore.couple]}
        isMyself={props.isMyself}
        recentAlerts={AlertStore.alerts}
        alerting={AlertStore.isAlerting(currentUser.id)}
      />
    )
  }
)

export default HomePageContainer
