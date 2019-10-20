import React from 'react'
import { View } from 'react-native'
import Calendar from '../uikit/Calendar'
import { PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'

const CalendarPage = () => {
  return (
    <PageLayout titleElement={<PageTitleText>Sensing</PageTitleText>}>
      <View style={{ marginTop: 1 }}>
        <Calendar />
      </View>
    </PageLayout>
  )
}

export default CalendarPage
