import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import React, { useEffect, useState } from 'react'

import styled from 'styled-components/native'
import { PageContentStyle, PageTitleText } from '../layouts/PageElements'
import PageLayout from '../layouts/PageLayout'
import { BoldText } from '../uikit/Texts'

type ScanQrPageProps = {
  onBack?: () => void
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
  useEffect(() => {
    askPermissionForCamear()
  }, [])

  const askPermissionForCamear = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setCameraPermission(status)
  }

  const renderContent = () => {
    switch (cameraPermission) {
      case Permissions.PermissionStatus.UNDETERMINED:
        return null
      case Permissions.PermissionStatus.GRANTED:
        return (
          <BarcodeHolder>
            <BarCodeScanner
              style={{ width: '100%', height: '100%' }}
              onBarCodeScanned={scanned => {
                alert('Haha')
                console.log(scanned)
              }}
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
    </PageLayout>
  )
}

export default ScanQrPage
