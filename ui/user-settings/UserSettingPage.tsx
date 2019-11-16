import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IUser } from '../../domains/users/UserTypes'
import { PageDescription, PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'

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

type UserSettingPageProps = {
  me: IUser
  onLogout: () => void
  // onSaveSetting: (user: IUser, newPassword?: string) => Promise<boolean>
}

const UserSettingPage = (props: UserSettingPageProps) => {
  const [me, setMe] = useState<IUser>(props.me)
  const [dirty, setDirty] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  useEffect(() => {
    setMe(props.me)
  }, [props.me])

  const onChangeUsername = (newUsername: string) => {
    setDirty(true)
    setMe({
      ...me,
      name: newUsername
    })
  }
  const onChangePassword = (pwd: string) => {
    setDirty(true)
    setNewPassword(pwd)
  }

  const onChangeEmail = (newEmail: string) => {
    setDirty(true)
    setMe({
      ...me,
      email: newEmail
    })
  }

  const onReset = () => {
    setDirty(false)
    setMe(props.me)
    setOldPassword('')
    setNewPassword('')
  }

  if (!me) {
    return null
  }
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
          <SettingTextInput
            value={me.name}
            onChangeText={text => onChangeUsername(text)}
          />
        </UserSettingFieldHolder>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Email</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput
            value={me.email}
            keyboardType='email-address'
            onChangeText={text => onChangeEmail(text)}
          />
        </UserSettingFieldHolder>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Old Password</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput
            secureTextEntry
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
          />
        </UserSettingFieldHolder>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Password</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput
            secureTextEntry
            value={newPassword}
            onChangeText={text => onChangePassword(text)}
          />
        </UserSettingFieldHolder>
      </UserSettingPageContent>
      <ButtonsHolder>
        <TextButton
          buttonStyle={TextButtonStyle.BlackButton}
          text='Save'
          style={{ height: 50, width: 100, marginLeft: 10 }}
          disabled={!dirty}
        />
        <TextButton
          buttonStyle={TextButtonStyle.BlackButton}
          text='Reset'
          style={{ height: 50, width: 100, marginLeft: 10 }}
          disabled={!dirty}
          onPress={onReset}
        />
        <TextButton
          text='Log out'
          onPress={() => props.onLogout()}
          style={{ height: 50, width: 100 }}
        />
      </ButtonsHolder>
    </PageLayout>
  )
}

export default UserSettingPage
