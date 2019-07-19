import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const UnderConstructionPage = () => {
  const styles = StyleSheet.create({
    centreContent: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  return (
    <View style={styles.centreContent}>
      <Text>Under construction</Text>
    </View>
  )
}

export default UnderConstructionPage
