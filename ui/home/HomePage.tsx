import React from 'react'
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'
import { offWhite } from '../styles/colors'
import ScreenLayout from '../layouts/ScreenLayout'
import IconPeople from '../uikit/images/IconPeople'
import MainLogo from '../uikit/images/MainLogo'
import NotificationButton from '../uikit/buttons/NotificationButton'

const HomePage = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: offWhite,
      height: '100%'
    },
    topBackgroundImage: {
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
      paddingLeft: 10,
      paddingTop: 7.5,
      paddingBottom: 7.5,
      flexDirection: 'row'
    }
  })
  return (
    <ScreenLayout>
      <View style={styles.page}>
        <ImageBackground
          style={styles.topBackgroundImage}
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
            <Text style={{ color: 'black' }}>Placeholder</Text>
          </View>
        </ImageBackground>
      </View>
    </ScreenLayout>
  )
}

export default HomePage
