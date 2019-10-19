import _ from 'lodash'
import { action, computed, observable } from 'mobx'
import { fetchSensors } from '../apiServices/sensorServices'
import { ISensor } from '../domains/sensor/SensorTypes'

export class SensorStoreClass {
  @observable public sensors: { [id: string]: ISensor } = {}

  @action
  public async fetchSensors() {
    const sensors = await fetchSensors()
    this.sensors = _.keyBy(sensors, s => s.id)
  }

  @computed public get sensorsArray(): ISensor[] {
    return Object.values(this.sensors)
  }
}

export default new SensorStoreClass()
