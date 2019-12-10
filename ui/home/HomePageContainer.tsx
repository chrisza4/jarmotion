import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import EmojiStore from '../../stores/EmojiStore'
import UserStore from '../../stores/UserStore'
import { INavigationComponentProps } from '../../types/NavigationTypes'
import HomePage from './HomePage'

const HomePageContainer = observer(
  (props: INavigationComponentProps): JSX.Element => {
    useEffect(() => {
      refresh()
    }, [])

    const navigateToLoverIfNeeded = () => {
      if (!UserStore.couple?.id) {
        props.navigation.navigate({ routeName: 'Lover' })
      }
    }
    const refresh = () => {
      UserStore.init().then(() => {
        EmojiStore.loadEmoji(UserStore.me.id)
        EmojiStore.loadEmoji(UserStore.couple.id)
      })
    }

    return (
      <View>
        <HomePage
          emojis={EmojiStore.emojis}
          addEmojis={EmojiStore.addEmojis}
          loadState={EmojiStore.getLoadStateByUserId(UserStore.couple.id)}
          users={UserStore.users}
          loverUserId={UserStore.couple.id}
        />
        <NavigationEvents
          onDidFocus={() => {
            navigateToLoverIfNeeded()
            refresh()
          }}
        />
      </View>
    )
  }
)

export default HomePageContainer
