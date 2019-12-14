'use strict'

import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
type TriangleDirection =
  | 'up'
  | 'right'
  | 'down'
  | 'left'
  | 'up-right'
  | 'up-left'
  | 'down-right'
  | 'down-left'
export type TriangleProps = {
  direction: TriangleDirection
  width: number
  height: number
  color: string
  style?: StyleProp<ViewStyle>
}

function getBorderStyle(
  width: number,
  height: number,
  direction: TriangleDirection,
  color: string
): StyleProp<ViewStyle> {
  if (direction === 'up') {
    return {
      borderTopWidth: 0,
      borderRightWidth: width / 2.0,
      borderBottomWidth: height,
      borderLeftWidth: width / 2.0,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      borderLeftColor: 'transparent'
    }
  } else if (direction === 'right') {
    return {
      borderTopWidth: height / 2.0,
      borderRightWidth: 0,
      borderBottomWidth: height / 2.0,
      borderLeftWidth: width,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: color
    }
  } else if (direction === 'down') {
    return {
      borderTopWidth: height,
      borderRightWidth: width / 2.0,
      borderBottomWidth: 0,
      borderLeftWidth: width / 2.0,
      borderTopColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent'
    }
  } else if (direction === 'left') {
    return {
      borderTopWidth: height / 2.0,
      borderRightWidth: width,
      borderBottomWidth: height / 2.0,
      borderLeftWidth: 0,
      borderTopColor: 'transparent',
      borderRightColor: color,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent'
    }
  } else if (direction === 'up-left') {
    return {
      borderTopWidth: height,
      borderRightWidth: width,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderTopColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent'
    }
  } else if (direction === 'up-right') {
    return {
      borderTopWidth: 0,
      borderRightWidth: width,
      borderBottomWidth: height,
      borderLeftWidth: 0,
      borderTopColor: 'transparent',
      borderRightColor: color,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent'
    }
  } else if (direction === 'down-left') {
    return {
      borderTopWidth: height,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: width,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: color
    }
  } else if (direction === 'down-right') {
    return {
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: height,
      borderLeftWidth: width,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      borderLeftColor: 'transparent'
    }
  } else {
    console.error(
      'Triangle.js wrong direction. ' +
        direction +
        ' is invalid. Must be one of: ' +
        [
          'up',
          'right',
          'down',
          'left',
          'up-right',
          'up-left',
          'down-right',
          'down-left'
        ]
    )
    return {}
  }
}

const Triangle = (props: TriangleProps) => {
  props = {
    direction: 'up',
    width: 0,
    height: 0,
    color: 'white',
    ...props
  }
  const borderStyles = getBorderStyle(
    props.width,
    props.height,
    props.direction,
    props.color
  )
  const defaultStyle: StyleProp<ViewStyle> = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid'
  }
  return <View style={[defaultStyle, borderStyles, props.style]} />
}

export default Triangle
