import _ from 'lodash'
import { action, computed, observable } from 'mobx'
import * as SensorServices from '../apiServices/sensorServices'
import { EmojiType } from '../domains/emojis/EmojiTypes'
import { ISensor } from '../domains/sensor/SensorTypes'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'

export class SensorStoreClass {
  @observable public sensors: { [id: string]: ISensor } = {}
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }

  @action
  public async fetchSensors() {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const sensors = await SensorServices.fetchSensors()
    this.sensors = _.keyBy(sensors, s => s.id)
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }

  @action
  public async upsertSensor(sensor: ISensor) {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const updatedSensor = await SensorServices.upsertSensor(sensor)
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
    this.sensors[updatedSensor.id] = updatedSensor
  }

  @action
  public async deleteSensor(emojiType: EmojiType) {
    const sensor = this.sensorsArray.find(s => s.emoji_type === emojiType)
    if (!sensor) {
      return
    }
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    await SensorServices.deleteSensor(emojiType)
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
    delete this.sensors[sensor.id]
  }

  @computed public get sensorsArray(): ISensor[] {
    return Object.values(this.sensors)
  }
}

export default new SensorStoreClass()
