import React from 'react'
import { ImageBackground, View } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import { brownishGrey, fontBlack } from '../styles/colors'

const titleMargin = 20

export const PageTitleHolder = styled.View`
  resize-mode: contain;
  align-self: center;
  margin-top: ${titleMargin}px;
`
export const PageTitleText = styled.Text`
  color: ${fontBlack};
  font-family: poppins-bold;
  font-size: 21px;
`

export const PageDescription = styled.Text`
  align-self: center;
  margin-top: 20px;
  color: ${brownishGrey};
  font-family: poppins-medium;
  font-size: 15px;
`

export const BackButton = styled.TouchableOpacity`
  left: 15px;
  top: ${titleMargin}px;
  align-self: flex-start;
  flex: 1;
`
export const BackButtonText = styled.Text`
  font-family: poppins-bold;
  font-size: 18px;
`

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
type BottomBackgroundProps = {
  children?: React.ReactNode
}
export const BottomBackground = (props: BottomBackgroundProps) => {
  return (
    <ImageBackground
      style={{
        height: 188,
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        bottom: 0
      }}
      source={ImageAssets.CurvyBottomBg}
    >
      {props.children}
    </ImageBackground>
  )
}
