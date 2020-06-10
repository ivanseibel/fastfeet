import styled from 'styled-components/native';
import { FlatList } from 'react-native';

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
  /* overflow: visible; */
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
  color: #fff;
`;

export const IssuesList = styled(FlatList)`
  margin-top: 120px;
  background-color: transparent;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 20px 0;
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const CardDescription = styled.Text`
  flex: 0.8;

  color: #999999;
  font-size: 16px;
`;

export const CardDate = styled.Text`
  flex: 0.2;
  margin-left: 5px;

  color: #c1c1c1;
  font-size: 12px;
`;

export const EmptyListText = styled.Text``;

export const RowSeparator = styled.View`
  height: ${(props) => (props.height ? props.height : '0px')};
`;
