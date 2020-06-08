import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { StatusBar, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Delivery from './Delivery';
import {
  Container,
  Header,
  Avatar,
  Welcome,
  WelcomeMessage,
  WelcomeName,
  Deliveries,
  DeliveriesHeader,
  DeliveriesTitle,
  DeliveriesFilter,
  Filter,
} from './styles';

import api from '~/services/api';

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('pendent');
  const { user } = useSelector(state => state.user);
  const [pendent, setPendent] = useState([]);

  const [delivered, setDelivered] = useState([]);

  const loadDeliveries = async () => {
    setRefreshing(true);
    try {
      let response = await api({
        method: 'get',
        url: `deliverymen/${user.id}/deliveries`,
        params: {
          status: 'pendent',
        },
      });

      setPendent(response.data);

      response = await api({
        method: 'get',
        url: `deliverymen/${user.id}/deliveries`,
        params: {
          status: 'delivered',
        },
      });

      setDelivered(response.data);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      Alert.alert('Network error', error.message);
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatars/60/${user.name}.png`,
          }}
        />

        <Welcome>
          <WelcomeMessage>Welcome back,</WelcomeMessage>
          <WelcomeName>{user.name}</WelcomeName>
        </Welcome>

        <TouchableOpacity>
          <Icon name="exit-to-app" size={30} color="#E74040" />
        </TouchableOpacity>
      </Header>

      <DeliveriesHeader>
        <DeliveriesTitle>Deliveries</DeliveriesTitle>
        <DeliveriesFilter>
          <Filter
            onPress={() => {
              setFilter('pendent');
            }}
            selected={filter === 'pendent'}
          >
            Pendent
          </Filter>
          <Filter
            onPress={() => {
              setFilter('delivered');
            }}
            selected={filter === 'delivered'}
          >
            Delivered
          </Filter>
        </DeliveriesFilter>
      </DeliveriesHeader>

      <Deliveries
        onRefresh={loadDeliveries}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        data={filter === 'pendent' ? pendent : delivered}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Delivery delivery={item} />}
      />
    </Container>
  );
};

export default Dashboard;
