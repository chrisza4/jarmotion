import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import AuthStore from '../stores/AuthStore'

const LogoutPage = () => {
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
      <Button title='Log out' onPress={() => AuthStore.destroyAuthToken()} />
    </View>
  )
}

export default LogoutPage
