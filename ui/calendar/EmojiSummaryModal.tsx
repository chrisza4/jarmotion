import React from 'react'
import { ScrollView, View } from 'react-native'
import styled from 'styled-components/native'

import uuid from 'uuid'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import { INavitationComponentProps } from '../../types/NavigationTypes'
import { PageDescription, PageTitleText } from '../../ui/layouts/PageElements'
import PageLayout from '../../ui/layouts/PageLayout'
import EmojiTable, { IEmojiTableRow } from '../../ui/uikit/emoji/EmojiTable'

const randomInsignificantHeightWtf = 100
const SensorPageContent = styled.View`
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-grow: 1;
  height: ${randomInsignificantHeightWtf}px;
`

const mockRows: IEmojiTableRow[] = [
  { id: uuid.v4(), emoji_type: EmojiType.Afraid, threshold: 30 },
  { id: uuid.v4(), emoji_type: EmojiType.Ashamed, threshold: 30 },
  { id: uuid.v4(), emoji_type: EmojiType.Miserable, threshold: 30 },
  { id: uuid.v4(), emoji_type: EmojiType.Stupid, threshold: 30 },
  { id: uuid.v4(), emoji_type: EmojiType.Sad, threshold: 30 },
  { id: uuid.v4(), emoji_type: EmojiType.Suspicious, threshold: 30 }
]

const EmojiSummaryModal = (props: INavitationComponentProps) => {
  return (
    <PageLayout titleElement={<PageTitleText>Emoji</PageTitleText>}>
      <View>
        <PageDescription>Date: 18 Jan 2019</PageDescription>
      </View>
      <SensorPageContent>
        <ScrollView>
          <EmojiTable emojiSummaryRows={mockRows} />
        </ScrollView>
      </SensorPageContent>
    </PageLayout>
  )
}

export default EmojiSummaryModal
