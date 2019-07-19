import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { sicklyYellow } from '../styles/colors'
import CrossPlatformStatusBar from '../uikit/CrossPlatformStatusBar'

type ScreenLayoutProps = {
  children: React.ReactNode
}

const ScreenLayout = (props: ScreenLayoutProps) => {
  return (
    <View>
      <CrossPlatformStatusBar
        backgroundColor={sicklyYellow}
        barStyle='light-content'
      />
      <SafeAreaView>{props.children}</SafeAreaView>
    </View>
  )
}

export default ScreenLayout
