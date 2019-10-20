import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import ScreenLayout from '../layouts/ScreenLayout'
import { offWhite } from '../styles/colors'
import { PageTitleHolder } from './PageElements'

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
}

const PageLayout = (props: IPageLayoutProps) => {
  const renderTopSection = () => (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/curvy_top_bg.png')}
    ></ImageBackground>
  )

  return (
    <ScreenLayout>
      <PageView>
        {renderTopSection()}
        <View>
          <PageTitleHolder>{props.titleElement}</PageTitleHolder>
        </View>
        {props.children}
      </PageView>
    </ScreenLayout>
  )
}

export default PageLayout
