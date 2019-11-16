import React from 'react'
import { ActivityIndicator } from 'react-native'
import PageCenterLayout from '../layouts/PageCenterLayout'

export function FullScreenLoadingState() {
  return (
    <PageCenterLayout>
      <ActivityIndicator size='large' />
    </PageCenterLayout>
  )
}
