import * as React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { dodgerBlue, silver } from '../styles/colors'

type Props = TextInputProps

class FormTextInput extends React.Component<Props> {
  private textInputRef = React.createRef<TextInput>()

  public focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus()
    }
  }

  public render() {
    const { style, ...otherProps } = this.props
    return (
      <TextInput
        ref={this.textInputRef}
        selectionColor={dodgerBlue}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: silver,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    minWidth: 200
  }
})

export default FormTextInput
