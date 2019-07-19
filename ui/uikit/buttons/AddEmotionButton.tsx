import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

type AddEmotionButtonProps = {
  onPress?: () => void
}
const AddEmotionButton = (props: AddEmotionButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        style={{ width: 70, height: 70 }}
        source={require('../../../assets/btn_add_emotion.png')}
      />
    </TouchableOpacity>
  )
}

export default AddEmotionButton
