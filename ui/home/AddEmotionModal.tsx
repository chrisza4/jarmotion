import _ from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import createEmojiComponent from '../uikit/emoji/createEmojiComponent'
import Modal from '../uikit/Modal'

type AddEmotionModalProps = {
  show: boolean
  onClose?: () => void
  onAddEmoji?: (emoji: EmojiType) => void
}

const styles = StyleSheet.create({
  title: {
    marginTop: 5
  },
  textCenterHolder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  textHeader: {
    fontFamily: 'poppins-semibold',
    fontSize: 21
  },
  textHeaderDescription: {
    fontFamily: 'poppins-light'
  },
  footerHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 11,
    marginRight: 11
  },
  content: { marginLeft: 11 }
})

const addEmotionModalSectionStyle = StyleSheet.create({
  holder: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    flexWrap: 'wrap'
  },
  emoji: {
    width: 40,
    height: 40,
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  emojiSelected: {
    borderColor: 'silver',
    borderWidth: 1
  }
})

type EmojiWrapperProps = {
  children: React.ReactNode
  selected: boolean
  onPress: () => void
}
const EmojiWrapper = ({ children, selected, onPress }: EmojiWrapperProps) => {
  const s = [
    addEmotionModalSectionStyle.emoji,
    selected ? addEmotionModalSectionStyle.emojiSelected : {}
  ]
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={s}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

type AddEmotionModalSectionProps = {
  selectedEmojiType: EmojiType
  setSelectedEmojiType: (type: EmojiType) => void
}
const AddEmotionModalSection = ({
  selectedEmojiType,
  setSelectedEmojiType
}: AddEmotionModalSectionProps) => {
  const emojiList = Object.values(EmojiType)
  const emojis = emojiList.map(emojiName => {
    const Emoji = createEmojiComponent({ type: emojiName })
    return (
      <EmojiWrapper
        selected={selectedEmojiType === emojiName}
        onPress={() => setSelectedEmojiType(emojiName)}
        key={emojiName}
      >
        <Emoji />
      </EmojiWrapper>
    )
  })
  return <View style={addEmotionModalSectionStyle.holder}>{emojis}</View>
}

const AddEmotionModal = (props: AddEmotionModalProps) => {
  const [selectedEmojiType, setSelectedEmojiType] = useState<EmojiType>(
    EmojiType.Heart
  )
  const footer = (
    <View style={styles.footerHolder}>
      <TextButton
        text='CANCEL'
        style={TextButtonStyle.PlainText}
        onPress={props.onClose || _.noop}
      />
      <TextButton
        text='ADD'
        style={TextButtonStyle.BlackButton}
        onPress={() =>
          props.onAddEmoji ? props.onAddEmoji(selectedEmojiType) : _.noop
        }
      />
    </View>
  )

  return (
    <Modal show={props.show} showFooter footer={footer}>
      <View style={styles.title}>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeader}>Tell me how you feel?</Text>
        </View>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeaderDescription}>
            You can select your mood more one.
          </Text>
        </View>
        <View style={styles.content}>
          <AddEmotionModalSection
            selectedEmojiType={selectedEmojiType}
            setSelectedEmojiType={setSelectedEmojiType}
          />
        </View>
      </View>
    </Modal>
  )
}

export default AddEmotionModal
