import React, { useState } from 'react'
import { ActivityIndicator, Button, View } from 'react-native'
import PageCenterLayout from './layouts/PageCenterLayout'
import FormTextInput from './uikit/FormTextInput'

type LoginPageProps = {
  login: (username: string, password: string) => Promise<void>
}

const LoginPage = (props: LoginPageProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const onLogin = async () => {
    setBusy(true)
    await props.login(username, password)
    setBusy(false)
  }

  return (
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
      <View>
        <Button title='login' onPress={onLogin} disabled={busy} />
        {busy && <ActivityIndicator size='small' />}
      </View>
    </PageCenterLayout>
  )
}

export default LoginPage
