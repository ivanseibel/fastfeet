import React from 'react';
import { format, parseISO } from 'date-fns';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DeliveryBody,
  DeliveryTitle,
  DeliveryNumber,
  DeliveryStatusLine,
  DeliveryStatusBall,
  DeliveryStatusLegend,
  DeliveryStatusText,
  DeliveryFooter,
  FooterItemContainer,
  FooterTitle,
  FooterValue,
  SeeDetails,
} from './styles';

const Delivery = ({ delivery, navigation }) => {
  const getUpdatedAt = () => {
    return format(parseISO(delivery.updated_at), 'yy-M-d h:mm a');
  };

  return (
    <Container>
      <DeliveryBody>
        <DeliveryTitle>
          <Icon name="local-shipping" size={25} color="#7D40E7" />
          <DeliveryNumber>Delivery {delivery.id}</DeliveryNumber>
        </DeliveryTitle>

        <DeliveryStatusLine>
          <DeliveryStatusBall selected />
          <DeliveryStatusBall selected={delivery.start_date} />
          <DeliveryStatusBall selected={delivery.end_date} />
        </DeliveryStatusLine>

        <DeliveryStatusLegend>
          <DeliveryStatusText>Waiting</DeliveryStatusText>
          <DeliveryStatusText>{'  '}Started</DeliveryStatusText>
          <DeliveryStatusText>Delivered</DeliveryStatusText>
        </DeliveryStatusLegend>
      </DeliveryBody>

      <DeliveryFooter>
        <FooterItemContainer>
          <FooterTitle>Last update</FooterTitle>
          <FooterValue>{getUpdatedAt()}</FooterValue>
        </FooterItemContainer>

        <FooterItemContainer>
          <FooterTitle>City</FooterTitle>
          <FooterValue>{delivery.recipient.city}</FooterValue>
        </FooterItemContainer>

        <FooterItemContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DeliveryDetails', { delivery });
            }}
          >
            <SeeDetails>See details</SeeDetails>
          </TouchableOpacity>
        </FooterItemContainer>
      </DeliveryFooter>
    </Container>
  );
};

export default Delivery;
