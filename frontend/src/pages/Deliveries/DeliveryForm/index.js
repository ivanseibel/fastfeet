import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import api from '../../../services/api';

import { Container, Form, FormRow } from './styles';

import HeaderRegister from '../../../components/RegisterHeader';

export default function DeliveryForm() {
  const [recipients, setRecipients] = useState([]);

  const headerControls = ['back', 'save'];

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');
      const { data } = response;

      if (data) {
        setRecipients(data);
      }
    }

    loadRecipients();
  }, []);

  return (
    <Container>
      <HeaderRegister controls={headerControls} subtitle="Delivery edit" />
      <Form>
        <FormRow id="row-1">
          <label htmlFor="recipient">
            Recipient
            <select name="" id="recipient" className="field">
              {recipients.map((recipient) => (
                <option key={String(recipient.id)} value={String(recipient.id)}>
                  {recipient.name}
                </option>
              ))}
            </select>
            <MdKeyboardArrowDown color="#ddd" size={25} />
          </label>
          <label htmlFor="deliveryman">
            Deliveryman
            <select name="" id="deliveryman" className="field">
              <option value="-1">Select a deliveryman</option>
              <option value="1">Deliveryman 1</option>
              <option value="2">Deliveryman 2</option>
              <option value="3">Deliveryman 3</option>
            </select>
            <MdKeyboardArrowDown color="#ddd" size={25} />
          </label>
        </FormRow>
        <FormRow id="row-2">
          <label htmlFor="product">
            Product name
            <input type="text" id="product" className="field" placeholder="" />
          </label>
        </FormRow>
      </Form>
    </Container>
  );
}
