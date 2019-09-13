import React from 'react'
import { Image, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'
import { BottomTabNavigatorConfig, createAppContainer } from 'react-navigation' // 1.0.0-beta.27
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomePage from './home/HomePage'
import { greenish } from './styles/colors'
import UnderConstructionPage from './UnderConstructionPage'

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
      activeTabButtonStyle: {
        borderTopColor: greenish,
        borderTopWidth: width
      }
    }
  }
}

const bottomTabNavigatorConfig: JarmotionBottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      switch (navigation.state.routeName) {
        case 'Home':
          return (
            <TabbarIcon source={require('../assets/tabbar_dashboard.png')} />
          )
        case 'Calendar':
          return (
            <TabbarIcon source={require('../assets/tabbar_calendar.png')} />
          )
        case 'Diary':
          return <TabbarIcon source={require('../assets/tabbar_diary.png')} />
        case 'Settings':
          return (
            <TabbarIcon source={require('../assets/tabbar_settings.png')} />
          )
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
    Calendar: UnderConstructionPage,
    Diary: UnderConstructionPage,
    Settings: UnderConstructionPage
  },
  bottomTabNavigatorConfig
)

export default createAppContainer(TabNavigator)
