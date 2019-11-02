import React from 'react'
import { Image } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

const MainLogo = () => {
  return (
    <Image
      style={{
        width: 45,
        height: 65,
        resizeMode: 'contain'
      }}
      source={ImageAssets.Logo}
    />
  )
}

export default MainLogo
