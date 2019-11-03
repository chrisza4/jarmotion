import React from 'react'
import styled from 'styled-components/native'
import { sicklyYellow } from '../styles/colors'
import CrossPlatformStatusBar from '../uikit/CrossPlatformStatusBar'

type ScreenLayoutProps = {
  children: React.ReactNode
  hackHeight?: number
}

const FullScreenView = styled.View<ScreenLayoutProps>`
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  ${props => (props.hackHeight ? `height: ${props.hackHeight};` : '')}
`

const ContentView = styled.View`
  flex-grow: 1;
`
const ScreenLayout = (props: ScreenLayoutProps) => {
  return (
    <FullScreenView {...props}>
      <CrossPlatformStatusBar
        backgroundColor={sicklyYellow}
        barStyle='light-content'
      />
      <ContentView>{props.children}</ContentView>
    </FullScreenView>
  )
}

export default ScreenLayout
