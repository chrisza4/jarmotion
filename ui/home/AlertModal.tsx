import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { isUnacknowledge } from '../../domains/alert/AlertFunc'
import { IDisplayAlertItem } from '../../domains/alert/AlertTypes'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import Modal from '../uikit/Modal'

interface IAlertModalProps {
  alerts: IDisplayAlertItem[]
  show?: boolean
  onClose: () => void
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
          style={TextButtonStyle.PlainText}
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
            <AlertItem key={alert.alertId} displayAlert={alert} />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

interface IAlertItemProps {
  displayAlert: IDisplayAlertItem
}

interface IAlertStatus {
  unack: boolean
}

const AlertItemWrapper = styled.View<IAlertStatus>`
  border-radius: 10px;
  border-color: ${props => (props.unack ? 'red' : 'silver')}
  border-width: ${props => (props.unack ? 1 : 0.3)};
  border-style: solid;
  height: 80px;
  margin-top: 10px;
  padding: 9px;
`

const AlertItemTimeWrapper = styled.View`
  flex-direction: row;
`

const AlertItemTimeText = styled.Text<IAlertStatus>`
  font-family: poppins-light;
  ${props => (props.unack ? 'color: red;' : '')}
`

const AlertMessageTextWrapper = styled.View`
  margin-top: 10px;
`
const AlertMessageText = styled.Text<IAlertStatus>`
  font-family: poppins-bold;
  ${props => (props.unack ? 'color: red;' : '')}
`

const AlertItem = (props: IAlertItemProps) => {
  const unack = isUnacknowledge(props.displayAlert)
  return (
    <AlertItemWrapper unack={unack}>
      <AlertItemTimeWrapper>
        <AlertItemTimeText unack={unack}>
          {moment(props.displayAlert.sentAt).fromNow()}
        </AlertItemTimeText>
      </AlertItemTimeWrapper>
      <AlertMessageTextWrapper>
        <AlertMessageText unack={unack}>
          {props.displayAlert.message}
        </AlertMessageText>
      </AlertMessageTextWrapper>
    </AlertItemWrapper>
  )
}

export default AlertModal
