import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle
} from 'react-native'
import { blackButton } from '../../styles/colors'

type TextButtonProps = {
  text: string
  onPress?: () => void
  style?: TextButtonStyle
}

export enum TextButtonStyle {
  PlainText = 'PlainText',
  BlackButton = 'BlackButton'
}

const defaultButtonStyle: ViewStyle = {
  height: 35,
  width: 70,
  justifyContent: 'center',
  alignItems: 'center'
}

const plainTextButtonStyle = StyleSheet.create({
  textStyle: {
    fontFamily: 'poppins-bold',
    fontSize: 14
  },
  buttonStyle: {
    ...defaultButtonStyle
  }
})

const blackButtonStyle = StyleSheet.create({
  textStyle: {
    fontFamily: 'poppins-bold',
    fontSize: 14,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: blackButton,
    borderRadius: 10,
    ...defaultButtonStyle
  }
})

const TextButton = (props: TextButtonProps) => {
  const getStyle = () => {
    switch (props.style) {
      case TextButtonStyle.BlackButton:
        return blackButtonStyle
      case TextButtonStyle.PlainText:
      default:
        return plainTextButtonStyle
    }
  }
  const buttonStyle = getStyle()
  return (
    <TouchableOpacity>
      <View style={buttonStyle.buttonStyle}>
        <Text style={buttonStyle.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TextButton
