import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 0 15px;
`;

export const Header = styled.View`
  margin-top: 20px;
  margin-bottom: 22px;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  background-color: #f4effc;
  border-radius: 34px;
`;

export const Welcome = styled.View`
  margin-left: 12px;
  justify-content: center;
  flex: 1;
`;

export const WelcomeMessage = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const WelcomeName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const DeliveriesHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DeliveriesTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const DeliveriesFilter = styled.View`
  flex-direction: row;
`;

export const Filter = styled.Text`
  margin-left: 10px;
  color: ${props => (props.selected ? '#7d40e7' : '#999')};
  font-weight: bold;
  border-bottom-color: #7d40e7;
  border-bottom-width: ${props => (props.selected ? '1px' : '0')};
`;

export const Deliveries = styled.FlatList`
  margin-top: 15px;
`;

export const PushToUpdateContainer = styled.View`
  margin-top: 15px;
  align-items: center;
`;

export const PushToUpdateText = styled.Text`
  color: #999;
`;
