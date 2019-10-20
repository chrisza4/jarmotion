import styled from 'styled-components/native'
import { brownishGrey, fontBlack } from '../styles/colors'

export const PageTitleHolder = styled.View`
  resize-mode: contain;
  align-self: center;
  margin-top: 20px;
`
export const PageTitleText = styled.Text`
  color: ${fontBlack};
  font-family: poppins-bold;
  font-size: 21px;
`

export const PageDescription = styled.Text`
  align-self: center;
  margin-top: 20px;
  color: ${brownishGrey};
  font-family: poppins-medium;
  font-size: 15px;
`
