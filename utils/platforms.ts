import { Dimensions, Platform } from 'react-native'

export function isIphoneX() {
  const dim = Dimensions.get('window')

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}

type Dimension = {
  height: number
  width: number
}
export function isIPhoneXSize(dim: Dimension) {
  return dim.height === 812 || dim.width === 812
}

export function isIPhoneXrSize(dim: Dimension) {
  return dim.height === 896 || dim.width === 896
}
