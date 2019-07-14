import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { offWhite } from '../styles/colors'
import ScreenLayout from '../layouts/ScreenLayout'

const HomePage = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: offWhite
    }
  })
  return (
    <ScreenLayout>
      <View style={styles.page} />
    </ScreenLayout>
  )
}

export default HomePage
