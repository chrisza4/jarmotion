import React from 'react'
import styled from 'styled-components/native'
import {
  BottomBackground,
  PageContentStyle,
  PageTitleText
} from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'

type MyQrPageProps = {
  userId: string
  onBack?: () => void
}

const MyQrContent = styled.View`
  ${PageContentStyle}
  justify-content: center;
  align-items: center;
`

const T = styled.Text``
const MyQrPage = (props: MyQrPageProps) => {
  return (
    <PageLayout
      titleElement={<PageTitleText>My QR Code</PageTitleText>}
      showBackButton
      onBack={props.onBack}
    >
      <MyQrContent>
        <T>QR CODE HERE</T>
      </MyQrContent>
      <BottomBackground />
    </PageLayout>
  )
}

export default MyQrPage
