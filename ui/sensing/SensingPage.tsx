import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { emojiDisplayName } from '../../domains/emojis/EmojiFunc'
import { ISensing } from '../../domains/sensing/SensingTypes'
import PageLayout from '../layouts/PageLayout'
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

const SensingRow = styled.View`
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

const SensingBoxDescriptionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const SensingBoxDescription = styled.Text`
  font-family: poppins-semibold;
  font-size: 10px;
`

const randomInsignificantHeightWtf = 100
const SensePageContent = styled.View`
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-grow: 1;
  height: ${randomInsignificantHeightWtf}px;
`

const AddSensePanel = styled.View`
  height: 61px;
  border-radius: 31px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

const AddSensePanelTextPlaceHolder = styled.View`
  padding-left: 17px;
  padding-top: 17px;
  padding-bottom: 17px;
`

type SensingPageProps = {
  senses: ISensing[]
}

const SensingPage = (props: SensingPageProps) => {
  const renderSenses = () => {
    return props.senses.map(sense => {
      return (
        <SensingRow key={sense.emoji_type}>
          <EmojiBox>
            <Emoji type={sense.emoji_type} sizePx={40} />
          </EmojiBox>
          <ThresholdBox>
            <EmojiText>{emojiDisplayName(sense.emoji_type)}</EmojiText>
            <ThresholdNumberText>{sense.threshold}</ThresholdNumberText>
            <SensingBoxDescriptionRow>
              <SensingBoxDescription>Times</SensingBoxDescription>
              <EditButton />
            </SensingBoxDescriptionRow>
          </ThresholdBox>
        </SensingRow>
      )
    })
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
      <SensePageContent>
        <ScrollView style={{ height: randomBigInsinificantScrollHeight }}>
          {renderSenses()}
        </ScrollView>
        <AddSensePanel>
          <AddSensePanelTextPlaceHolder>
            <Text>How can I help notify you?</Text>
          </AddSensePanelTextPlaceHolder>
          <AddEmotionButton />
        </AddSensePanel>
      </SensePageContent>
    </PageLayout>
  )
}

export default SensingPage