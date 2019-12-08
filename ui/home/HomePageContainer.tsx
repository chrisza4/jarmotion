import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import EmojiStore from '../../stores/EmojiStore'
import UserStore from '../../stores/UserStore'
import HomePage from './HomePage'

const HomePageContainer = observer(
  (): JSX.Element => {
    useEffect(() => {
      UserStore.init().then(() => {
        EmojiStore.loadEmoji(UserStore.me.id)
        EmojiStore.loadEmoji(UserStore.couple.id)
      })
    }, [])

    return (
      <HomePage
        emojis={EmojiStore.emojis}
        addEmojis={EmojiStore.addEmojis}
        loadState={EmojiStore.getLoadStateByUserId(UserStore.couple.id)}
        users={UserStore.users}
        loverUserId={UserStore.couple.id}
      />
    )
  }
)

export default HomePageContainer
