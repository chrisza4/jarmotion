import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../assets/imageAssets'
import { IRegistration } from '../domains/registration/RegistrationTypes'
import PageCenterLayout from './layouts/PageCenterLayout'
import { BottomBackground, PageTitleText } from './layouts/PageElements'
import PageLayout from './layouts/PageLayout'
import TextButton, { TextButtonStyle } from './uikit/buttons/TextButton'
import FormTextInput from './uikit/FormTextInput'
import MainLogo from './uikit/images/MainLogo'
import { OverlayLoadingState } from './uikit/LoadingScreen'

type LoginPageProps = {
  login: (username: string, password: string) => Promise<boolean>
  register: (registration: IRegistration) => Promise<true | string>
}

const BottomBackgroundPlaceHolder = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  padding-bottom: 43px;
  align-items: flex-end;
  flex-direction: row;
`
const InputPlaceHolderImage = styled.Image`
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 1;
  left: 21px;
  top: 16px;
`
const InputPlaceHolderView = styled.View`
  width: 80%;
`

const PageTitleHolder = styled.View`
  align-items: center;
`

enum PageMode {
  Login = 'Login',
  Register = 'Register'
}

const LoginPage = (props: LoginPageProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registrationCode, setRegistrationCode] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [busy, setBusy] = useState(false)
  const [pageMode, setPageMode] = useState(PageMode.Login)

  const onLogin = async () => {
    if (pageMode !== PageMode.Login) {
      setPageMode(PageMode.Login)
      return
    }
    setBusy(true)
    const isSuccess = await props.login(username, password)
    if (!isSuccess) {
      return Alert.alert('Jarmotion', 'Incorrect username or password', [
        { text: 'OK', onPress: () => setBusy(false) }
      ])
    }
    // return setBusy(false)
  }

  const onRegister = async () => {
    if (pageMode !== PageMode.Register) {
      setPageMode(PageMode.Register)
      return
    }
    setBusy(true)
    const registration: IRegistration = {
      email: username,
      password,
      name: registerName,
      code: registrationCode
    }
    const isSuccess = await props.register(registration)
    if (isSuccess !== true) {
      return Alert.alert('Jarmotion', isSuccess, [
        { text: 'OK', onPress: () => setBusy(false) }
      ])
    }
    return setBusy(false)
  }

  const renderTitle = () => {
    return (
      <PageTitleHolder>
        <MainLogo />
        <PageTitleText>{String(pageMode)}</PageTitleText>
      </PageTitleHolder>
    )
  }

  const renderLogin = () => {
    if (pageMode !== PageMode.Login) {
      return null
    }
    return (
      <PageCenterLayout>
        <InputPlaceHolderView>
          <InputPlaceHolderImage source={ImageAssets.InputPlaceHolderJar} />
          <FormTextInput
            placeholder='Email'
            value={username}
            onChangeText={text => setUsername(text)}
            keyboardType='email-address'
            autoCapitalize='none'
            style={{ paddingLeft: 61 }}
          />
        </InputPlaceHolderView>
        <InputPlaceHolderView>
          <InputPlaceHolderImage source={ImageAssets.InputPlaceHolderSecure} />
          <FormTextInput
            placeholder='Password'
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            style={{ paddingLeft: 61 }}
          />
        </InputPlaceHolderView>
      </PageCenterLayout>
    )
  }

  const renderRegister = () => {
    if (pageMode !== PageMode.Register) {
      return null
    }
    return (
      <PageCenterLayout>
        <InputPlaceHolderView>
          <InputPlaceHolderImage source={ImageAssets.InputPlaceHolderJar} />
          <FormTextInput
            placeholder='Registration code'
            value={registrationCode}
            onChangeText={text => setRegistrationCode(text)}
            autoCapitalize='none'
            style={{ paddingLeft: 61 }}
          />
        </InputPlaceHolderView>
        <InputPlaceHolderView>
          <InputPlaceHolderImage source={ImageAssets.InputPlaceHolderJar} />
          <FormTextInput
            placeholder='Name'
            value={registerName}
            onChangeText={text => setRegisterName(text)}
            autoCapitalize='none'
            style={{ paddingLeft: 61 }}
          />
        </InputPlaceHolderView>
        <InputPlaceHolderView>
          <InputPlaceHolderImage source={ImageAssets.InputPlaceHolderJar} />
          <FormTextInput
            placeholder='Email'
            value={username}
            onChangeText={text => setUsername(text)}
            autoCapitalize='none'
            style={{ paddingLeft: 61 }}
          />
        </InputPlaceHolderView>
        <InputPlaceHolderView>
          <InputPlaceHolderImage source={ImageAssets.InputPlaceHolderJar} />
          <FormTextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize='none'
            secureTextEntry
            style={{ paddingLeft: 61 }}
          />
        </InputPlaceHolderView>
      </PageCenterLayout>
    )
  }

  return (
    <PageLayout titleElement={renderTitle()}>
      {renderLogin()}
      {renderRegister()}
      <View>
        <BottomBackground>
          <BottomBackgroundPlaceHolder>
            <TextButton
              text='LOGIN'
              onPress={onLogin}
              disabled={busy}
              buttonStyle={
                pageMode === PageMode.Login
                  ? TextButtonStyle.BlackButton
                  : TextButtonStyle.PlainText
              }
              style={{ width: 130, height: 50 }}
            />
            <TextButton
              text='REGISTER'
              buttonStyle={
                pageMode === PageMode.Register
                  ? TextButtonStyle.BlackButton
                  : TextButtonStyle.PlainText
              }
              onPress={onRegister}
              disabled={busy}
              style={{ width: 130, height: 50 }}
            />
            <OverlayLoadingState visible={busy} />
          </BottomBackgroundPlaceHolder>
        </BottomBackground>
      </View>
    </PageLayout>
  )
}

export default LoginPage
