import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Triangle from 'react-native-triangle'
import styled from 'styled-components/native'
import { sicklyYellow } from '../styles/colors'
import { ScreenWidth } from '../styles/margins'

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

const DateView = styled.View<{ today: boolean }>`
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.today ? sicklyYellow : 'transparent')};
  height: 44px;
  border-radius: 15px;
  width: 30px;
  text-align: center;
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

type CalendarProps = {
  year?: number
  month?: number
}

type MonthButtonProps = {
  onPress?: () => any
}
const PreviousMonthButton = (props: MonthButtonProps) => (
  <TouchableOpacity onPress={props.onPress}>
    <Triangle direction='left' width={10} height={15} color={'black'} />
  </TouchableOpacity>
)

const NextMonthButton = (props: MonthButtonProps) => (
  <TouchableOpacity onPress={props.onPress}>
    <Triangle direction='right' width={10} height={15} color={'black'} />
  </TouchableOpacity>
)

const Calendar = (props: CalendarProps) => {
  const today = moment.utc()
  const year = props.year || today.year()
  const month = props.month || today.month()
  const startOfMonth = moment.utc([year, month, 1])
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
        {dates.map(date => (
          <DateView key={date.date()} today={date.isSame(today, 'date')}>
            <DateText
              blur={date.isBefore(startOfMonth) || date.isAfter(endOfMonth)}
            >
              {date.date()}
            </DateText>
          </DateView>
        ))}
      </DateRow>
    ))
    return dateRows
  }
  return (
    <View>
      <MonthSelectorRow>
        <PreviousMonthButton />
        <MonthSelectedText>
          {startOfMonth.format('MMMM YYYY')}
        </MonthSelectedText>
        <NextMonthButton />
      </MonthSelectorRow>
      {renderWeekRow()}
      {renderDateRows()}
    </View>
  )
}

export default Calendar
