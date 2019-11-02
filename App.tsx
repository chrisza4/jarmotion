import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import * as ImageAssets from './assets/imageAssets'
import AppLayout from './ui/AppLayout'
import Fonts from './ui/styles/fonts'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    Promise.all([
      Font.loadAsync(Fonts),
      ...Object.values(ImageAssets).map(image =>
        Asset.fromModule(image).downloadAsync()
      )
    ]).then(() => setLoaded(true))
  }, [])

  if (!loaded) {
    return null
  }
  return <AppLayout />
}
