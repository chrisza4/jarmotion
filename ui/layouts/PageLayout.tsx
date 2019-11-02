import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import ScreenLayout from '../layouts/ScreenLayout'
import { offWhite } from '../styles/colors'
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
    position: 'absolute'
  }
})

interface IPageLayoutProps {
  titleElement: React.ReactNode
  children: React.ReactNode
  showBackButton?: boolean
  onBack?: () => void
}

const PageLayout = (props: IPageLayoutProps) => {
  const renderTopSection = () => (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={ImageAssets.CurvyTopBg}
      ></ImageBackground>
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
