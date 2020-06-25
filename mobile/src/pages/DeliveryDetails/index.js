import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import api from '~/services/api';

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
  const [startDate, setStartDate] = useState(delivery.start_date);
  const { recipient } = delivery;
  const postalCode = recipient.postal_code.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  const fullAddress = `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}, ${postalCode}.`;

  const startDelivery = () => {
    const newStartDate = new Date();
    api
      .put(`/deliveries/${delivery.id}/start`, {
        start_date: newStartDate,
      })
      .then((res) => {
        if (res.status === 200) {
          setStartDate(res.data.start_date);
          delivery.start_date = res.data.start_date;
        }
      })
      .catch(() => {
        Alert.alert(
          'Network error',
          'Was not possible to start delivery, try again later.'
        );
      });
  };

  useEffect(() => {
    if (!delivery.start_date) {
      Alert.alert('Question', 'Do you want to start this delivery?', [
        {
          text: 'Yes',
          onPress: () => {
            startDelivery();
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ]);
    }
  }, []);

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
                {startDate ? format(parseISO(startDate), 'yyyy-MM-dd') : null}
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

            <ActionContainer
              onPress={() =>
                navigation.navigate('SeeIssues', { id: delivery.id })
              }
            >
              <Icon name="information-outline" size={20} color="#E7BA40" />
              <CardSeparator height="5px" />
              <ActionText>See</ActionText>
              <ActionText>issues</ActionText>
            </ActionContainer>

            <ActionContainer
              onPress={() => {
                if (delivery.end_date) {
                  Alert.alert('Warning', 'This delivery is already ended');
                  return;
                }
                navigation.navigate('ConfirmDelivery', { id: delivery.id });
              }}
            >
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

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};

export default DeliveryDetails;
