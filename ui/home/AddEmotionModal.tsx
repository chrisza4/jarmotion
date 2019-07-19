import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Modal from '../uikit/Modal'
import { StatusBarHeight } from '../styles/margins'

type AddEmotionModalProps = {
  show: boolean
}

const styles = StyleSheet.create({
  modalBackground: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5
  },
  modalContent: {
    top: 21 + StatusBarHeight,
    left: 15,
    right: 15,
    bottom: 21,
    backgroundColor: 'white',
    opacity: 1,
    position: 'absolute'
  }
})

const AddEmotionModal = (props: AddEmotionModalProps) => {
  return (
    <Modal show={props.show}>
      <Text>Modal</Text>
    </Modal>
  )
}

export default AddEmotionModal
