import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

type SendAlertButtonProps = {
  onPress?: () => void
}

const SendAlertButton = (props: SendAlertButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        style={{ width: 60, height: 60 }}
        source={ImageAssets.ImageButtonSendNotification}
      />
    </TouchableOpacity>
  )
}

export default SendAlertButton
