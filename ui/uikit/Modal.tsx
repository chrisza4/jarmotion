import React, { ReactNode } from 'react'
import {
  Modal as ReactNativeModal,
  View,
  StyleSheet,
  ViewStyle
} from 'react-native'
import { StatusBarHeight } from '../styles/margins'
import { grayBorder, sicklyYellow } from '../styles/colors'

type ModalProps = {
  children: React.ReactNode
  show: boolean
  onClose?: () => void
  showFooter?: boolean
  footerStyle?: ViewStyle
  footer?: ReactNode
}

const ModalBorderRadius = 15

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
  modalStyle: {
    top: 21 + StatusBarHeight,
    left: 15,
    right: 15,
    bottom: 21,
    backgroundColor: 'white',
    opacity: 1,
    position: 'absolute',
    borderColor: grayBorder,
    borderRadius: ModalBorderRadius
  },
  modalContent: {
    padding: 10
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: sicklyYellow,
    borderBottomLeftRadius: ModalBorderRadius,
    borderBottomRightRadius: ModalBorderRadius,
    justifyContent: 'center'
  }
})

const Modal = (props: ModalProps) => {
  const renderFooter = () => {
    if (!props.showFooter) return null
    const footerStyle = {
      ...styles.footer,
      ...(props.footerStyle || {})
    }
    return <View style={footerStyle}>{props.footer}</View>
  }
  return (
    <ReactNativeModal
      animationType='fade'
      transparent={true}
      visible={props.show}
      onRequestClose={props.onClose}
    >
      <View style={styles.modalBackground} />
      <View style={styles.modalStyle}>
        <View style={styles.modalContent}>{props.children}</View>
        {renderFooter()}
      </View>
    </ReactNativeModal>
  )
}

export default Modal
