import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import Navigations from './ui/Navigations'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    Font.loadAsync({
      poppins: require('./assets/font/Poppins-Regular.ttf'),
      'poppins-medium': require('./assets/font/Poppins-Medium.ttf'),
      'poppins-semibold': require('./assets/font/Poppins-SemiBold.ttf'),
      'poppins-light': require('./assets/font/Poppins-Light.ttf'),
      'poppins-bold': require('./assets/font/Poppins-Bold.ttf')
    }).then(() => setLoaded(true))
  }, [])

  if (!loaded) {
    return null
  }
  return <Navigations />
}
