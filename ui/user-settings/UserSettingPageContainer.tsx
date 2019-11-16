import { observer } from 'mobx-react'
import React from 'react'
import AuthStore from '../../stores/AuthStore'
import UserStore from '../../stores/UserStore'
import UserSettingPage from './UserSettingPage'

const UserSettingPageContainer = observer(() => {
  return (
    <UserSettingPage
      me={UserStore.me}
      onLogout={() => AuthStore.destroyAuthToken()}
    />
  )
})

export default UserSettingPageContainer
