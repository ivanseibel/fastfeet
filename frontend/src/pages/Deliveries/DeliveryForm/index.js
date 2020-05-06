import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { Container, Form, FormRow } from './styles';

import HeaderRegister from '../../../components/RegisterHeader';

export default function DeliveryForm({ location }) {
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const [delivery, setDelivery] = useState(null);
  const [newDelivery, setNewDelivery] = useState({
    recipient_id: null,
    deliveryman_id: null,
    product: null,
  });

  const { operation } = location.state;

  const { id: deliveryId } = useSelector(
    (state) => state.deliveries.deliveryDetails
  );

  useEffect(() => {
    if (delivery) {
      setNewDelivery({
        // id: delivery.id,
        recipient_id: delivery.recipient.id,
        deliveryman_id: delivery.deliveryman ? delivery.deliveryman.id : null,
        product: delivery.product,
      });
    }
  }, [delivery]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');
      const { data } = response;

      if (data) {
        data.unshift({
          id: '',
          name: '',
        });

        setRecipients(data);
      }
    }

    async function loadDeliverymans() {
      const response = await api.get('deliverymans');
      const { data } = response;

      if (data) {
        data.unshift({
          id: '',
          name: '',
        });

        setDeliverymans(data);
      }
    }

    async function loadDelivery() {
      const response = await api.get(`deliveries/${deliveryId}`);

      const { data } = response;

      if (data) {
        setDelivery(data);
      }
    }

    loadRecipients();
    loadDeliverymans();

    if (deliveryId) loadDelivery();
  }, [deliveryId]);

  function handleRecipientChange(e) {
    setNewDelivery({ ...newDelivery, recipient_id: e.target.value });
  }

  function handleDeliverymanChange(e) {
    const deliverymanId = e.target.value === '' ? null : e.target.value;
    setNewDelivery({ ...newDelivery, deliveryman_id: deliverymanId });
  }

  function handleProduct(e) {
    setNewDelivery({ ...newDelivery, product: e.target.value });
  }

  async function handleSubmit() {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .typeError('Recipient is required')
        .required('Recipient is required'),
      product: Yup.string('Product must be a string')
        .required('Product is required')
        .min(3, 'Product must have 3 characters at least')
        .strict(),
    });

    try {
      await schema.validate(newDelivery, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      errors.map((e) => toast.error(e));
      return;
    }

    const query = {};

    Object.keys(newDelivery).forEach((key) => {
      query[key] = newDelivery[key];
    });

    try {
      if (operation === 'edit') {
        await api.put(`deliveries/${deliveryId}`, query);
        toast.success('Delivery updated with success!');
      }
      if (operation === 'insert') {
        await api.post(`deliveries`, query);
        setNewDelivery({
          recipient_id: null,
          deliveryman_id: null,
          product: null,
        });
        toast.success('Delivery created with success!');
      }
      return;
    } catch (error) {
      toast.error(error.message);
    }
  }

  const headerControls = [
    {
      type: 'back',
      method: () => {
        history.push('/deliveries');
      },
    },
    {
      type: 'save',
      method: () => {
        handleSubmit();
      },
    },
  ];

  return (
    <Container>
      <HeaderRegister
        headerControls={headerControls}
        subtitle="Delivery edit"
      />
      <Form>
        <FormRow id="row-1">
          <label htmlFor="recipient">
            Recipient
            <select
              id="recipient"
              className="field"
              value={newDelivery.recipient_id || ''}
              onChange={handleRecipientChange}
            >
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
            <select
              id="deliveryman"
              className="field"
              value={newDelivery.deliveryman_id || ''}
              onChange={handleDeliverymanChange}
            >
              {deliverymans.map((deliveryman) => (
                <option key={deliveryman.id} value={deliveryman.id}>
                  {deliveryman.name}
                </option>
              ))}
            </select>
            <MdKeyboardArrowDown color="#ddd" size={25} />
          </label>
        </FormRow>
        <FormRow id="row-2">
          <label htmlFor="product">
            Product name
            <input
              type="text"
              id="product"
              className="field"
              placeholder=""
              value={newDelivery.product || ''}
              onChange={handleProduct}
            />
          </label>
        </FormRow>
      </Form>
    </Container>
  );
}
