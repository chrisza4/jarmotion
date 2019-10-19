import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

type EditButtonProps = {
  onPress?: () => void
}

const EditButton = (props: EditButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        style={{ width: 13, height: 13 }}
        source={require('../../../assets/icon_edit.png')}
      />
    </TouchableOpacity>
  )
}

export default EditButton
