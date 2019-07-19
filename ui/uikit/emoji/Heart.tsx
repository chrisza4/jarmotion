import React from 'react'
import { Image } from 'react-native'

const Heart = () => {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
        resizeMode: 'contain'
      }}
      source={require('../../../assets/emoji_heart.png')}
    />
  )
}

export default Heart
