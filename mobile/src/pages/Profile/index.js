import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StatusBar } from 'react-native';

import { signOffRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Avatar,
  Label,
  Content,
  LogoutButton,
  TextButton,
} from './styles';

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);

  const avatar = useMemo(() => {
    return user.avatar
      ? user.avatar.url
      : `https://api.adorable.io/avatars/60/${user.name}.png`;
  }, [user]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Avatar source={{ uri: avatar || 'not empty' }} />

      <Label>Full name</Label>
      <Content>Ivan Seibel</Content>

      <Label>Email</Label>
      <Content>ivan@gmail.com</Content>

      <Label>Since</Label>
      <Content>2020-05-17</Content>

      <LogoutButton onPress={() => dispatch(signOffRequest())}>
        <TextButton>Logout</TextButton>
      </LogoutButton>
    </Container>
  );
};

export default Profile;
