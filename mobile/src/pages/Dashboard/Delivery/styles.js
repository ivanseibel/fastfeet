import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 28px;
`;

export const DeliveryBody = styled.View`
  margin-bottom: 20px;
`;

export const DeliveryTitle = styled.View`
  margin: 15px 15px 0;
  flex-direction: row;
  align-items: center;
`;

export const DeliveryNumber = styled.Text`
  margin-left: 15px;
  color: #7d40e7;
  font-weight: bold;
`;

export const DeliveryStatusLine = styled.View`
  flex-direction: row;
  width: 90%;
  height: 1px;
  background-color: #7d40e7;
  align-self: center;
  margin-top: 30px;
  align-items: center;
  justify-content: space-between;
`;

export const DeliveryStatusBall = styled.View`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.selected ? '#7d40e7' : '#fff')};
  border-radius: 5px;
  border: 1px solid #7d40e7;
`;

export const DeliveryStatusLegend = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 7px 5px;
`;

export const DeliveryStatusText = styled.Text`
  color: #999;
  font-size: 9px;
  font-weight: bold;
`;

export const DeliveryFooter = styled.View`
  background-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px;
`;

export const FooterItemContainer = styled.View`
  justify-content: center;
`;

export const FooterTitle = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: #999;
`;

export const FooterValue = styled.Text`
  color: #444;
  font-size: 12px;
  font-weight: bold;
`;

export const SeeDetails = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;
