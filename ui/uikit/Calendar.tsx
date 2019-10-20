import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { ScreenWidth } from '../styles/margins'

const getDateSet = (start: moment.Moment) => {
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
  ${calendarRowStyled}
`
const DateText = styled.Text`
  text-align: center;
  align-self: stretch;
  flex-grow: 1;
  width: ${calendarCellWidth}px;
`

const TextWeek = styled.Text`
  flex-grow: 1;
  text-align: center;
  width: ${calendarCellWidth}px;
`

const Calendar = () => {
  const today = moment.utc()
  // This need to be replace
  const dateSet = getDateSet(today.startOf('month').startOf('week'))
  const dateChunks = _.chunk(dateSet, 7)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const weekTexts = weekDays.map(w => <TextWeek key={w}>{w}</TextWeek>)
  const dateRows = dateChunks.map((dates, index) => (
    <DateRow key={index}>
      {dates.map(date => (
        <DateText key={date.date()}>{date.date()}</DateText>
      ))}
    </DateRow>
  ))
  return (
    <View>
      <WeekRow>{weekTexts}</WeekRow>
      {dateRows}
    </View>
  )
}

export default Calendar
