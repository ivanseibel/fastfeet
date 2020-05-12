import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import deliveries from './deliveries/reducer';
import deliverymans from './deliverymans/reducer';

export default combineReducers({ auth, user, deliveries, deliverymans });
