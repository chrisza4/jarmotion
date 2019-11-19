import React from 'react'
import { ActivityIndicator, Modal as ReactNativeModal } from 'react-native'
import styled from 'styled-components/native'
import PageCenterLayout from '../layouts/PageCenterLayout'

export function FullScreenLoadingState() {
  return (
    <PageCenterLayout>
      <ActivityIndicator size='large' />
    </PageCenterLayout>
  )
}

const ModalOverlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`
const LoadingStateHolder = styled.View`
  background-color: white;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  opacity: 1;
  border-radius: 10px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
`

// const LoadingImage = styled.Image`
//   width: 40px;
//   height: 40px;
// `

type OverlayLoadingStateProps = {
  visible?: boolean
}
export function OverlayLoadingState(props: OverlayLoadingStateProps) {
  return (
    <ReactNativeModal
      animationType='none'
      visible={props.visible}
      transparent={true}
    >
      <ModalOverlay>
        <LoadingStateHolder>
          {/* <LoadingImage source={LoadingGif} /> */}
          <ActivityIndicator size='large' />
        </LoadingStateHolder>
      </ModalOverlay>
    </ReactNativeModal>
  )
}
