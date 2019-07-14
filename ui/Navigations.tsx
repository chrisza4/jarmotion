import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation' // 1.0.0-beta.27
import HomePage from './home/HomePage'
import UnderConstructionPage from './UnderConstructionPage'

const TabNavigator = createBottomTabNavigator({
  Home: HomePage,
  Calendar: UnderConstructionPage,
  Diary: UnderConstructionPage,
  Settings: UnderConstructionPage
})

export default createAppContainer(TabNavigator)
