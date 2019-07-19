import React from 'react'
import { Modal as ReactNativeModal, View, StyleSheet } from 'react-native'
import { StatusBarHeight } from '../styles/margins'
import { grayBorder } from '../styles/colors'

type ModalProps = {
  children: React.ReactNode
  show: boolean
  onClose?: () => void
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
    position: 'absolute',
    borderColor: grayBorder,
    borderRadius: 15,
    padding: 10
  }
})

const Modal = (props: ModalProps) => {
  return (
    <ReactNativeModal
      animationType='fade'
      transparent={true}
      visible={props.show}
      onRequestClose={props.onClose}
    >
      <View style={styles.modalBackground} />
      <View style={styles.modalContent}>{props.children}</View>
    </ReactNativeModal>
  )
}

export default Modal
