import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

export const PurpleHeader = styled.View`
  background-color: #7d40e7;
  height: 155px;
  overflow: visible;
`;

export const WhiteContainer = styled.View`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 20px 0;
  padding: 15px;
`;

export const CardSeparator = styled.View`
  height: ${(props) => (props.height ? props.height : '0px')};
`;

export const IssueDescription = styled.TextInput.attrs({
  placeholder: 'Describe issue...',
})`
  height: 300px;
  margin-bottom: 30px;
`;

export const SubmitButton = styled(RectButton)`
  align-self: stretch;
  background-color: #7d40e7;
  padding: 12px 0;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

export const SubmitButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`;
