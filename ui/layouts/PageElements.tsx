import React from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import { ScreenWidth } from '../../ui/styles/margins'
import Circle from '../../ui/uikit/Circle'
import { brownishGrey, fontBlack, sicklyYellow } from '../styles/colors'

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
        left: 0,
        bottom: 0
      }}
      source={ImageAssets.CurvyBottomBg}
    >
      {props.children}
    </ImageBackground>
  )
}

type CenterAvatarProps = {
  avatarContent?: React.ReactNode
}

export const CenterAvatar = (props: CenterAvatarProps) => (
  <Circle
    radius={37.5}
    style={{
      backgroundColor: 'white',
      position: 'absolute',
      top: 100,
      borderColor: sicklyYellow,
      borderWidth: 2.5,
      left: ScreenWidth / 2 - 37.5
    }}
  >
    {props.avatarContent}
  </Circle>
)
