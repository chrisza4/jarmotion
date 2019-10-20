import moment from 'moment'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { IUser } from '../../domains/users/UserTypes'
import { PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import { brownishGrey } from '../styles/colors'
import Calendar from '../uikit/Calendar'

const UserSelectorRow = styled.View`
  margin-top: 30px;
  flex-direction: row;
  flex: 1;
`
const UserSelectorHolder = styled.View<{ last?: boolean }>`
  flex: 1;
  align-items: center;
  ${props =>
    !props.last &&
    `
    border-right-color: ${brownishGrey};
    border-right-width: 0.5px;
    border-style: solid;
  `}
  height: 25px;
`

const UserSelectorText = styled.Text<{ selected?: boolean }>`
  font-family: poppins-bold;
  font-size: 16px;
  text-decoration-line: ${props => (props.selected ? 'underline' : 'none')};
`

type CalendarPageProps = {
  users: IUser[]
}

interface ICalendarState {
  month: number
  year: number
}

const now = new Date()

const CalendarPage = (props: CalendarPageProps) => {
  const [selectedUserId, setSelectedUserId] = useState(props.users[0].id)
  const [currentCalendarState, setCurrentCalendarState] = useState<
    ICalendarState
  >({ month: now.getMonth(), year: now.getFullYear() })

  const onNextMonth = () => {
    const nextMonthDate = moment
      .utc([currentCalendarState.year, currentCalendarState.month, 1])
      .add(1, 'month')
    setCurrentCalendarState({
      month: nextMonthDate.month(),
      year: nextMonthDate.year()
    })
  }

  const onPrevMonth = () => {
    const nextMonthDate = moment
      .utc([currentCalendarState.year, currentCalendarState.month, 1])
      .add(-1, 'month')
    setCurrentCalendarState({
      month: nextMonthDate.month(),
      year: nextMonthDate.year()
    })
  }

  const renderUserSelectors = () => {
    return props.users.map(user => (
      <TouchableWithoutFeedback
        key={user.id}
        onPress={() => setSelectedUserId(user.id)}
      >
        <UserSelectorHolder>
          <UserSelectorText selected={selectedUserId === user.id}>
            {user.name}
          </UserSelectorText>
        </UserSelectorHolder>
      </TouchableWithoutFeedback>
    ))
  }
  return (
    <PageLayout titleElement={<PageTitleText>Calendar</PageTitleText>}>
      <UserSelectorRow>{renderUserSelectors()}</UserSelectorRow>
      <Calendar
        month={currentCalendarState.month}
        year={currentCalendarState.year}
        onNextMonth={() => onNextMonth()}
        onPrevMonth={() => onPrevMonth()}
      />
    </PageLayout>
  )
}

export default CalendarPage
