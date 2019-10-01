import React from 'react'
import { Image } from 'react-native'
import { EmojiType } from '../../../domains/emojis/EmojiTypes'

interface IEmojiProps {
  type: EmojiType
}
const emojiImageMap = {
  [EmojiType.Heart]: require(`../../../assets/emoji_heart.png`),
  [EmojiType.Afraid]: require(`../../../assets/emojis/afraid.png`),
  [EmojiType.Amused]: require(`../../../assets/emojis/amused.png`),
  [EmojiType.Angry]: require(`../../../assets/emojis/angry.png`),
  [EmojiType.Anxious]: require(`../../../assets/emojis/anxious.png`),
  [EmojiType.Ashamed]: require(`../../../assets/emojis/ashamed.png`),
  [EmojiType.Bashful]: require(`../../../assets/emojis/bashful.png`),
  [EmojiType.Bored]: require(`../../../assets/emojis/bored.png`),
  [EmojiType.Cold]: require(`../../../assets/emojis/cold.png`),
  [EmojiType.Confident]: require(`../../../assets/emojis/confident.png`),
  [EmojiType.Confused]: require(`../../../assets/emojis/confused.png`),
  [EmojiType.Crazy]: require(`../../../assets/emojis/crazy.png`),
  [EmojiType.Curious]: require(`../../../assets/emojis/curious.png`),
  [EmojiType.Depressed]: require(`../../../assets/emojis/depressed.png`),
  [EmojiType.Determined]: require(`../../../assets/emojis/determined.png`),
  [EmojiType.Enraged]: require(`../../../assets/emojis/enraged.png`),
  [EmojiType.Envious]: require(`../../../assets/emojis/envious.png`),
  [EmojiType.Frightened]: require(`../../../assets/emojis/frightened.png`),
  [EmojiType.Happy]: require(`../../../assets/emojis/happy.png`),
  [EmojiType.Hot]: require(`../../../assets/emojis/hot.png`),
  [EmojiType.Indifferent]: require(`../../../assets/emojis/indifferent.png`),
  [EmojiType.Jealous]: require(`../../../assets/emojis/jealous.png`),
  [EmojiType.Love]: require(`../../../assets/emojis/love.png`),
  [EmojiType.Miserable]: require(`../../../assets/emojis/miserable.png`),
  [EmojiType.Sad]: require(`../../../assets/emojis/sad.png`),
  [EmojiType.Sick]: require(`../../../assets/emojis/sick.png`),
  [EmojiType.Sorry]: require(`../../../assets/emojis/sorry.png`),
  [EmojiType.Stupid]: require(`../../../assets/emojis/stupid.png`),
  [EmojiType.Surprised]: require(`../../../assets/emojis/surprised.png`),
  [EmojiType.Suspicious]: require(`../../../assets/emojis/suspicious.png`),
  [EmojiType.Withdraw]: require(`../../../assets/emojis/withdraw.png`)
}

const createEmojiComponent = ({ type }: IEmojiProps) => () => (
  <Image
    style={{
      width: 30,
      height: 30,
      resizeMode: 'contain'
    }}
    source={emojiImageMap[type]}
  />
)

export default createEmojiComponent
