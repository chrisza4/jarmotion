import _ from 'lodash'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IDisplayAlertItem } from '../../../domains/alert/AlertTypes'
import TextButton, { TextButtonStyle } from '../../uikit/buttons/TextButton'
import Modal from '../../uikit/Modal'
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
const ModalContent = styled.View`
  margin-top: 5px;
`
const TitleView = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`
const TitleText = styled.Text`
  font-family: 'poppins-semibold';
  font-size: 21;
`
const ModalBody = styled.View`
  top: 10;
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
              onAckAlert={props.onAckAlert}
            />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AlertModal
