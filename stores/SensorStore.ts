import _ from 'lodash'
import { action, computed, observable } from 'mobx'
import * as SensorServices from '../apiServices/sensorServices'
import { ISensor } from '../domains/sensor/SensorTypes'

export class SensorStoreClass {
  @observable public sensors: { [id: string]: ISensor } = {}

  @action
  public async fetchSensors() {
    const sensors = await SensorServices.fetchSensors()
    this.sensors = _.keyBy(sensors, s => s.id)
  }

  @action
  public async upsertSensor(sensor: ISensor) {
    const updatedSensor = await SensorServices.upsertSensor(sensor)
    this.sensors[updatedSensor.id] = updatedSensor
  }

  @computed public get sensorsArray(): ISensor[] {
    return Object.values(this.sensors)
  }
}

export default new SensorStoreClass()
