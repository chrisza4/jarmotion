import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Modal from '../uikit/Modal'
import { StatusBarHeight } from '../styles/margins'
import { sicklyYellow } from '../styles/colors'

type AddEmotionModalProps = {
  show: boolean
}

const styles = StyleSheet.create({
  title: {
    marginTop: 5
  },
  textCenterHolder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  textHeader: {
    fontFamily: 'poppins-semibold',
    fontSize: 21
  },
  textHeaderDescription: {
    fontFamily: 'poppins-light'
  }
})

const AddEmotionModal = (props: AddEmotionModalProps) => {
  const footer = <Text>Footer</Text>
  return (
    <Modal show={props.show} showFooter footer={footer}>
      <View style={styles.title}>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeader}>Tell me how you feel?</Text>
        </View>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeaderDescription}>
            You can select your mood more one.
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default AddEmotionModal
