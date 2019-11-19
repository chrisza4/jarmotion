import * as ImagePicker from 'expo-image-picker'

import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'

export async function getImageFromDevice() {
  if (Platform.OS === 'ios') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }
  }
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  })
}
