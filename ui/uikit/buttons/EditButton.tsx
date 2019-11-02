import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

type EditButtonProps = {
  onPress?: () => void
}

const EditButton = (props: EditButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image style={{ width: 13, height: 13 }} source={ImageAssets.IconEdit} />
    </TouchableOpacity>
  )
}

export default EditButton
