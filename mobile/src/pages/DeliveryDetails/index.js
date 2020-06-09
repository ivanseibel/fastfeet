import React from 'react';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';

import {
  Container,
  PurpleHeader,
  WhiteContainer,
  CardTitleContainer,
  CardTitle,
  CardSubtitle,
  CardDataText,
  CardSeparator,
  CardDatesGroup,
  ActionContainer,
  ActionText,
} from './styles';

const DeliveryDetails = ({ navigation, route }) => {
  const { delivery } = route.params;
  const { recipient } = delivery;
  const postalCode = recipient.postal_code.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  const fullAddress = `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}, ${postalCode}.`;
  return (
    <Container>
      <PurpleHeader>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
        <CardSeparator height="80px" />
        <WhiteContainer>
          <CardTitleContainer>
            <Icon name="truck" size={25} color="#7d40e7" />
            <CardTitle>Delivery information</CardTitle>
          </CardTitleContainer>

          <CardSeparator height="5px" />

          <CardSubtitle>RECIPIENT</CardSubtitle>
          <CardDataText>{recipient.name}</CardDataText>

          <CardSeparator height="15px" />

          <CardSubtitle>DELIVERY ADDRESS</CardSubtitle>
          <CardDataText>{fullAddress}</CardDataText>

          <CardSeparator height="15px" />

          <CardSubtitle>PRODUCT</CardSubtitle>
          <CardDataText>{delivery.product}</CardDataText>
        </WhiteContainer>

        <CardSeparator height="10px" />

        <WhiteContainer>
          <CardTitleContainer>
            <Icon name="calendar-outline" size={25} color="#7d40e7" />
            <CardTitle>Delivery status</CardTitle>
          </CardTitleContainer>

          <CardSeparator height="5px" />

          <CardSubtitle>STATUS</CardSubtitle>
          <CardDataText>{delivery.status}</CardDataText>

          <CardSeparator height="15px" />

          <CardDatesGroup>
            <View style={{ flex: 1 }}>
              <CardSubtitle>START DATE</CardSubtitle>
              <CardDataText>
                {delivery.start_date
                  ? format(parseISO(delivery.start_date), 'yyyy-MM-dd')
                  : null}
              </CardDataText>
            </View>

            <View style={{ flex: 0.3 }}>
              <CardSubtitle>END DATE</CardSubtitle>
              <CardDataText>
                {delivery.end_date
                  ? format(parseISO(delivery.end_date), 'yyyy-MM-dd')
                  : null}
              </CardDataText>
            </View>
          </CardDatesGroup>

          <CardSeparator height="15px" />

          <View style={{ flexDirection: 'row', borderRadius: 4 }}>
            <ActionContainer
              onPress={() => navigation.navigate('NewIssue', { delivery })}
            >
              <Icon name="close-circle-outline" size={20} color="#E74040" />
              <CardSeparator height="5px" />
              <ActionText>Report</ActionText>
              <ActionText>a problem</ActionText>
            </ActionContainer>

            <ActionContainer>
              <Icon name="information-outline" size={20} color="#E7BA40" />
              <CardSeparator height="5px" />
              <ActionText>See</ActionText>
              <ActionText>issues</ActionText>
            </ActionContainer>

            <ActionContainer>
              <Icon name="check-circle-outline" size={20} color="#7D40E7" />
              <CardSeparator height="5px" />
              <ActionText>Confirm</ActionText>
              <ActionText>delivery</ActionText>
            </ActionContainer>
          </View>
        </WhiteContainer>
      </PurpleHeader>
    </Container>
  );
};

export default DeliveryDetails;
