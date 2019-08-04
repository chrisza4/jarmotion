import React, { useState } from 'react'
import { Button } from 'react-native'
import PageCenterLayout from './layouts/PageCenterLayout'
import FormTextInput from './uikit/FormTextInput'

type LoginPageProps = {
  login: (username: string, password: string) => void
}

const LoginPage = (props: LoginPageProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <PageCenterLayout>
      <FormTextInput
        placeholder='Email'
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <FormTextInput
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title='login' onPress={() => props.login(username, password)} />
    </PageCenterLayout>
  )
}

export default LoginPage
