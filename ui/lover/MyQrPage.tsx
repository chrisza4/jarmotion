import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import styled from 'styled-components/native'
import {
  BottomBackground,
  PageContentStyleMiddle,
  PageTitleText
} from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import { DescriptionText } from '../uikit/Texts'

type MyQrPageProps = {
  userId: string
  onBack?: () => void
}

const MyQrContent = styled.View`
  ${PageContentStyleMiddle}
  justify-content: center;
  align-items: center;
`

const QRDescription = styled.View`
  margin-top: 20px;
`
const MyQrPage = (props: MyQrPageProps) => {
  return (
    <PageLayout
      titleElement={<PageTitleText>My QR Code</PageTitleText>}
      showBackButton
      onBack={props.onBack}
    >
      <MyQrContent>
        {props.userId ? <QRCode value={props.userId} size={150} /> : null}
        <QRDescription>
          <DescriptionText>Please have your lover scan this QR</DescriptionText>
        </QRDescription>
      </MyQrContent>
      <BottomBackground />
    </PageLayout>
  )
}

export default MyQrPage
