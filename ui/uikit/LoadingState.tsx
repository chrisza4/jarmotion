import React from 'react'
import { ActivityIndicator } from 'react-native'
import PageCenterLayout from '../layouts/PageCenterLayout'

export default function LoadingState() {
  return (
    <PageCenterLayout>
      <ActivityIndicator size='large' />
    </PageCenterLayout>
  )
}
