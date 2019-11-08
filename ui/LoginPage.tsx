import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components/native'
import PageCenterLayout from './layouts/PageCenterLayout'
import { BottomBackground, PageTitleText } from './layouts/PageElements'
import PageLayout from './layouts/PageLayout'
import TextButton, { TextButtonStyle } from './uikit/buttons/TextButton'
import FormTextInput from './uikit/FormTextInput'
import MainLogo from './uikit/images/MainLogo'

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
        <FormTextInput
          placeholder='Email'
          value={username}
          onChangeText={text => setUsername(text)}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <FormTextInput
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
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
            {busy && <ActivityIndicator size='small' />}
          </BottomBackgroundPlaceHolder>
        </BottomBackground>
      </PageCenterLayout>
    </PageLayout>
  )
}

export default LoginPage
