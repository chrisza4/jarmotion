import React from 'react'
import { Image } from 'react-native'

const IconChatNoti = () => {
  return (
    <Image
      style={{
        width: 22,
        height: 19,
        resizeMode: 'contain'
      }}
      source={require('../../../assets/icon_chat_noti.png')}
    />
  )
}

export default IconChatNoti
