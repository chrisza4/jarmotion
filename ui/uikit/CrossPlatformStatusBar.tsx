import React from 'react'
import { StyleSheet, View, StatusBar, Platform } from 'react-native'
import { isIphoneX } from '../../utils/platforms'

const CrossPlatformStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
})

export default CrossPlatformStatusBar
