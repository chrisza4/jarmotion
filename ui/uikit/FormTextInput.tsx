import * as React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { dodgerBlue, sicklyYellow } from '../styles/colors'

const StyledTextInput = styled.TextInput`
  height: 50px;
  border-color: ${sicklyYellow};
  border-radius: 32px;
  border-width: 1px;
  min-width: 200px;
  margin-bottom: 17px;
  padding: 15px 20px;
  box-shadow: 0px 8px 3px ${sicklyYellow};
  background-color: white;
`

class FormTextInput extends React.Component<TextInputProps> {
  private textInputRef = React.createRef<TextInput>()

  public focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus()
    }
  }

  public render() {
    const { style, ...otherProps } = this.props
    return (
      <StyledTextInput
        selectionColor={dodgerBlue}
        style={style}
        {...(otherProps as any)}
      />
    )
  }
}

// const styles = StyleSheet.create({
//   textInput: {
//     height: 40,
//     borderColor: silver,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     marginBottom: 20,
//     minWidth: 200
//   }
// })

export default FormTextInput
