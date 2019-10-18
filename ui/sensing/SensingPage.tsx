import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import PageLayout from '../layouts/PageLayout'
import { brownishGrey, fontBlack } from '../styles/colors'

const PageTitleText = styled.Text`
  color: ${fontBlack};
  font-family: poppins-bold;
  font-size: 21px;
`

const PageDescription = styled.Text`
  align-self: center;
  margin-top: 20px;
  color: ${brownishGrey};
  font-family: poppins-medium;
  font-size: 15px;
`

const SensingPage = () => {
  return (
    <PageLayout titleElement={<PageTitleText>Sensing</PageTitleText>}>
      <View>
        <PageDescription>
          Receive an alert when your parter feel these!
        </PageDescription>
      </View>
    </PageLayout>
  )
}

export default SensingPage
