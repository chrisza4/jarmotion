import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
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
