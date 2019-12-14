import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import * as ImageAssets from '../../assets/imageAssets'
import { ScreenWidth } from '../../ui/styles/margins'
import Circle from '../../ui/uikit/Circle'
import CircleAvatar from '../../ui/uikit/CircleAvatar'
import Triangle from '../../ui/uikit/Triangle'
import {
  blackButton,
  brownishGrey,
  fontBlack,
  sicklyYellow
} from '../styles/colors'

const titleMargin = 20

export const PageTitleHolder = styled.View`
  resize-mode: contain;
  align-self: center;
  margin-top: ${titleMargin}px;
  align-items: center;
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

export const PageContentStyle = `
  flex: 1;
`
export const PageContentStyleMiddle = `
  flex: 1;
  margin-top: 140px;
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
  hideAvatarBorder?: boolean
  triangleButtonDirection?: 'none' | 'left' | 'right'
}

const radius = 37.5

export const CenterAvatarRow = styled.View`
  position: absolute;
  top: 100px;
  flex-direction: row;
`

export const CenterAvatar = (props: CenterAvatarProps) => {
  const renderTriangle = () => {
    if (
      !props.triangleButtonDirection ||
      props.triangleButtonDirection === 'none'
    ) {
      return null
    }
    const triangleMargin = 10
    const triangleSize = 15
    const left =
      props.triangleButtonDirection === 'left'
        ? -triangleSize - triangleMargin
        : radius * 2 + triangleMargin

    return (
      <Triangle
        width={triangleSize}
        height={triangleSize}
        color={blackButton}
        direction={props.triangleButtonDirection}
        style={{
          position: 'absolute',
          left,
          top: radius - triangleSize / 2
        }}
      ></Triangle>
    )
  }

  return (
    <CenterAvatarRow>
      <Circle
        radius={radius}
        style={{
          backgroundColor: 'white',
          borderColor: sicklyYellow,
          borderWidth: props.hideAvatarBorder ? 0 : 2.5,
          left: ScreenWidth / 2 - radius,
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        {props.avatarContent}
        {renderTriangle()}
      </Circle>
    </CenterAvatarRow>
  )
}

const AvatarButtonEmpty = styled.View`
  width: 100%;
  height: 100%;
`
const AvatarButton = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`

export type AvatarContentProps = {
  uri: string
  onPress?: () => void
}

export const AvatarCenterImage = (props: AvatarContentProps) => {
  return (
    <AvatarButton onPress={() => props.onPress && props.onPress()}>
      {props.uri ? (
        <View>
          <CircleAvatar radius={37.5} uri={props.uri} />
        </View>
      ) : (
        <AvatarButtonEmpty />
      )}
    </AvatarButton>
  )
}
