import { Alert } from 'react-native';
import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    if (!id) {
      Alert.alert('Login fails', 'ID is required');
      yield put(signFailure());
      return;
    }

    const response = yield call(api.get, `deliverymen/${id}`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (error) {
    Alert.alert('Login fails', 'Invalid ID');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
