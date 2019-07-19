import { Platform, StatusBar } from 'react-native'
import { isIphoneX } from '../../utils/platforms'

export const StatusBarHeight =
  Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight
