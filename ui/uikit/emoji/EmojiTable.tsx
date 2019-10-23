import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { emojiDisplayName } from '../../../domains/emojis/EmojiFunc'
import { EmojiType } from '../../../domains/emojis/EmojiTypes'
import { ISensor } from '../../../domains/sensor/SensorTypes'
import EditButton from '../../uikit/buttons/EditButton'
import Emoji from './Emoji'

type EmojiTableProps = {
  sensors: ISensor[]
  editable?: boolean
  onTryEditSensorThreshold: (type: EmojiType, value: string) => void
}

const SensorRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`

const ThresholdNumberText = styled.Text`
  font-family: poppins-bold;
  font-size: 25px;
  margin-top: 6px;
`
const ThresholdNumberTextInput = styled.TextInput`
  font-family: poppins-bold;
  font-size: 25px;
  margin-top: 5px;
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

const SensorBoxDescriptionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const SensorBoxDescription = styled.Text`
  font-family: poppins-semibold;
  font-size: 10px;
`

const EmojiTable = (props: EmojiTableProps) => {
  const [edittingSensorId, setEdittingSensorId] = useState<string | null>(null)
  return props.sensors.map(sensor => {
    const numberElement =
      edittingSensorId === sensor.id ? (
        <ThresholdNumberTextInput
          autoFocus
          defaultValue={String(sensor.threshold)}
          onBlur={e =>
            props.onTryEditSensorThreshold(
              sensor.emoji_type,
              e.nativeEvent.text
            )
          }
          keyboardType='number-pad'
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => props.editable && setEdittingSensorId(sensor.id)}
        >
          <ThresholdNumberText>{sensor.threshold}</ThresholdNumberText>
        </TouchableWithoutFeedback>
      )
    return (
      <SensorRow key={sensor.emoji_type}>
        <EmojiBox>
          <Emoji type={sensor.emoji_type} sizePx={40} />
        </EmojiBox>
        <ThresholdBox>
          <EmojiText>{emojiDisplayName(sensor.emoji_type)}</EmojiText>
          {numberElement}
          <SensorBoxDescriptionRow>
            <SensorBoxDescription>Times</SensorBoxDescription>
            <EditButton onPress={() => setEdittingSensorId(sensor.id)} />
          </SensorBoxDescriptionRow>
        </ThresholdBox>
      </SensorRow>
    )
  })
}

export default EmojiTable
