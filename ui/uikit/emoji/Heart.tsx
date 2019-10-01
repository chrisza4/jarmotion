import React from 'react'
import { Animated, Easing, Image, View } from 'react-native'

class Heart extends React.Component {
  private RotateValueHolder: Animated.Value
  constructor(props: any) {
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
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction())
  }

  public render() {
    // const RotateData = this.RotateValueHolder.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // })
    return (
      <Image
        style={{
          width: 30,
          height: 30,
          resizeMode: 'contain'
        }}
        source={require('../../../assets/emoji_heart.png')}
      />
    )
  }
}

export default Heart
