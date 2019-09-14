import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { IUser } from '../../domains/users/UserTypes'
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

    useEffect(() => {
      if (props.currentUser) {
        EmojiStore.loadEmoji(props.currentUser.id)
      }
    }, [])

    return (
      <HomePage
        emojis={EmojiStore.getEmojisByUserId(currentUser.id)}
        addEmojis={EmojiStore.addEmojis}
        loadState={EmojiStore.getLoadStateByUserId(currentUser.id)}
        currentUser={currentUser}
        isMyself={props.isMyself}
      />
    )
  }
)

export default HomePageContainer
