import Moment from 'moment'
import React from 'react'
import { ScrollView, View } from 'react-native'
import styled from 'styled-components/native'

import { IUser } from '../../domains/users/UserTypes'
import { LoadingState, LoadingStateStatus } from '../../types/LoadingState'
import { INavitationComponentProps } from '../../types/NavigationTypes'
import { PageDescription, PageTitleText } from '../../ui/layouts/PageElements'
import PageLayout from '../../ui/layouts/PageLayout'
import EmojiTable, { IEmojiTableRow } from '../../ui/uikit/emoji/EmojiTable'
import LoadingStatePage from '../uikit/LoadingState'

const randomInsignificantHeightWtf = 100
const SensorPageContent = styled.View`
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-grow: 1;
  height: ${randomInsignificantHeightWtf}px;
`

type EmojiSummaryModalProps = INavitationComponentProps & {
  summary: IEmojiTableRow[]
  loadingState: LoadingState
  date: Moment.Moment
  user: IUser | null
}

const EmojiSummaryModal = (props: EmojiSummaryModalProps) => {
  if (props.loadingState.status !== LoadingStateStatus.Loaded) {
    return <LoadingStatePage />
  }
  const userName = props.user ? props.user.name : ''
  return (
    <PageLayout
      titleElement={<PageTitleText>How did {userName} feel?</PageTitleText>}
      showBackButton
      onBack={() => props.navigation.goBack()}
    >
      <View>
        <PageDescription>
          Date: {props.date.format('DD MMM YYYY')}
        </PageDescription>
      </View>
      <SensorPageContent>
        <ScrollView>
          <EmojiTable emojiSummaryRows={props.summary} />
        </ScrollView>
      </SensorPageContent>
    </PageLayout>
  )
}

export default EmojiSummaryModal
