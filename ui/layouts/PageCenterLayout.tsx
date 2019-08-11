import React from 'react'
import { View } from 'react-native'

type PageCenterProps = {
  children?: React.ReactNode
}

export default function PageCenterLayout(props: PageCenterProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {props.children}
    </View>
  )
}
