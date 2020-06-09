import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const PurpleHeader = styled.SafeAreaView`
  background-color: #7d40e7;
  height: 155px;
  overflow: visible;
`;

export const WhiteContainer = styled.SafeAreaView`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 20px 0;
  padding: 15px;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardTitle = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  margin-left: 5px;
`;

export const CardSubtitle = styled.Text`
  color: #999999;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const CardDataText = styled.Text`
  color: #666666;
`;

export const CardSeparator = styled.View`
  height: ${(props) => (props.height ? props.height : '0px')};
`;

export const CardDatesGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionContainer = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #000; */
  margin: 1px;
  padding: 10px 0;
  background-color: #f8f9fd;
`;

export const ActionText = styled.Text`
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 12px;
`;
