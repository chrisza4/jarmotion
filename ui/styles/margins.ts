import { Platform, StatusBar } from 'react-native'
import { Dimensions } from 'react-native'
import { isIphoneX } from '../../utils/platforms'

export const StatusBarHeight =
  Platform.OS === 'ios'
    ? isIphoneX()
      ? 44
      : 20
    : StatusBar.currentHeight || 20
export const ScreenWidth = Math.round(Dimensions.get('window').width)
export const ScreenHeight = Math.round(Dimensions.get('window').height)
export const TabbarHeight = 48
