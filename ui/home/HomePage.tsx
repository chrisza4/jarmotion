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
    notificationButton: {
      top: 10,
      right: 10,
      width: 70,
      height: 70,
      position: 'absolute'
    },
    logo: {
      width: 45,
      height: 65,
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
          <TouchableOpacity>
            <Image
              style={styles.notificationButton}
              source={require('../../assets/btn_notification.png')}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <View style={styles.chatSection}>
            <Text style={{ color: 'black' }}>Placeholder</Text>
          </View>
        </ImageBackground>
      </View>
    </ScreenLayout>
  )
}

export default HomePage
