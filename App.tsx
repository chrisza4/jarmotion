import { Updates } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import * as ImageAssets from './assets/imageAssets'
import AppLayout from './ui/AppLayout'
import Fonts from './ui/styles/fonts'

let prevAppState = AppState.currentState
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (prevAppState.match(/inactive|background/) && nextAppState === 'active') {
    Updates.reload()
  }
  prevAppState = nextAppState
}

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

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  if (!loaded) {
    return null
  }
  return <AppLayout />
}
