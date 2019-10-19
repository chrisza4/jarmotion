import React from 'react'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import { ISensing } from '../../domains/sensing/SensingTypes'
import SensingPage from './SensingPage'

const SensingPageContainer = () => {
  const senses: ISensing[] = [
    { emoji_type: EmojiType.Happy, threshold: 3 },
    { emoji_type: EmojiType.Love, threshold: 5 }
  ]
  return <SensingPage senses={senses} />
}

export default SensingPageContainer
