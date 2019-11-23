import React from 'react'
import { Image, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'
import { BottomTabNavigatorConfig, createAppContainer } from 'react-navigation' // 1.0.0-beta.27
import { createBottomTabNavigator } from 'react-navigation-tabs'
import * as ImageAssets from '../assets/imageAssets'
import CalendarPageContainer from './calendar/CalendarPageContainer'
import HomePage from './home/HomePageNavigator'
import LoverPage from './lover/LoverPage'
import SensingPageContainer from './sensor/SensorPageContainer'
import { greenish } from './styles/colors'
import { TabbarHeight } from './styles/margins'
import UserSettingPageContainer from './user-settings/UserSettingPageContainer'

// Custom Type until PR get merged and add @types definition
// https://github.com/react-navigation/tabs/pull/147/files
type JarmotionBottomTabNavigatorConfig = BottomTabNavigatorConfig & {
  tabBarOptions: {
    activeTabButtonStyle: StyleProp<ViewStyle>
  }
}

const TabbarIcon = ({ source }: { source: ImageSourcePropType }) => (
  <Image
    style={{ height: 19, width: 22, resizeMode: 'contain' }}
    source={source}
  />
)

const createTabbarOption: (
  width: number
) => JarmotionBottomTabNavigatorConfig = width => {
  return {
    tabBarOptions: {
      showLabel: false,
      tabStyle: {
        borderTopWidth: width,
        borderTopColor: 'transparent'
      },
      style: {
        height: TabbarHeight
      },
      activeTabButtonStyle: {
        borderTopColor: greenish,
        borderTopWidth: width
      }
    }
  }
}

const bottomTabNavigatorConfig: JarmotionBottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }: { navigation: any }) => ({
    tabBarIcon: () => {
      switch (navigation.state.routeName) {
        case 'Home':
          return <TabbarIcon source={ImageAssets.TabbarDashboard} />
        case 'Calendar':
          return <TabbarIcon source={ImageAssets.TabbarCalendar} />
        case 'Lover':
          return <TabbarIcon source={ImageAssets.TabbarLover} />
        case 'Sensing':
          return <TabbarIcon source={ImageAssets.TabbarDiary} />
        case 'Settings':
          return <TabbarIcon source={ImageAssets.TabbarSettings} />

        default:
          return null
      }
    }
  }),
  ...createTabbarOption(6)
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: () => ({})
    },
    Calendar: CalendarPageContainer,
    Lover: LoverPage,
    Sensing: SensingPageContainer,
    Settings: UserSettingPageContainer
  },
  bottomTabNavigatorConfig
)

export default createAppContainer(TabNavigator)
