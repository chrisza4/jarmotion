import _ from 'lodash'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import Modal from '../uikit/Modal'

type AddEmotionModalProps = {
  show: boolean
  onClose?: () => void
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
    marginTop: 12
  },
  title: {
    fontFamily: 'poppins',
    fontSize: 23
  }
})

const AddEmotionModalSection = () => {
  return (
    <View style={addEmotionModalSectionStyle.holder}>
      <Text style={addEmotionModalSectionStyle.title}>Happy</Text>
    </View>
  )
}

const AddEmotionModal = (props: AddEmotionModalProps) => {
  const footer = (
    <View style={styles.footerHolder}>
      <TextButton
        text='CANCEL'
        style={TextButtonStyle.PlainText}
        onPress={props.onClose || _.noop}
      />
      <TextButton text='ADD' style={TextButtonStyle.BlackButton} />
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
          <AddEmotionModalSection />
        </View>
      </View>
    </Modal>
  )
}

export default AddEmotionModal
