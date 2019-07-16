import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const NotificationButton = () => {
  return (
    <TouchableOpacity>
      <Image
        style={{ width: 70, height: 70 }}
        source={require('../../../assets/btn_notification.png')}
      />
    </TouchableOpacity>
  )
}

export default NotificationButton
