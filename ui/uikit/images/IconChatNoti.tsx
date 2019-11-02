import React from 'react'
import { Image } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

const IconChatNoti = () => {
  return (
    <Image
      style={{
        width: 22,
        height: 19,
        resizeMode: 'contain'
      }}
      source={ImageAssets.IconChatNoti}
    />
  )
}

export default IconChatNoti
