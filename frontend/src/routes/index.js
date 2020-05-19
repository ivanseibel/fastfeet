import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import Deliverymen from '../pages/Deliverymen';
import Issues from '../pages/Issues';
import Recipients from '../pages/Recipients';
import DeliveryForm from '../pages/Deliveries/DeliveryForm';
import DeliverymanForm from '../pages/Deliverymen/DeliverymanForm';
import RecipientForm from '../pages/Recipients/RecipientForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/issues" component={Issues} isPrivate />

      <Route path="/delivery" component={DeliveryForm} isPrivate />
      <Route path="/deliveryman" component={DeliverymanForm} isPrivate />
      <Route path="/recipient" component={RecipientForm} isPrivate />
    </Switch>
  );
}
