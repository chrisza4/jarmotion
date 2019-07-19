import React from 'react'
import { StyleSheet, View } from 'react-native'
import Heart from './emoji/Heart'
import Jar from './Jar'

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute'
  }
})

const JarContainer = () => {
  return (
    <View>
      <Jar />
      <View style={styles.emoji}>
        <Heart />
      </View>
    </View>
  )
}

export default JarContainer
