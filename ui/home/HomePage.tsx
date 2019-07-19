import React from 'react'
import { StyleSheet, View, ImageBackground, Text, Alert } from 'react-native'
import { offWhite, greenish, brownishGrey } from '../styles/colors'
import ScreenLayout from '../layouts/ScreenLayout'
import IconPeople from '../uikit/images/IconPeople'
import MainLogo from '../uikit/images/MainLogo'
import NotificationButton from '../uikit/buttons/NotificationButton'
import IconChatNoti from '../uikit/images/IconChatNoti'
import Jar from '../uikit/Jar'
import Circle from '../uikit/Circle'
import NameTag from '../uikit/NameTag'
import AddEmotionButton from '../uikit/buttons/AddEmotionButton'

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
  jarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 31
  },
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

const HomePage = () => {
  const onAddEmotion = () => {
    Alert.alert('Jarmotion', 'Implementing')
  }
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

  const renderMiddleSection = () => (
    <View>
      <View style={styles.jarSection}>
        <Jar />
      </View>
      <View style={styles.addButtonHolder}>
        <AddEmotionButton onPress={onAddEmotion} />
      </View>
    </View>
  )

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

  return (
    <ScreenLayout>
      <View style={styles.page}>
        {renderTopSection()}
        {renderMiddleSection()}
        {renderBottomSection()}
      </View>
    </ScreenLayout>
  )
}

export default HomePage
