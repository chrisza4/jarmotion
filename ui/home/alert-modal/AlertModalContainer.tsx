import { observer } from 'mobx-react'
import React from 'react'
import { getDisplayableAlert } from '../../../domains/alert/AlertFunc'
import AlertStore from '../../../stores/AlertStore'
import UserStore from '../../../stores/UserStore'
import AlertModal from './AlertModal'

interface IAlertModalContainerProps {
  show?: boolean
  onClose: () => void
}

const AlertModalContainer = observer(
  (props: IAlertModalContainerProps): JSX.Element => {
    const displayAlerts = AlertStore.alerts.map(alert =>
      getDisplayableAlert(alert, UserStore.me, [UserStore.couple])
    )
    return (
      <AlertModal
        alerts={displayAlerts}
        onClose={props.onClose}
        show={props.show}
        onAckAlert={id => AlertStore.ackAlert(id)}
      />
    )
  }
)

export default AlertModalContainer
