import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import * as UserFunc from '../../domains/users/UserFunc'
import { IUser, IUserUpdate } from '../../domains/users/UserTypes'
import { getImageFromDevice } from '../../localServices/CameraServices'
import { LoadingState, LoadingStateStatus } from '../../types/LoadingState'
import {
  AvatarCenterImage,
  PageContentStyle,
  PageDescription,
  PageTitleText
} from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import { OverlayLoadingState } from '../uikit/LoadingScreen'

const UserSettingPageContent = styled.View`
  ${PageContentStyle}
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
  loadState: LoadingState
  onUpdateProfile: (update: IUserUpdate) => Promise<void>
  onUploadAvatar: (uri: string) => Promise<void>
  onLogout: () => void
  // onSaveSetting: (user: IUser, newPassword?: string) => Promise<boolean>
}

const UserSettingPage = (props: UserSettingPageProps) => {
  const [currentMe, setCurrentMe] = useState<IUser>(props.me)
  const [dirty, setDirty] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  useEffect(() => {
    setCurrentMe(props.me)
  }, [props.me])

  const onChangeUsername = (newUsername: string) => {
    setDirty(true)
    setCurrentMe({
      ...currentMe,
      name: newUsername
    })
  }
  const onChangePassword = (pwd: string) => {
    setDirty(true)
    setNewPassword(pwd)
  }

  const onChangeEmail = (newEmail: string) => {
    setDirty(true)
    setCurrentMe({
      ...currentMe,
      email: newEmail
    })
  }

  const onReset = () => {
    setDirty(false)
    setCurrentMe(props.me)
    setOldPassword('')
    setNewPassword('')
  }

  const onUpdateProfile = async () => {
    const updates: IUserUpdate = {
      email: currentMe.email,
      name: currentMe.name
    }
    await props.onUpdateProfile(updates)
    setDirty(false)
  }

  const onEditAvatar = async () => {
    const image = await getImageFromDevice()
    if (!image || image.cancelled) {
      return
    }
    return props.onUploadAvatar(image.uri)
  }

  if (!currentMe) {
    return null
  }

  const photoUrl = UserFunc.getThumbnailUrl(currentMe)
  return (
    <PageLayout
      titleElement={<PageTitleText>Setting</PageTitleText>}
      avatarContent={
        <AvatarCenterImage uri={photoUrl} onPress={() => onEditAvatar()} />
      }
      hideAvatarBorder={!!photoUrl}
    >
      <View>
        <PageDescription>Set your profile</PageDescription>
      </View>
      <UserSettingPageContent>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Name</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput
            value={currentMe.name}
            onChangeText={text => onChangeUsername(text)}
          />
        </UserSettingFieldHolder>
        <UserSettingFieldHolder>
          <UserSettingFieldDescriptionHolder>
            <FieldDescription>Email</FieldDescription>
          </UserSettingFieldDescriptionHolder>
          <SettingTextInput
            value={currentMe.email}
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
          onPress={() => onUpdateProfile()}
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
      {props.loadState.status !== LoadingStateStatus.Loaded ? (
        <OverlayLoadingState />
      ) : null}
    </PageLayout>
  )
}

export default UserSettingPage
