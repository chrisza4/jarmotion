import React, { useEffect, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'

import { TouchableOpacity } from 'react-native-gesture-handler'
import uuid from 'uuid'
import * as ImageAssets from '../../assets/imageAssets'
import { EmojiType, IEmoji } from '../../domains/emojis/EmojiTypes'
import * as UserFunc from '../../domains/users/UserFunc'
import { IUser } from '../../domains/users/UserTypes'
import { LoadingState, LoadingStateStatus } from '../../types/LoadingState'
import { ScreenHeight, TabbarHeight } from '../../ui/styles/margins'
import { JarHeight } from '..//uikit/Jar/JarConstants'
import {
  AvatarCenterImage,
  CenterAvatar,
  PageTitleHolder,
  PageTitleText
} from '../layouts/PageElements'
import ScreenLayout from '../layouts/ScreenLayout'
import AddEmotionModal from '../modals/AddEmotionModal'
import { greenish, offWhite } from '../styles/colors'
import AddEmotionButton from '../uikit/buttons/AddEmotionButton'
import Circle from '../uikit/Circle'
import MainLogo from '../uikit/images/MainLogo'
import JarContainer from '../uikit/Jar/JarContainer'
import NameTag from '../uikit/NameTag'

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
  notificationButtonHolderRight: {
    top: 10,
    right: 10,
    position: 'absolute',
    flexDirection: 'row'
  },
  notificationButtonHolderLeft: {
    top: 10,
    left: 10,
    position: 'absolute',
    flexDirection: 'row'
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
  margin-top: 10px;
  height: ${MiddleHeight}px;
`

const BottomSection = styled.View`
  min-height: ${BottomHeight}px;
  justify-content: flex-end;
  bottom: 0px;
`

const BottomContentHolder = styled.View`
  align-items: center;
`

type HomePageProps = {
  loadState: LoadingState
  emojis: IEmoji[]
  addEmojis: (emojis: IEmoji[], userId: string) => void
  users: IUser[]
  loverUserId: string
}

const HomePage = (props: HomePageProps) => {
  const { emojis, addEmojis, users } = props
  const [showAddEmotionModal, setShowAddEmotionModal] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(props.loverUserId)

  const currentUser = users.find(
    u => u.id === (currentUserId || props.loverUserId)
  )
  const otherUser = users.find(u => u.id !== currentUser?.id)
  const isMe = currentUser?.id !== props.loverUserId
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

  if (!currentUser) {
    return null
  }

  const avatarUri = UserFunc.getThumbnailUrl(currentUser)
  const renderTopSection = () => (
    <TopSection>
      <ImageBackground
        style={styles.backgroundImage}
        source={ImageAssets.CurvyTopBg}
      >
        <CenterAvatar
          avatarContent={<AvatarCenterImage uri={avatarUri} />}
          hideAvatarBorder={!!avatarUri}
        />
        <PageTitleHolder>
          <TouchableOpacity
            onPress={() => {
              setCurrentUserId(otherUser?.id || '')
            }}
          >
            <MainLogo />
          </TouchableOpacity>
          <PageTitleText>{`${UserFunc.getCapitalizeName(
            currentUser
          )}'s Jar`}</PageTitleText>
        </PageTitleHolder>
      </ImageBackground>
    </TopSection>
  )

  const renderMiddleSection = () => {
    return (
      <MiddleSection>
        <JarContainer emojis={emojis} userId={currentUser.id} />
        <View style={styles.addButtonHolder}>
          {isMe && <AddEmotionButton onPress={onOpenAddEmotionModal} />}
        </View>
      </MiddleSection>
    )
  }

  const renderBottomSection = () => (
    <BottomSection>
      <ImageBackground
        style={[styles.backgroundImage, styles.bottomBackgroundImage]}
        source={ImageAssets.CurvyBottomBg}
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
        await addEmojis([newEmoji], currentUser.id)
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
        title='Tell me how you feel?'
        subtitle='ou can select your mood more one.'
      />
    )
  }

  return (
    <ScreenLayout hackHeight={ScreenHeight - TabbarHeight}>
      <PageView>
        {renderTopSection()}
        {renderMiddleSection()}
        {renderBottomSection()}
        {renderAddEmotionModal()}
      </PageView>
    </ScreenLayout>
  )
}

export default HomePage
