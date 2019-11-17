import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import { ScreenWidth } from '../../ui/styles/margins'
import ScreenLayout from '../layouts/ScreenLayout'
import { offWhite, sicklyYellow } from '../styles/colors'
import Circle from '../uikit/Circle'
import {
  BackButton,
  BackButtonText,
  PageTitleHolder,
  TitleRow
} from './PageElements'

const PageView = styled.View`
  background-color: ${offWhite};
  justify-content: space-between;
  flex-grow: 1;
`

const styles = StyleSheet.create({
  backgroundImage: {
    height: 188,
    width: '100%',
    resizeMode: 'stretch',
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center'
  }
})

interface IPageLayoutProps {
  titleElement: React.ReactNode
  children: React.ReactNode
  showBackButton?: boolean
  avatarContent?: React.ReactNode
  hideAvatarBorder?: boolean

  onBack?: () => void
}

const PageLayout = (props: IPageLayoutProps) => {
  const renderCenterAvatar = () => {
    if (!props.avatarContent) {
      return null
    }
    return (
      <Circle
        radius={37.5}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: 100,
          borderColor: sicklyYellow,
          borderWidth: props.hideAvatarBorder ? 0 : 2.5,
          left: ScreenWidth / 2 - 37.5
        }}
      >
        {props.avatarContent}
      </Circle>
    )
  }
  const renderTopSection = () => (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={ImageAssets.CurvyTopBg}
      >
        {renderCenterAvatar()}
      </ImageBackground>
    </View>
  )

  return (
    <ScreenLayout>
      <PageView>
        {renderTopSection()}
        <TitleRow>
          <BackButton onPress={() => (props.onBack ? props.onBack() : null)}>
            {props.showBackButton ? (
              <BackButtonText>{'<'}</BackButtonText>
            ) : null}
          </BackButton>
          <PageTitleHolder>{props.titleElement}</PageTitleHolder>
          <View style={{ flex: 1 }} />
        </TitleRow>

        {props.children}
      </PageView>
    </ScreenLayout>
  )
}

export default PageLayout
