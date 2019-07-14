import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { offWhite } from '../styles/colors'

const HomePage = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: offWhite
    }
  })
  return (
    <View style={styles.page}>
      <Text>Home Page</Text>
    </View>
  )
}

export default HomePage
