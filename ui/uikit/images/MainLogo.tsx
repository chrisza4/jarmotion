import React from 'react'
import { Image } from 'react-native'

const MainLogo = () => {
  return (
    <Image
      style={{
        width: 45,
        height: 65,
        resizeMode: 'contain'
      }}
      source={require('../../../assets/logo.png')}
    />
  )
}

export default MainLogo
