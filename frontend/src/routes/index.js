import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import Deliverymans from '../pages/Deliverymans';
import Issues from '../pages/Issues';
import Recipients from '../pages/Recipients';
import DeliveryForm from '../pages/Deliveries/DeliveryForm';
import DeliverymanForm from '../pages/Deliverymans/DeliverymanForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/issues" component={Issues} isPrivate />

      <Route path="/delivery" component={DeliveryForm} isPrivate />
      <Route path="/deliveryman" component={DeliverymanForm} isPrivate />
    </Switch>
  );
}
