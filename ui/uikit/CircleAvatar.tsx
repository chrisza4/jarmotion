import React from 'react'
import styled from 'styled-components/native'
import { sicklyYellow } from '../styles/colors'

type AvatarImageProps = {
  radius: number
}
const AvatarImage = styled.Image<AvatarImageProps>`
  width: ${props => props.radius * 2}px;
  height: ${props => props.radius * 2}px;
  border-radius: ${props => props.radius}px;
  border-color: ${sicklyYellow};
  border-width: 2.5px;
`

type CircleAvatarProps = {
  radius: number
  uri: string
}

export default function CircleAvatar(props: CircleAvatarProps) {
  return <AvatarImage source={{ uri: props.uri }} radius={props.radius} />
}
