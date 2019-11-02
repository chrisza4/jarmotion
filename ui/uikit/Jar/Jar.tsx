import React from 'react'
import { Image } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'
import { JarHeight, JarWidth } from './JarConstants'

const Jar = () => {
  return (
    <Image
      style={{
        width: JarWidth,
        height: JarHeight,
        resizeMode: 'contain'
      }}
      source={ImageAssets.Jar}
    />
  )
}

export default Jar
