import React from 'react'
import { View, ViewStyle } from 'react-native'

export type CircleProps = {
  radius: number
  style?: ViewStyle
  children?: React.ReactNode
}

const Circle = (props: CircleProps) => {
  const { style, radius } = props
  const circleStyle: ViewStyle = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    ...style
  }
  return <View style={circleStyle}>{props.children}</View>
}

export default Circle
