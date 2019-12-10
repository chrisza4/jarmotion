import React from 'react'
import { Alert, Image } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import * as UserFunc from '../../domains/users/UserFunc'
import { IUser } from '../../domains/users/UserTypes'
import { PageContentStyle, PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import CircleAvatar from '../uikit/CircleAvatar'
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

const HaveLoverTextContentView = styled.View`
  align-items: center;
  margin-top: 10px;
`

const LoverPage = (props: LoverPageProps) => {
  const renderLoverPageWithLover = () => {
    return (
      <LoverPageContent>
        <NoLoverContentView>
          <CircleAvatar
            radius={50}
            uri={UserFunc.getThumbnailUrl(props.lover || null)}
          />
          <HaveLoverTextContentView>
            <Texts.BoldText>Your lover is {props.lover?.name}.</Texts.BoldText>
            <Image style={{ marginTop: 30 }} source={ImageAssets.LoverJar} />
          </HaveLoverTextContentView>
        </NoLoverContentView>

        <NoLoverToobarView>
          <TextButton
            style={{
              width: 160,
              height: 50,
              paddingHorizontal: 0,
              paddingVertical: 0
            }}
            buttonStyle={TextButtonStyle.BlackButton}
            text='Breakup'
            onPress={() =>
              Alert.alert('Jarmotion', 'Breakup is not supported yet')
            }
          />
        </NoLoverToobarView>
      </LoverPageContent>
    )
  }
  const renderLoverPageEmpty = () => {
    return (
      <LoverPageContent>
        <NoLoverContentView>
          <Image source={ImageAssets.LoverJar} />
          <NoLoverTextContentView>
            <Texts.BoldText>We don't know your lover.</Texts.BoldText>
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
            style={{
              width: 160,
              height: 50,
              paddingHorizontal: 0,
              paddingVertical: 0
            }}
            buttonStyle={TextButtonStyle.BlackButton}
            text='Add lover'
            onPress={props.onShowScanQr}
          />
        </NoLoverToobarView>
      </LoverPageContent>
    )
  }
  return (
    <PageLayout titleElement={<PageTitleText>Lover</PageTitleText>}>
      <LoverPageContent>
        {props.lover?.id ? renderLoverPageWithLover() : renderLoverPageEmpty()}
      </LoverPageContent>
    </PageLayout>
  )
}

export default LoverPage
