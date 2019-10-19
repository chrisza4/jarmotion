import React from 'react'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import { ISensing } from '../../domains/sensing/SensingTypes'
import SensingPage from './SensingPage'

const SensingPageContainer = () => {
  const senses: ISensing[] = [
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
  return <SensingPage senses={senses} />
}

export default SensingPageContainer
