import React from 'react'
import { Image, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

type AddEmotionButtonProps = {
  onPress?: () => void
  loading?: boolean
}
const AddEmotionButton = (props: AddEmotionButtonProps) => {
  const style: StyleProp<ViewStyle> = {
    opacity: props.loading ? 0.3 : undefined
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={style}>
      <Image
        style={{ width: 70, height: 70 }}
        source={ImageAssets.ImageButtonAddEmotion}
      />
    </TouchableOpacity>
  )
}

export default AddEmotionButton
