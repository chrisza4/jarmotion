import { observer } from 'mobx-react'
import React from 'react'
import SensorStore from '../../stores/SensorStore'
import SensorPage from './SensorPage'

const SensingPageContainer = observer(() => {
  return <SensorPage sensors={SensorStore.sensorsArray} />
})

export default SensingPageContainer
