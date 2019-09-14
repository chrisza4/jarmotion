import { createStackNavigator } from 'react-navigation-stack'
import UnderConstructionPage from '../UnderConstructionPage'
import HomePage from './HomePage'

export default createStackNavigator(
  {
    Me: {
      screen: HomePage,
      path: 'me'
    },
    Couple: {
      screen: UnderConstructionPage,
      path: 'couple'
    }
  },
  {
    initialRouteName: 'Me',
    headerMode: 'none'
  }
)
