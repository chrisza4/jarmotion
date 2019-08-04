import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import uuid from 'uuid'
import { EmojiType, IEmoji } from '../../domains/emojis/Types'
import EmojiStore, { EmojiStoreClass } from '../../stores/EmojiStore'
import ScreenLayout from '../layouts/ScreenLayout'
import { brownishGrey, greenish, offWhite } from '../styles/colors'
import AddEmotionButton from '../uikit/buttons/AddEmotionButton'
import NotificationButton from '../uikit/buttons/NotificationButton'
import Circle from '../uikit/Circle'
import IconChatNoti from '../uikit/images/IconChatNoti'
import IconPeople from '../uikit/images/IconPeople'
import MainLogo from '../uikit/images/MainLogo'
import JarContainer from '../uikit/Jar/JarContainer'
import NameTag from '../uikit/NameTag'
import AddEmotionModal from './AddEmotionModal'

const styles = StyleSheet.create({
  page: {
    backgroundColor: offWhite,
    height: '100%',
    justifyContent: 'space-between'
  },
  backgroundImage: {
    height: 188,
    width: '100%',
    resizeMode: 'stretch',
    backgroundColor: 'transparent'
  },
  notificationButtonHolder: {
    top: 10,
    right: 10,
    position: 'absolute'
  },
  logoHolder: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20
  },
  chatSection: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 35,
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textGreeting: {
    fontFamily: 'poppins-light',
    color: brownishGrey,
    fontSize: 10
  },
  textTellSomething: {
    fontFamily: 'poppins-medium',
    fontSize: 10,
    color: greenish
  },
  chatNotiHolder: {
    position: 'relative',
    bottom: -10,
    right: 10
  },
  greetingHolder: { marginTop: 2 },
  addButtonHolder: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomBackgroundImage: {
    bottom: -20
  },
  leftCircle: {
    top: 50,
    left: 30,
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.5
  },
  rightCircle: {
    right: 43,
    top: 30,
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.5
  },
  nameTag: {
    top: 76
  }
})

type HomePageProps = {
  emojis: IEmoji[]
  addEmojis: (emojis: IEmoji[]) => void
}

const HomePage = (props: HomePageProps) => {
  const [showAddEmotionModal, setShowAddEmotionModal] = useState(false)
  const { emojis, addEmojis } = props

  const onOpenEmojiModal = () => setShowAddEmotionModal(true)
  const onAddEmoji = (emojiType: EmojiType) => {
    const newEmoji: IEmoji = {
      id: uuid.v4(),
      emojiType,
      inserted_at: new Date()
    }
    addEmojis([newEmoji])
    setShowAddEmotionModal(false)
  }
  const onCloseEmojiModal = () => setShowAddEmotionModal(false)

  const renderTopSection = () => (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/curvy_top_bg.png')}
    >
      <View style={styles.notificationButtonHolder}>
        <NotificationButton />
      </View>
      <View style={styles.logoHolder}>
        <MainLogo />
      </View>
      <View style={styles.chatSection}>
        <IconPeople />
        <View style={styles.greetingHolder}>
          <Text style={styles.textGreeting}>Hello Chris</Text>
          <Text style={styles.textTellSomething}>
            Tell loved one how you feel?
          </Text>
        </View>
        <View style={styles.chatNotiHolder}>
          <IconChatNoti />
        </View>
      </View>
    </ImageBackground>
  )

  const renderMiddleSection = () => {
    return (
      <View>
        <JarContainer emojis={emojis} />
        <View style={styles.addButtonHolder}>
          <AddEmotionButton onPress={onOpenEmojiModal} />
        </View>
      </View>
    )
  }

  const renderBottomSection = () => (
    <ImageBackground
      style={[styles.backgroundImage, styles.bottomBackgroundImage]}
      source={require('../../assets/curvy_bottom_bg.png')}
    >
      <View style={styles.bottomSection}>
        <Circle radius={22} style={styles.leftCircle} />
        <Circle radius={15} style={styles.rightCircle} />
        <NameTag style={styles.nameTag} name='AWA' />
      </View>
    </ImageBackground>
  )

  const renderModal = () => (
    <AddEmotionModal
      show={showAddEmotionModal}
      onClose={onCloseEmojiModal}
      onAddEmoji={onAddEmoji}
    />
  )

  return (
    <ScreenLayout>
      <View style={styles.page}>
        {renderTopSection()}
        {renderMiddleSection()}
        {renderBottomSection()}
      </View>
      {renderModal()}
    </ScreenLayout>
  )
}

export default observer(() => (
  <HomePage emojis={EmojiStore.emojis} addEmojis={EmojiStore.addEmojis} />
))
