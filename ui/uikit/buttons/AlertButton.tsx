import React from 'react'
import { Animated, Easing, TouchableOpacity } from 'react-native'
import * as ImageAssets from '../../../assets/imageAssets'

interface IAlertButtonProps {
  alerting: boolean
  onPress: () => void
}

export default class AlertButton extends React.Component<IAlertButtonProps> {
  private animatedValue: Animated.Value

  constructor(props: IAlertButtonProps) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  public handleAnimation = () => {
    // A loop is needed for continuous animation
    Animated.loop(
      // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(this.animatedValue, {
          toValue: 1.0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(this.animatedValue, {
          toValue: -1.0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        // return to begin position
        Animated.timing(this.animatedValue, {
          toValue: 0.0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start()
  }

  public componentDidUpdate(prevProps: IAlertButtonProps) {
    if (prevProps.alerting && !this.props.alerting) {
      this.animatedValue.setValue(0)
      this.animatedValue.stopAnimation()
    }
    if (!prevProps.alerting && this.props.alerting) {
      this.handleAnimation()
    }
  }

  public componentDidMount() {
    if (this.props.alerting) {
      this.handleAnimation()
    }
  }

  public render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Animated.Image
          source={ImageAssets.ImageButtonNotification}
          resizeMode='contain'
          style={{
            width: 70,
            height: 70,
            transform: [
              {
                rotate: this.animatedValue.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ['-0.2rad', '0.2rad']
                })
              }
            ]
          }}
        />
      </TouchableOpacity>
    )
  }
}
