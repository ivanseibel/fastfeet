import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

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
  PullToUpdateContainer,
  PullToUpdateText,
} from './styles';

import { signOffRequest } from '~/store/modules/auth/actions';

import api from '~/services/api';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  const focused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('pendent');

  const { user } = useSelector((state) => state.user);

  const avatar = useMemo(() => {
    return user.avatar
      ? user.avatar.url
      : `https://api.adorable.io/avatars/60/${user.name}.png`;
  }, [user]);

  const [pendent, setPendent] = useState([]);

  const [delivered, setDelivered] = useState([]);

  const loadDeliveries = async () => {
    if (user.id === '') {
      return;
    }
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
  }, [focused]);

  const showDeliveries = useMemo(() => {
    if (filter === 'pendent' && pendent.length) return true;
    if (filter === 'delivered' && delivered.length) return true;
    return true;
  }, [filter]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header>
        <Avatar source={{ uri: avatar || 'not empty' }} />

        <Welcome>
          <WelcomeMessage>Welcome back,</WelcomeMessage>
          <WelcomeName>{user.name}</WelcomeName>
        </Welcome>

        <TouchableOpacity onPress={() => dispatch(signOffRequest())}>
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
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <PullToUpdateContainer>
            <Icon name="refresh" size={30} color="#999" />
            <PullToUpdateText>Pull to update</PullToUpdateText>
          </PullToUpdateContainer>
        }
        renderItem={({ item }) => (
          <Delivery navigation={navigation} delivery={item} />
        )}
      />
    </Container>
  );
};

export default Dashboard;
