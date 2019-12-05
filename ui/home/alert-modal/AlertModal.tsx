import _ from 'lodash'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import {
  AlertSource,
  IDisplayAlertItem
} from '../../../domains/alert/AlertTypes'
import TextButton, { TextButtonStyle } from '../../uikit/buttons/TextButton'
import Modal, {
  ModalBody,
  ModalContent,
  TitleText,
  TitleView
} from '../../uikit/Modal'
import AlertItem from './AlertItem'

interface IAlertModalProps {
  alerts: IDisplayAlertItem[]
  show?: boolean
  onClose: () => void
  onAckAlert: (alertId: string) => Promise<void>
}

const CloseButtonWrapper = styled.View`
  align-self: flex-end;
`

const AlertModal = (props: IAlertModalProps) => {
  const footer = (
    <View>
      <CloseButtonWrapper>
        <TextButton
          text='CLOSE'
          buttonStyle={TextButtonStyle.PlainText}
          onPress={props.onClose || _.noop}
        />
      </CloseButtonWrapper>
    </View>
  )
  return (
    <Modal show={!!props.show} showFooter footer={footer}>
      <ModalContent>
        <TitleView>
          <TitleText>Recent Alerts</TitleText>
        </TitleView>
        <ModalBody>
          {props.alerts.map(alert => (
            <AlertItem
              key={alert.alertId}
              displayAlert={alert}
              onAckAlert={async () => {
                if (alert.side === AlertSource.MeReceived) {
                  return props.onAckAlert(alert.alertId)
                }
              }}
            />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AlertModal
