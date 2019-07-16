import React from 'react'
import { View, ViewStyle, Text, TextStyle } from 'react-native'
import { purple } from '../styles/colors'

export type NameTagProps = {
  name: string
  style?: ViewStyle
}

const NameTag = (props: NameTagProps) => {
  const { style, name } = props
  const NameTagStyle: ViewStyle = {
    width: 60,
    height: 20,
    backgroundColor: purple,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    ...style
  }
  const textStyle: TextStyle = {
    fontFamily: 'poppins-bold',
    color: 'white',
    fontSize: 10,
    alignSelf: 'center'
  }
  return (
    <View style={NameTagStyle}>
      <Text style={textStyle}>{name}</Text>
    </View>
  )
}

export default NameTag
