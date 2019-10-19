import { observer } from 'mobx-react'
import { useEffect } from 'react'
import React from 'react'
import SensorStore from '../../stores/SensorStore'
import SensorPage from './SensorPage'

const SensingPageContainer = observer(() => {
  useEffect(() => {
    SensorStore.fetchSensors()
  }, [])
  return (
    <SensorPage
      sensors={SensorStore.sensorsArray}
      onUpsertSensor={s => SensorStore.upsertSensor(s)}
      onDeleteSensor={e => SensorStore.deleteSensor(e)}
    />
  )
})

export default SensingPageContainer
