import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { EmojiStat } from '../../domains/emojis/EmojiTypes'
import { IUser } from '../../domains/users/UserTypes'
import { LoadingState } from '../../types/LoadingState'
import { getHumanMonth } from '../../utils/utils'
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
  fetchStats: (userId: string, year: number, month: number) => Promise<void>
  loadState: LoadingState
  emojiStats: EmojiStat
  onShowEmojis: (user: IUser, date: Date) => void
}

interface ICalendarState {
  month: number
  year: number
}

function getHumanMonthFromCalendarState(state: ICalendarState) {
  return state.month + 1
}
const now = new Date()

const CalendarPage = (props: CalendarPageProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [currentCalendarState, setCurrentCalendarState] = useState<
    ICalendarState
  >({ month: now.getMonth(), year: now.getFullYear() })
  useEffect(() => {
    if (props.users.length > 0) {
      setSelectedUserId(props.users[0].id)
      props.fetchStats(props.users[0].id, now.getFullYear(), getHumanMonth(now))
    }
  }, [props.users])

  const currentUser = props.users.find(p => p.id === selectedUserId)
  const onNextMonth = () => {
    const nextMonthDate = moment
      .utc([currentCalendarState.year, currentCalendarState.month, 1])
      .add(1, 'month')
    const year = nextMonthDate.year()
    const month = nextMonthDate.month()
    const humanMonth = getHumanMonth(nextMonthDate.toDate())
    setCurrentCalendarState({ month, year })
    if (selectedUserId) {
      props.fetchStats(selectedUserId, year, humanMonth)
    }
  }

  const onPrevMonth = () => {
    const nextMonthDate = moment
      .utc([currentCalendarState.year, currentCalendarState.month, 1])
      .add(-1, 'month')
    const year = nextMonthDate.year()
    const month = nextMonthDate.month()
    const humanMonth = getHumanMonth(nextMonthDate.toDate())
    setCurrentCalendarState({ month, year })
    if (selectedUserId) {
      props.fetchStats(selectedUserId, year, humanMonth)
    }
  }

  const onChangeUser = (newUserId: string) => {
    setSelectedUserId(newUserId)
    const { year } = currentCalendarState
    props.fetchStats(
      newUserId,
      year,
      getHumanMonthFromCalendarState(currentCalendarState)
    )
  }

  const renderUserSelectors = () => {
    return props.users.map(user => (
      <TouchableWithoutFeedback
        key={user.id}
        onPress={() => onChangeUser(user.id)}
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
        emojiStats={props.emojiStats}
        onClickDate={date => {
          if (!currentUser) {
            return
          }
          props.onShowEmojis(currentUser, date)
        }}
      />
    </PageLayout>
  )
}

export default CalendarPage
