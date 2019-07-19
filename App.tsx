import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import Navigations from './ui/Navigations'
import Fonts from './ui/styles/fonts'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    Font.loadAsync(Fonts).then(() => setLoaded(true))
  }, [])

  if (!loaded) {
    return null
  }
  return <Navigations />
}
