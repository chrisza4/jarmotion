import React from 'react'
import { StyleSheet, View, StatusBar, Platform } from 'react-native'
import { isIphoneX } from '../../utils/platforms'
import { StatusBarHeight } from '../styles/margins'

const CrossPlatformStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBarHeight
  }
})

export default CrossPlatformStatusBar
