import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import deliveries from './deliveries/reducer';
import deliverymen from './deliverymen/reducer';
import recipients from './recipients/reducer';
import issues from './issues/reducer';

export default combineReducers({
  auth,
  user,
  deliveries,
  deliverymen,
  recipients,
  issues,
});
