import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { emojiDisplayName } from '../../domains/emojis/EmojiFunc'
import { ISensor } from '../../domains/sensor/SensorTypes'
import PageLayout from '../layouts/PageLayout'
import AddEmotionModal from '../modals/AddEmotionModal'
import { brownishGrey, fontBlack } from '../styles/colors'
import AddEmotionButton from '../uikit/buttons/AddEmotionButton'
import EditButton from '../uikit/buttons/EditButton'
import Emoji from '../uikit/emoji/Emoji'

const PageTitleText = styled.Text`
  color: ${fontBlack};
  font-family: poppins-bold;
  font-size: 21px;
`

const PageDescription = styled.Text`
  align-self: center;
  margin-top: 20px;
  color: ${brownishGrey};
  font-family: poppins-medium;
  font-size: 15px;
`

const SensorRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`
const EmojiBox = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: white;
  align-items: center;
  justify-content: center;
`

const ThresholdBox = styled.View`
  margin-left: 12px;
  height: 100px;
  border-radius: 10px;
  background-color: white;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
`

const EmojiText = styled.Text`
  font-family: poppins-semibold;
`

const ThresholdNumberText = styled.Text`
  font-family: poppins-bold;
  font-size: 25px;
  margin-top: 5px;
`

const SensorBoxDescriptionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const SensorBoxDescription = styled.Text`
  font-family: poppins-semibold;
  font-size: 10px;
`

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
}

const SensorPage = (props: SensorPageProps) => {
  const [showAddEmotionModal, setShowAddEmotionModal] = useState(false)

  const renderSensors = () => {
    return props.sensors.map(sensor => {
      return (
        <SensorRow key={sensor.emoji_type}>
          <EmojiBox>
            <Emoji type={sensor.emoji_type} sizePx={40} />
          </EmojiBox>
          <ThresholdBox>
            <EmojiText>{emojiDisplayName(sensor.emoji_type)}</EmojiText>
            <ThresholdNumberText>{sensor.threshold}</ThresholdNumberText>
            <SensorBoxDescriptionRow>
              <SensorBoxDescription>Times</SensorBoxDescription>
              <EditButton />
            </SensorBoxDescriptionRow>
          </ThresholdBox>
        </SensorRow>
      )
    })
  }

  const renderAddEmotionModal = () => {
    return (
      <AddEmotionModal
        show={showAddEmotionModal}
        onClose={() => setShowAddEmotionModal(false)}
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
