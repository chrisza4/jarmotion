import React from 'react'
import styled from 'styled-components/native'
import { sicklyYellow } from '../styles/colors'
import Circle from './Circle'

type AvatarImageProps = {
  radius: number
  hidden?: boolean
}
const AvatarImage = styled.Image<AvatarImageProps>`
  width: ${props => props.radius * 2}px;
  height: ${props => props.radius * 2}px;
  border-radius: ${props => props.radius}px;
  border-color: ${sicklyYellow};
  border-width: 2.5px;
  background-color: white;
  display: ${props => (props.hidden ? 'none' : 'flex')};
`

type CircleAvatarProps = {
  radius: number
  uri?: string
}

export default function CircleAvatar(props: CircleAvatarProps) {
  if (!props.uri) {
    return (
      <Circle
        radius={props.radius}
        style={{
          borderColor: sicklyYellow,
          borderWidth: 2.5,
          borderStyle: 'solid',
          backgroundColor: 'white'
        }}
      ></Circle>
    )
  }
  return (
    <Circle
      radius={props.radius}
      style={{
        backgroundColor: 'white'
      }}
    >
      <AvatarImage source={{ uri: props.uri }} radius={props.radius} />
    </Circle>
  )
}
