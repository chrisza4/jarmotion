import React from 'react'
import { Animated, Easing } from 'react-native'

type HeartProps = {
  body: Matter.Body
}

class Heart extends React.Component<HeartProps> {
  private RotateValueHolder: Animated.Value
  constructor(props: HeartProps) {
    super(props)
    this.RotateValueHolder = new Animated.Value(0)
  }

  public componentDidMount() {
    this.StartImageRotateFunction()
  }

  public StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0)
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 4000,
      easing: Easing.bounce,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction())
  }

  public render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <Animated.Image
        style={{
          position: 'absolute',
          top: this.props.body.position.y,
          left: this.props.body.position.x,
          width: 30,
          height: 30,
          resizeMode: 'contain'
          // transform: [{ rotate: RotateData }]
        }}
        source={require('../../../assets/emoji_heart.png')}
      />
    )
  }
}

export default Heart
