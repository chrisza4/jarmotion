import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import Fonts from './ui/styles/fonts'
import Navigations from './ui/Navigations'

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
