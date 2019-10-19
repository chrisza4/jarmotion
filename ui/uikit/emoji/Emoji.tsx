import React from 'react'
import { Image } from 'react-native'
import { EmojiType } from '../../../domains/emojis/EmojiTypes'
import { emojiImageMap } from './createEmojiComponent'

type EmojiProps = {
  type: EmojiType
  sizePx?: number
}

const Emoji = (props: EmojiProps) => (
  <Image
    style={{
      width: props.sizePx || 30,
      height: props.sizePx || 30,
      resizeMode: 'contain'
    }}
    source={emojiImageMap[props.type]}
  />
)

export default Emoji
