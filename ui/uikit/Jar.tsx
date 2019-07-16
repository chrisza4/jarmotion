import React from 'react'
import { Image } from 'react-native'

const Jar = () => {
  return (
    <Image
      style={{
        width: 130,
        height: 222,
        resizeMode: 'contain'
      }}
      source={require('../../assets/jar.png')}
    />
  )
}

export default Jar
