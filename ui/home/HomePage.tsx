import React, { useEffect, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'

import uuid from 'uuid'
import { EmojiType, IEmoji } from '../../domains/emojis/EmojiTypes'
import { IUser } from '../../domains/users/UserTypes'
import { LoadingState, LoadingStateStatus } from '../../types/LoadingState'
import { JarHeight } from '..//uikit/Jar/JarConstants'
import PageTitle from '../layouts/PageTitle'
import ScreenLayout from '../layouts/ScreenLayout'
import { brownishGrey, greenish, offWhite } from '../styles/colors'
import AddEmotionButton from '../uikit/buttons/AddEmotionButton'
import AlertButton from '../uikit/buttons/AlertButton'
import Circle from '../uikit/Circle'
import IconChatNoti from '../uikit/images/IconChatNoti'
import IconPeople from '../uikit/images/IconPeople'
import MainLogo from '../uikit/images/MainLogo'
import JarContainer from '../uikit/Jar/JarContainer'
import NameTag from '../uikit/NameTag'
import AddEmotionModal from './AddEmotionModal'
import AlertModalContainer from './alert-modal/AlertModalContainer'

const TopHeight = 188
const MiddleHeight = JarHeight + 30
const BottomHeight = 188

const styles = StyleSheet.create({
  backgroundImage: {
    height: TopHeight,
    width: '100%',
    resizeMode: 'stretch',
    backgroundColor: 'transparent'
  },
  notificationButtonHolder: {
    top: 10,
    right: 10,
    position: 'absolute'
  },
  chatSection: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 15,
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

  bottomBackgroundImage: {
    bottom: 0
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

const PageView = styled.View`
  background-color: ${offWhite};
  justify-content: space-between;
  flex-grow: 1;
`

const TopSection = styled.View`
  height: ${TopHeight}px;
`

const MiddleSection = styled.View`
  height: ${MiddleHeight}px;
`

const BottomSection = styled.View`
  min-height: ${BottomHeight}px;
  justify-content: flex-end;
`

const BottomContentHolder = styled.View`
  align-items: center;
`

type HomePageProps = {
  loadState: LoadingState
  emojis: IEmoji[]
  addEmojis: (emojis: IEmoji[], userId: string) => void
  currentUser: IUser
  isMyself: boolean
  alerting: boolean
  showAlertModal: boolean
  setShowAlertModal: (show: boolean) => void
}

const HomePage = (props: HomePageProps) => {
  const [showAddEmotionModal, setShowAddEmotionModal] = useState(false)
  const { emojis, addEmojis, currentUser, isMyself } = props

  const onOpenAddEmotionModal = () => {
    setShowAddEmotionModal(true)
  }

  useEffect(() => {
    if (props.loadState.status === LoadingStateStatus.Error) {
      const errMessage = props.loadState.errorMessage
      // Alert immediately will conflict with fadeout modal
      setTimeout(
        () =>
          Alert.alert('Error', errMessage, undefined, {
            cancelable: false
          }),
        500
      )
    }
  }, [props.loadState])

  const renderChatSection = () =>
    isMyself && (
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
    )

  const renderAlertButton = () => (
    <View style={styles.notificationButtonHolder}>
      <AlertButton
        alerting={props.alerting}
        onPress={() => props.setShowAlertModal(true)}
      />
    </View>
  )

  const renderTopSection = () => (
    <TopSection>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/curvy_top_bg.png')}
      >
        {renderAlertButton()}
        <PageTitle>
          <MainLogo />
        </PageTitle>
        {renderChatSection()}
      </ImageBackground>
    </TopSection>
  )

  const renderMiddleSection = () => {
    return (
      <MiddleSection>
        <JarContainer emojis={emojis} />
        <View style={styles.addButtonHolder}>
          {isMyself && (
            <AddEmotionButton
              onPress={onOpenAddEmotionModal}
              loading={props.loadState.status === LoadingStateStatus.Loading}
            />
          )}
        </View>
      </MiddleSection>
    )
  }

  const renderBottomSection = () => (
    <BottomSection>
      <ImageBackground
        style={[styles.backgroundImage, styles.bottomBackgroundImage]}
        source={require('../../assets/curvy_bottom_bg.png')}
      >
        <BottomContentHolder>
          <Circle radius={22} style={styles.leftCircle} />
          <Circle radius={15} style={styles.rightCircle} />
          <NameTag style={styles.nameTag} name={currentUser.name} />
        </BottomContentHolder>
      </ImageBackground>
    </BottomSection>
  )

  const renderAddEmotionModal = () => {
    const onAddEmoji = async (emojiType: EmojiType) => {
      const newEmoji: IEmoji = {
        id: uuid.v4(),
        type: emojiType,
        inserted_at: new Date(),
        owner_id: ''
      }
      try {
        await addEmojis([newEmoji], props.currentUser.id)
        setShowAddEmotionModal(false)
      } catch (err) {
        Alert.alert(err.message)
      }
    }
    const onCloseEmojiModal = () => setShowAddEmotionModal(false)
    return (
      <AddEmotionModal
        show={showAddEmotionModal}
        onClose={onCloseEmojiModal}
        onAddEmoji={onAddEmoji}
      />
    )
  }

  const renderAlertModal = () => {
    return (
      <AlertModalContainer
        show={props.showAlertModal}
        onClose={() => props.setShowAlertModal(false)}
      />
    )
  }

  return (
    <ScreenLayout>
      <PageView>
        {renderTopSection()}
        {renderMiddleSection()}
        {renderBottomSection()}
        {renderAddEmotionModal()}
        {renderAlertModal()}
      </PageView>
    </ScreenLayout>
  )
}

export default HomePage
