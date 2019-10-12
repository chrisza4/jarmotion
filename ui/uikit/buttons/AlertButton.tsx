import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const AlertButton = () => {
  return (
    <TouchableOpacity>
      <Image
        style={{ width: 70, height: 70 }}
        source={require('../../../assets/btn_notification.png')}
      />
    </TouchableOpacity>
  )
}

export default AlertButton
