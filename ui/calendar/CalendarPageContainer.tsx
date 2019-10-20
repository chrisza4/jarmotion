import { observer } from 'mobx-react'
import React from 'react'
import UserStore from '../../stores/UserStore'
import CalendarPage from './CalendarPage'

const CalendarPageContainer = observer(() => {
  return <CalendarPage users={UserStore.users} />
})

export default CalendarPageContainer
