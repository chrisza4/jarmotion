import React from 'react'
import { Image } from 'react-native'
import { JarHeight, JarWidth } from './JarConstants'

const Jar = () => {
  return (
    <Image
      style={{
        width: JarWidth,
        height: JarHeight,
        resizeMode: 'contain'
      }}
      source={require('../../../assets/jar.png')}
    />
  )
}

export default Jar
