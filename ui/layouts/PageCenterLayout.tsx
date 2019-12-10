import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

type PageCenterProps = {
  children?: React.ReactNode
  style?: ViewStyle
}

export default function PageCenterLayout(props: PageCenterProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...(props.style || {})
      }}
    >
      {props.children}
    </View>
  )
}
