import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
  position: relative;
`;

export const PurpleHeader = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #7d40e7;
  height: 155px;
  z-index: -1;
`;

export const Card = styled.View`
  flex: 0.8;
  background-color: transparent;

  margin: 80px 20px 0;
  justify-content: center;
`;

export const Camera = styled(RNCamera)`
  flex: 0.6;
  align-items: center;
`;

export const TakeShotButton = styled.View`
  flex: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const ShotBackground = styled(RectButton)`
  width: 70px;
  height: 70px;
  border-radius: 35px;

  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.2);
`;

export const SubmitButton = styled.View`
  align-self: stretch;
  margin: 0 20px;
  background-color: #7d40e7;
  border-radius: 4px;
  padding: 12px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const RowSeparator = styled.View`
  height: ${(props) => (props.height ? props.height : '0px')};
`;
