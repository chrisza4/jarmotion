import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import styled from 'styled-components/native'
import { LoadingState, LoadingStateStatus } from '../../types/LoadingState'
import * as Utils from '../../utils/utils'
import { PageContentStyle, PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import { OverlayLoadingState } from '../uikit/LoadingScreen'
import { BoldText } from '../uikit/Texts'

type ScanQrPageProps = {
  onBack?: () => void
  onAddUser: (userId: string) => Promise<any>
}

const BarcodeHolder = styled.View`
  ${PageContentStyle}
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
`

const PermissionDeniedHolder = styled.View`
  ${PageContentStyle}
  justify-content: center;
  align-items: center;
`
const ScanQrPage = (props: ScanQrPageProps) => {
  const [cameraPermission, setCameraPermission] = useState<
    Permissions.PermissionStatus
  >(Permissions.PermissionStatus.UNDETERMINED)
  const [loading, setLoading] = useState<LoadingState>({
    status: LoadingStateStatus.Loaded
  })
  useEffect(() => {
    askPermissionForCamear()
  }, [])
  const askPermissionForCamear = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setCameraPermission(status)
  }
  const onScannedUser: BarCodeScannedCallback = async scanned => {
    if (!Utils.isUuid(scanned.data)) {
      setLoading({
        status: LoadingStateStatus.Error,
        errorMessage: 'Invalid QR Code'
      })
      return Alert.alert('Jarmotion', 'Invalid QR Code', [
        {
          text: 'OK',
          onPress: () => setLoading({ status: LoadingStateStatus.Loaded })
        }
      ])
    }
    setLoading({ status: LoadingStateStatus.Loading })
    try {
      await props.onAddUser(scanned.data)
      setLoading({ status: LoadingStateStatus.Loaded })
    } catch (err) {
      setLoading({
        status: LoadingStateStatus.Error,
        errorMessage: 'Invalid QR Code'
      })
      Alert.alert('Jarmotion', `Error: ${err.message}`, [
        {
          text: 'OK',
          onPress: () => setLoading({ status: LoadingStateStatus.Loaded })
        }
      ])
    }
  }

  const renderContent = () => {
    if (loading.status !== LoadingStateStatus.Loaded) {
      return (
        <PermissionDeniedHolder>
          <BoldText>Scanning....</BoldText>
        </PermissionDeniedHolder>
      )
    }
    switch (cameraPermission) {
      case Permissions.PermissionStatus.UNDETERMINED:
        return null
      case Permissions.PermissionStatus.GRANTED:
        return (
          <BarcodeHolder>
            <BarCodeScanner
              style={{ width: '100%', height: '100%' }}
              onBarCodeScanned={onScannedUser}
            />
          </BarcodeHolder>
        )
      case Permissions.PermissionStatus.DENIED:
        return (
          <PermissionDeniedHolder>
            <BoldText style={{ color: 'red' }}>
              Please allow application to access camera
            </BoldText>
          </PermissionDeniedHolder>
        )
    }
  }

  return (
    <PageLayout
      titleElement={<PageTitleText>Scan QR Code</PageTitleText>}
      showBackButton
      onBack={props.onBack}
    >
      {renderContent()}
      <OverlayLoadingState
        visible={loading.status === LoadingStateStatus.Loading}
      />
    </PageLayout>
  )
}

export default ScanQrPage
