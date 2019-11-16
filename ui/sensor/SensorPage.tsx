import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import { ISensor } from '../../domains/sensor/SensorTypes'
import {
  PageContent,
  PageDescription,
  PageTitleText
} from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import AddEmotionModal from '../modals/AddEmotionModal'
import AddEmotionButton from '../uikit/buttons/AddEmotionButton'
import EmojiTable from '../uikit/emoji/EmojiTable'

const randomInsignificantHeightWtf = 100
const SensorPageContent = styled.View`
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-grow: 1;
  height: ${randomInsignificantHeightWtf}px;
`

const AddSensorPanel = styled.View`
  height: 61px;
  border-radius: 31px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

const AddSensorPanelTextPlaceHolder = styled.View`
  padding-left: 17px;
  padding-top: 17px;
  padding-bottom: 17px;
`

type SensorPageProps = {
  sensors: ISensor[]
  onUpsertSensor: (sensor: ISensor) => Promise<void>
  onDeleteSensor: (sensorType: EmojiType) => Promise<void>
}

const SensorPage = (props: SensorPageProps) => {
  const [showAddEmotionModal, setShowAddEmotionModal] = useState(false)

  const onUpsertSensor = async (emojiType: EmojiType, threshold: number) => {
    const sensor: ISensor = {
      id: 'random',
      emoji_type: emojiType,
      threshold
    }
    await props.onUpsertSensor(sensor)
    setShowAddEmotionModal(false)
  }

  const onTryEditSensorThreshold = async (
    emojiType: EmojiType,
    thresholdString: string
  ) => {
    const threshold = parseInt(thresholdString, 10)
    if (isNaN(threshold)) {
      return
    }
    if (threshold <= 0) {
      return props.onDeleteSensor(emojiType)
    }
    return onUpsertSensor(emojiType, threshold)
  }

  const renderSensors = () => {
    return (
      <EmojiTable
        emojiSummaryRows={props.sensors}
        onTryEditEmojiTableRow={onTryEditSensorThreshold}
        editable
      />
    )
  }

  const renderAddEmotionModal = () => {
    return (
      <AddEmotionModal
        show={showAddEmotionModal}
        onClose={() => setShowAddEmotionModal(false)}
        onAddEmoji={emojiType => onUpsertSensor(emojiType, 1)}
        excludeEmojis={props.sensors.map(s => s.emoji_type)}
        title='Sense emotion'
        subtitle='Select emotion that you want to keep track of'
      />
    )
  }
  // Can be any significantly hight number (> 800) for unknown Reason. WTF!!!
  const randomBigInsinificantScrollHeight = 1000
  return (
    <PageLayout titleElement={<PageTitleText>Sensing</PageTitleText>}>
      <View>
        <PageDescription>
          Receive an alert when your parter feel these
        </PageDescription>
      </View>
      <SensorPageContent>
        <ScrollView style={{ height: randomBigInsinificantScrollHeight }}>
          {renderSensors()}
        </ScrollView>
        <AddSensorPanel>
          <AddSensorPanelTextPlaceHolder>
            <Text>How can I help notify you?</Text>
          </AddSensorPanelTextPlaceHolder>
          <AddEmotionButton onPress={() => setShowAddEmotionModal(true)} />
        </AddSensorPanel>
      </SensorPageContent>
      {renderAddEmotionModal()}
    </PageLayout>
  )
}

export default SensorPage
