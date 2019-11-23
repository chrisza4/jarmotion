import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import { IUser } from '../../domains/users/UserTypes'
import { PageContentStyle, PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import * as Texts from '../uikit/Texts'

const LoverPageContent = styled.View`
  ${PageContentStyle}
  justify-content: space-between;
  align-items: center;
`

type LoverPageProps = {
  lover?: IUser
  me: IUser
  onShowMyQr: () => void
  onShowScanQr: () => void
}

const NoLoverToobarView = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 25px;
  justify-content: space-around;
  width: 100%;
`

const NoLoverContentView = styled.View`
  margin-top: 50px;
  align-items: center;
`

const NoLoverTextContentView = styled.View`
  align-items: center;
  margin-top: 17px;
`

const LoverPage = (props: LoverPageProps) => {
  const renderLoverPageEmpty = () => {
    return (
      <LoverPageContent>
        <NoLoverContentView>
          <Image source={ImageAssets.LoverJar} />
          <NoLoverTextContentView>
            <Texts.BoldText>You have no lover</Texts.BoldText>
            <Texts.DescriptionText style={{ marginTop: 12 }}>
              Please scan your lover's QR Code here
            </Texts.DescriptionText>
          </NoLoverTextContentView>
        </NoLoverContentView>

        <NoLoverToobarView>
          <TextButton
            style={{ width: 120, height: 50 }}
            buttonStyle={TextButtonStyle.BlackButton}
            text='My QR'
            onPress={props.onShowMyQr}
          />
          <TextButton
            style={{ width: 120, height: 50 }}
            buttonStyle={TextButtonStyle.BlackButton}
            text='Scan QR'
            onPress={props.onShowScanQr}
          />
        </NoLoverToobarView>
      </LoverPageContent>
    )
  }
  return (
    <PageLayout titleElement={<PageTitleText>Lover</PageTitleText>}>
      {renderLoverPageEmpty()}
    </PageLayout>
  )
}

export default LoverPage
