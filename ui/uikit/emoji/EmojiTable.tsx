import React, { useState } from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { emojiDisplayName } from '../../../domains/emojis/EmojiFunc'
import { EmojiType } from '../../../domains/emojis/EmojiTypes'
import EditButton from '../../uikit/buttons/EditButton'
import Emoji from './Emoji'

export interface IEmojiTableRow {
  id: string
  emoji_type: EmojiType
  threshold: number
}

type EmojiTableProps = {
  emojiSummaryRows: IEmojiTableRow[]
  editable?: boolean
  onTryEditEmojiTableRow?: (type: EmojiType, value: string) => void
}

const EmojiRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`

const EmojiNumberText = styled.Text`
  font-family: poppins-bold;
  font-size: 25px;
  margin-top: 6px;
`
const EmojiNumberTextInput = styled.TextInput`
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

const EmojiNumberBox = styled.View`
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

const EmojiBoxDescriptionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const EmojiBoxDescription = styled.Text`
  font-family: poppins-semibold;
  font-size: 10px;
`

const EmojiTable = (props: EmojiTableProps) => {
  const [edittingRowId, setEdittingRowId] = useState<string | null>(null)
  const onTryEditEmojiTableRow = (emojiType: EmojiType, text: string) => {
    setEdittingRowId(null)
    if (!props.onTryEditEmojiTableRow) {
      return
    }
    return props.onTryEditEmojiTableRow(emojiType, text)
  }

  const table = props.emojiSummaryRows.map(emojiSummaryRow => {
    const numberElement =
      props.editable && edittingRowId === emojiSummaryRow.id ? (
        <EmojiNumberTextInput
          autoFocus
          defaultValue={String(emojiSummaryRow.threshold)}
          onBlur={e =>
            onTryEditEmojiTableRow(
              emojiSummaryRow.emoji_type,
              e.nativeEvent.text
            )
          }
          keyboardType='number-pad'
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => props.editable && setEdittingRowId(emojiSummaryRow.id)}
        >
          <EmojiNumberText>{emojiSummaryRow.threshold}</EmojiNumberText>
        </TouchableWithoutFeedback>
      )
    return (
      <EmojiRow key={emojiSummaryRow.emoji_type}>
        <EmojiBox>
          <Emoji type={emojiSummaryRow.emoji_type} sizePx={40} />
        </EmojiBox>
        <EmojiNumberBox>
          <EmojiText>{emojiDisplayName(emojiSummaryRow.emoji_type)}</EmojiText>
          {numberElement}
          <EmojiBoxDescriptionRow>
            <EmojiBoxDescription>Times</EmojiBoxDescription>
            {props.editable && (
              <EditButton
                onPress={() => setEdittingRowId(emojiSummaryRow.id)}
              />
            )}
          </EmojiBoxDescriptionRow>
        </EmojiNumberBox>
      </EmojiRow>
    )
  })
  return <View>{table}</View>
}

export default EmojiTable
