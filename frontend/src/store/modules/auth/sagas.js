import { takeLatest, all, call, put } from 'redux-saga/effects';

import history from '../../../services/history';
import api from '../../../services/api';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.admin) {
    console.tron.log('User is not an administrator');
    return;
  }

  yield put(signInSuccess(token, user));

  history.push('/deliveries');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
