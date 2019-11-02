import React from 'react'
import { Image } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

const IconPeople = () => {
  return (
    <Image
      style={{
        width: 35,
        height: 35
      }}
      source={ImageAssets.IconPeople}
    />
  )
}

export default IconPeople
