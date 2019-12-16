import React from 'react'
import { Image } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'
import { EmojiType } from '../../../domains/emojis/EmojiTypes'

export interface IEmojiProps {
  type: EmojiType
  key?: string
}

export const emojiImageMap = {
  [EmojiType.Heart]: ImageAssets.EmojiTypeHeart,
  [EmojiType.Afraid]: ImageAssets.EmojiTypeAfraid,
  [EmojiType.Amused]: ImageAssets.EmojiTypeAmused,
  [EmojiType.Angry]: ImageAssets.EmojiTypeAngry,
  [EmojiType.Anxious]: ImageAssets.EmojiTypeAnxious,
  [EmojiType.Ashamed]: ImageAssets.EmojiTypeAshamed,
  [EmojiType.Bashful]: ImageAssets.EmojiTypeBashful,
  [EmojiType.Bored]: ImageAssets.EmojiTypeBored,
  [EmojiType.Cold]: ImageAssets.EmojiTypeCold,
  [EmojiType.Confident]: ImageAssets.EmojiTypeConfident,
  [EmojiType.Confused]: ImageAssets.EmojiTypeConfused,
  [EmojiType.Crazy]: ImageAssets.EmojiTypeCrazy,
  [EmojiType.Curious]: ImageAssets.EmojiTypeCurious,
  [EmojiType.Depressed]: ImageAssets.EmojiTypeDepressed,
  [EmojiType.Determined]: ImageAssets.EmojiTypeDetermined,
  [EmojiType.Enraged]: ImageAssets.EmojiTypeEnraged,
  [EmojiType.Envious]: ImageAssets.EmojiTypeEnvious,
  [EmojiType.Frightened]: ImageAssets.EmojiTypeFrightened,
  [EmojiType.Happy]: ImageAssets.EmojiTypeHappy,
  [EmojiType.Hot]: ImageAssets.EmojiTypeHot,
  [EmojiType.Indifferent]: ImageAssets.EmojiTypeIndifferent,
  [EmojiType.Jealous]: ImageAssets.EmojiTypeJealous,
  [EmojiType.Love]: ImageAssets.EmojiTypeLove,
  [EmojiType.Miserable]: ImageAssets.EmojiTypeMiserable,
  [EmojiType.Sad]: ImageAssets.EmojiTypeSad,
  [EmojiType.Sick]: ImageAssets.EmojiTypeSick,
  [EmojiType.Sorry]: ImageAssets.EmojiTypeSorry,
  [EmojiType.Stupid]: ImageAssets.EmojiTypeStupid,
  [EmojiType.Surprised]: ImageAssets.EmojiTypeSurprised,
  [EmojiType.Suspicious]: ImageAssets.EmojiTypeSuspicious,
  [EmojiType.Withdraw]: ImageAssets.EmojiTypeWithdraw
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
