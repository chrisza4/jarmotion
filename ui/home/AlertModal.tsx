import _ from 'lodash'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IAlert } from '../../domains/alert/AlertTypes'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import Modal from '../uikit/Modal'

interface IAlertModalProps {
  alerts: IAlert[]
  show?: boolean
  onClose: () => void
}

// Prepare to Refactor.... Nearly same style as AddEmotionModal
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
  closeButton: {
    alignSelf: 'flex-end'
  }
})

const AlertModal = (props: IAlertModalProps) => {
  const footer = (
    <View>
      <View style={styles.closeButton}>
        <TextButton
          text='CLOSE'
          style={TextButtonStyle.PlainText}
          onPress={props.onClose || _.noop}
        />
      </View>
    </View>
  )
  return (
    <Modal show={!!props.show} showFooter footer={footer}>
      <View style={styles.title}>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeader}>Recent Alerts</Text>
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal
