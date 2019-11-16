import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../assets/imageAssets'
import PageCenterLayout from './layouts/PageCenterLayout'
import { BottomBackground, PageTitleText } from './layouts/PageElements'
import PageLayout from './layouts/PageLayout'
import TextButton, { TextButtonStyle } from './uikit/buttons/TextButton'
import FormTextInput from './uikit/FormTextInput'
import MainLogo from './uikit/images/MainLogo'
import { OverlayLoadingState } from './uikit/LoadingScreen'

type LoginPageProps = {
  login: (username: string, password: string) => Promise<void>
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

const LoginPage = (props: LoginPageProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const onLogin = async () => {
    setBusy(true)
    await props.login(username, password)
    setBusy(false)
  }

  const renderTitle = () => {
    return (
      <View>
        <MainLogo />
        <PageTitleText>Login</PageTitleText>
      </View>
    )
  }

  return (
    <PageLayout titleElement={renderTitle()}>
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
      <View>
        <BottomBackground>
          <BottomBackgroundPlaceHolder>
            <TextButton text='LOGIN' onPress={onLogin} disabled={busy} />
            <TextButton
              text='REGISTER'
              buttonStyle={TextButtonStyle.BlackButton}
              onPress={onLogin}
              disabled={busy}
              style={{ width: 130, height: 50 }}
            />
            {busy && <OverlayLoadingState />}
          </BottomBackgroundPlaceHolder>
        </BottomBackground>
      </View>
    </PageLayout>
  )
}

export default LoginPage
