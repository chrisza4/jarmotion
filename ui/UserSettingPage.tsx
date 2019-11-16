import React from 'react'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import AuthStore from '../stores/AuthStore'
import TextButton, { TextButtonStyle } from '../ui/uikit/buttons/TextButton'
import { PageDescription, PageTitleText } from './layouts/PageElements'
import PageLayout from './layouts/PageLayout'

const UserSettingPageContent = styled.View`
  flex: 1;
  margin-top: 100px;
`
const UserSettingFieldHolder = styled.View`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 8px;
`
const UserSettingFieldDescriptionHolder = styled.View`
  margin-left: 15px;
`
const FieldDescription = styled.Text`
  font-family: poppins-bold;
`

const SettingTextInput = styled.TextInput`
  height: 40px;
  border-radius: 10px;
  background-color: white;
  flex-grow: 1;
  border-color: #adadad;
  border-width: 0.5;
  padding-left: 14px;
`

const ButtonsHolder = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 40px;
`

const UserSettingPage = () => {
  return (
    <PageLayout titleElement={<PageTitleText>Setting</PageTitleText>}>
      <View>
        <PageDescription>Set your profile</PageDescription>
      </View>
      <UserSettingPageContent>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Name</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput />
        </UserSettingFieldHolder>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Email</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput keyboardType='email-address' />
        </UserSettingFieldHolder>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Password</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput secureTextEntry />
        </UserSettingFieldHolder>
      </UserSettingPageContent>
      <ButtonsHolder>
        <TextButton
          buttonStyle={TextButtonStyle.BlackButton}
          text='Save'
          onPress={() => AuthStore.destroyAuthToken()}
          style={{ height: 50, width: 100 }}
        />
        <TextButton
          text='Log out'
          onPress={() => AuthStore.destroyAuthToken()}
          style={{ height: 50, width: 100 }}
        />
      </ButtonsHolder>
    </PageLayout>
  )
}

export default UserSettingPage
