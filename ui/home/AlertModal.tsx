import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IAlert, IDisplayAlertItem } from '../../domains/alert/AlertTypes'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import Modal from '../uikit/Modal'

interface IAlertModalProps {
  alerts: IDisplayAlertItem[]
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
        <View style={{ top: 20 }}>
          {props.alerts.map(alert => (
            <AlertItem key={alert.alertId} displayAlert={alert} />
          ))}
          {/* <AlertItem displayAlert={getMockDisplayAlert()}></AlertItem>
          <AlertItem displayAlert={getMockDisplayAlert()}></AlertItem>
          <AlertItem displayAlert={getMockDisplayAlert()}></AlertItem>
          <AlertItem displayAlert={getMockDisplayAlert()}></AlertItem> */}
        </View>
      </View>
    </Modal>
  )
}

interface IAlertItemProps {
  displayAlert: IDisplayAlertItem
}

const alertItemStyles = StyleSheet.create({
  alertItem: {
    borderRadius: 10,
    borderColor: 'silver',
    borderWidth: 0.3,
    borderStyle: 'solid',
    height: 80,
    marginTop: 10,
    padding: 9
  },
  timeText: {
    fontFamily: 'poppins-light'
  },
  messageText: {
    fontFamily: 'poppins-bold'
  }
})

const AlertItem = (props: IAlertItemProps) => {
  return (
    <View style={alertItemStyles.alertItem}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={alertItemStyles.timeText}>
          {moment(props.displayAlert.sentAt).fromNow()}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={alertItemStyles.messageText}>
          {props.displayAlert.message}
        </Text>
      </View>
    </View>
  )
}

export default AlertModal
