import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';

import api from '../../../services/api';
import history from '../../../services/history';

import { Container, Row1, Row2, SelectContainer } from './styles';

import HeaderRegister from '../../../components/RegisterHeader';

export default function DeliveryForm({ location }) {
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    recipient_id: null,
    recipient_name: null,
    deliveryman_id: null,
    deliveryman_name: null,
    product: null,
  });

  const { operation } = location.state;

  const selectedDelivery = useSelector(
    (state) => state.deliveries.deliveryDetails
  );

  useEffect(() => {
    if (selectedDelivery.id !== '') {
      setNewDelivery({
        recipient_id: selectedDelivery.recipient_id,
        recipient_name: selectedDelivery.recipient_name,
        deliveryman_id: selectedDelivery.deliveryman_id,
        deliveryman_name: selectedDelivery.deliveryman_name,
        product: selectedDelivery.product,
      });
    }
  }, [selectedDelivery]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');
      const { data } = response;

      if (data) {
        const loaded = data.map((recipient) => ({
          value: recipient.id,
          label: recipient.name,
        }));

        loaded.unshift({
          value: null,
          label: 'Select...',
        });

        setRecipients(loaded);
      }
    }

    async function loadDeliverymen() {
      const response = await api.get('deliverymen');
      const { data } = response;

      if (data) {
        const loaded = data.rows.map((deliveryman) => ({
          value: deliveryman.id,
          label: deliveryman.name,
        }));

        loaded.unshift({
          value: null,
          label: 'Select...',
        });

        setDeliverymen(loaded);
      }
    }

    loadRecipients();
    loadDeliverymen();
  }, [selectedDelivery]);

  function filterRecipients(inputValue) {
    return recipients.filter((recipient) =>
      recipient.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function loadRecipientsToSelect(inputValue, callback) {
    setTimeout(() => {
      callback(filterRecipients(inputValue));
    }, 1000);
  }

  function handleRecipientInputChange(newValue) {
    return newValue.replace(/\W/g, '');
  }

  function handleRecipientChange(newValue) {
    setNewDelivery({
      ...newDelivery,
      recipient_id: newValue.value,
      recipient_name: newValue.label,
    });
  }

  function filterDeliverymen(inputValue) {
    return deliverymen.filter((deliveryman) =>
      deliveryman.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function loadDeliverymenToSelect(inputValue, callback) {
    setTimeout(() => {
      callback(filterDeliverymen(inputValue));
    }, 1000);
  }

  function handleDeliverymanInputChange(newValue) {
    return newValue.replace(/\W/g, '');
  }

  function handleDeliverymanChange(newValue) {
    setNewDelivery({
      ...newDelivery,
      deliveryman_id: newValue.value,
      deliveryman_name: newValue.label,
    });
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

    const query = {
      recipient_id: newDelivery.recipient_id,
      deliveryman_id: newDelivery.deliveryman_id,
      product: newDelivery.product,
    };

    try {
      if (operation === 'edit') {
        await api.put(`deliveries/${selectedDelivery.id}`, query);
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
        subtitle={operation === 'edit' ? 'Delivery edit' : 'Delivery insert'}
      />

      <form>
        <Row1>
          <div>
            <strong>Recipient</strong>
            <SelectContainer>
              <AsyncSelect
                cacheOptions
                loadOptions={loadRecipientsToSelect}
                defaultOptions={recipients}
                value={{
                  value: newDelivery.recipient_id,
                  label: newDelivery.recipient_name || 'Select...',
                }}
                onInputChange={handleRecipientInputChange}
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={handleRecipientChange}
              />
            </SelectContainer>
          </div>
          <div>
            <strong>Deliveryman</strong>
            <SelectContainer>
              <AsyncSelect
                cacheOptions
                loadOptions={loadDeliverymenToSelect}
                defaultOptions={deliverymen}
                value={{
                  value: newDelivery.deliveryman_id,
                  label: newDelivery.deliveryman_name || 'Select...',
                }}
                onInputChange={handleDeliverymanInputChange}
                onChange={handleDeliverymanChange}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </SelectContainer>
          </div>
        </Row1>
        <Row2>
          <strong>Product name</strong>
          <input
            type="text"
            id="product"
            className="field"
            placeholder=""
            value={newDelivery.product || ''}
            onChange={handleProduct}
          />
        </Row2>
      </form>
    </Container>
  );
}

DeliveryForm.propTypes = {
  location: PropTypes.shape().isRequired,
};
