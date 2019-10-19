import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import PageTitle from '../layouts/PageTitle'
import ScreenLayout from '../layouts/ScreenLayout'
import { offWhite } from '../styles/colors'
const styles = StyleSheet.create({
  page: {
    backgroundColor: offWhite,
    height: '100%',
    justifyContent: 'space-between'
  },
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
      <View style={styles.page}>
        {renderTopSection()}
        <View>
          <PageTitle>{props.titleElement}</PageTitle>
          <View>{props.children}</View>
        </View>
      </View>
    </ScreenLayout>
  )
}

export default PageLayout
