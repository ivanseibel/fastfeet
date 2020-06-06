import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  background-color: #7d40e7;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholder: 'Inform your register ID',
})`
  background: #fff;
  border-radius: 4px;
  align-self: stretch;
  margin: 37px 25px 15px;
  padding-left: 45px;
  font-size: 16px;
`;

export const SubmitButton = styled(RectButton)`
  background-color: #82bf18;
  align-self: stretch;
  margin: 0 25px 0;
  height: 45px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
