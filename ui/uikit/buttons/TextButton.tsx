import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { blackButton } from '../../styles/colors'

type TextButtonProps = {
  text: string
  onPress?: () => void
  buttonStyle?: TextButtonStyle
  disabled?: boolean
  style?: StyleProp<ViewStyle>
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
    ...defaultButtonStyle,
    paddingHorizontal: 30,
    paddingVertical: 14
  }
})

const TextButton = (props: TextButtonProps) => {
  const getStyle = () => {
    switch (props.buttonStyle) {
      case TextButtonStyle.BlackButton:
        return blackButtonStyle
      case TextButtonStyle.PlainText:
      default:
        return plainTextButtonStyle
    }
  }
  const buttonStyle = getStyle()
  const disabledStyle = props.disabled ? { opacity: 0.5 } : {}
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <View style={[buttonStyle.buttonStyle, disabledStyle, props.style]}>
        <Text style={buttonStyle.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TextButton
