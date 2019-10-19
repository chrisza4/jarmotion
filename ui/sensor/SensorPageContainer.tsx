import React from 'react'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import { ISensor } from '../../domains/sensor/SensorTypes'
import SensorPage from './SensorPage'

const SensingPageContainer = () => {
  const senses: ISensor[] = [
    { emoji_type: EmojiType.Happy, threshold: 3 },
    { emoji_type: EmojiType.Love, threshold: 5 },
    { emoji_type: EmojiType.Miserable, threshold: 5 },
    { emoji_type: EmojiType.Stupid, threshold: 5 },
    { emoji_type: EmojiType.Determined, threshold: 5 },
    { emoji_type: EmojiType.Sick, threshold: 5 },
    { emoji_type: EmojiType.Amused, threshold: 5 },
    { emoji_type: EmojiType.Confident, threshold: 5 },
    { emoji_type: EmojiType.Confused, threshold: 10 }
  ]
  return <SensorPage sensors={senses} />
}

export default SensingPageContainer
