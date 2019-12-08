import moment from 'moment'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { isUnacknowledge } from '../../../domains/alert/AlertFunc'
import {
  AlertSource,
  IDisplayAlertItem
} from '../../../domains/alert/AlertTypes'

interface IAlertItemProps {
  displayAlert: IDisplayAlertItem
  onAckAlert: (alertId: string) => Promise<void>
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
  flex-direction: row;
`
const AlertMessageText = styled.Text<IAlertStatus>`
  font-family: poppins-bold;
  ${props => (props.unack ? 'color: red;' : '')}
`

const AlertItem = (props: IAlertItemProps) => {
  const canAck =
    props.displayAlert.side === AlertSource.MeReceived &&
    isUnacknowledge(props.displayAlert)
  return (
    <TouchableOpacity
      disabled={!canAck}
      onPress={() => props.onAckAlert(props.displayAlert.alertId)}
    >
      <AlertItemWrapper unack={canAck}>
        <AlertItemTimeWrapper>
          <AlertItemTimeText unack={canAck}>
            {moment(props.displayAlert.sentAt).fromNow()}
          </AlertItemTimeText>
        </AlertItemTimeWrapper>
        <AlertMessageTextWrapper>
          <AlertMessageText unack={canAck}>
            {props.displayAlert.message}
          </AlertMessageText>
        </AlertMessageTextWrapper>
      </AlertItemWrapper>
    </TouchableOpacity>
  )
}

export default AlertItem
