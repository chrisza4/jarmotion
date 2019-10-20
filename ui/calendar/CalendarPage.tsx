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

const CalendarPage = (props: CalendarPageProps) => {
  const [selectedUserId, setSelectedUserId] = useState(props.users[0].id)

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
      <Calendar />
    </PageLayout>
  )
}

export default CalendarPage
