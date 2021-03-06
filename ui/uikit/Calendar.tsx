import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import Triangle from 'react-native-triangle'
import styled from 'styled-components/native'
import { EmojiStat } from '../../domains/emojis/EmojiTypes'
import { sicklyYellow } from '../styles/colors'
import { ScreenWidth } from '../styles/margins'
import Emoji from '../uikit/emoji/Emoji'

const getCalendarDatesFromStartDate = (start: moment.Moment) => {
  const result = []
  for (let i = 0; i < 35; i++) {
    result.push(moment(start).add(i, 'day'))
  }
  return result
}

const calendarCellWidth = (ScreenWidth - 20) / 7

const calendarRowStyled = `
  flex-direction: row;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 10px;
`

const WeekRow = styled.View`
  ${calendarRowStyled}
  height: 32px;
  background-color: white;
  border-radius: 17px;
  align-items: center;
  font-family: poppins-light;
`

const DateRow = styled.View`
  ${calendarRowStyled};
  height: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom-color: #b2b2b2;
  border-bottom-width: 0.3px;
  border-style: solid;
  align-items: center;
`
const DateText = styled.Text<{ blur: boolean }>`
  text-align: center;
  align-self: center;
  flex-grow: 1;
  font-family: poppins-medium;
  opacity: ${props => (props.blur ? 0.4 : 1)};
`

const DateView = styled.TouchableOpacity<{ today: boolean }>`
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.today ? sicklyYellow : 'transparent')};
  height: 44px;
  border-radius: 15px;
  width: 30px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
`

const TextWeek = styled.Text`
  flex-grow: 1;
  text-align: center;
  width: ${calendarCellWidth}px;
`

const MonthSelectorRow = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 20px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
`

const MonthSelectedText = styled.Text`
  font-family: poppins-bold;
  font-size: 18px;
`

const monthTouchableStyle = `
  width: 30px;
  height: 100%;
  flex-direction: row;
  align-items: center;
`
const PrevMonthTouchable = styled.TouchableOpacity`
  ${monthTouchableStyle}
  justify-content: flex-start;
`
const NextMonthTouchable = styled.TouchableOpacity`
  ${monthTouchableStyle}
  justify-content: flex-end;
`

type CalendarProps = {
  year?: number
  month?: number
  onNextMonth?: () => void
  onPrevMonth?: () => void
  emojiStats: EmojiStat
  onClickDate?: (date: Date) => void
}

type MonthButtonProps = {
  onPress?: () => any
}
const PreviousMonthButton = (props: MonthButtonProps) => (
  <PrevMonthTouchable onPress={props.onPress}>
    <Triangle direction='left' width={10} height={15} color={'black'} />
  </PrevMonthTouchable>
)

const NextMonthButton = (props: MonthButtonProps) => (
  <NextMonthTouchable onPress={props.onPress}>
    <Triangle direction='right' width={10} height={15} color={'black'} />
  </NextMonthTouchable>
)

const Calendar = (props: CalendarProps) => {
  const today = moment.utc()
  const year = props.year || today.year()
  const month = props.month || today.month()
  const startOfMonth = moment.utc([year, month, 1])

  const getEmojiByDate = (date: number) => {
    const emojiType = props.emojiStats[date]
    if (!emojiType) {
      return null
    }
    return <Emoji type={emojiType} sizePx={18} />
  }
  const renderWeekRow = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weekTexts = weekDays.map(w => <TextWeek key={w}>{w}</TextWeek>)
    return <WeekRow>{weekTexts}</WeekRow>
  }

  const renderDateRows = () => {
    const endOfMonth = moment(startOfMonth).endOf('month')
    const dateSet = getCalendarDatesFromStartDate(
      moment(startOfMonth).startOf('week')
    )

    const dateChunks = _.chunk(dateSet, 7)

    const dateRows = dateChunks.map((dates, index) => (
      <DateRow key={index}>
        {dates.map(date => {
          const isCurrentMonth = date.isBetween(startOfMonth, endOfMonth)
          const emoji = isCurrentMonth && getEmojiByDate(date.date())
          return (
            <DateView
              key={date.date()}
              today={date.isSame(today, 'date')}
              onPress={() =>
                props.onClickDate && props.onClickDate(date.toDate())
              }
            >
              <DateText blur={!isCurrentMonth}>{date.date()}</DateText>
              {emoji}
            </DateView>
          )
        })}
      </DateRow>
    ))
    return dateRows
  }
  return (
    <View>
      <MonthSelectorRow>
        <PreviousMonthButton onPress={props.onPrevMonth || _.noop} />
        <MonthSelectedText>
          {startOfMonth.format('MMMM YYYY')}
        </MonthSelectedText>
        <NextMonthButton onPress={props.onNextMonth || _.noop} />
      </MonthSelectorRow>
      {renderWeekRow()}
      {renderDateRows()}
    </View>
  )
}

export default Calendar
