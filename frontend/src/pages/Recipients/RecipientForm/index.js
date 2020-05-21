import React, { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import * as S from './styles';
import RegisterHeader from '../../../components/RegisterHeader';

import api from '../../../services/api';
import history from '../../../services/history';

export default function RecipientForm({ location }) {
  const [newRecipient, setNewRecipient] = useState({
    id: '',
    name: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    postal_code: '',
  });

  const { operation } = location.state;

  const selectedRecipient = useSelector(
    (state) => state.recipients.recipientDetails
  );

  useEffect(() => {
    if (selectedRecipient.id !== '') {
      setNewRecipient({
        id: selectedRecipient.id,
        name: selectedRecipient.name,
        street: selectedRecipient.street,
        number: selectedRecipient.number,
        complement: selectedRecipient.complement,
        city: selectedRecipient.city,
        state: selectedRecipient.state,
        postal_code: selectedRecipient.postal_code,
      });
    }
  }, [selectedRecipient]);

  const formattedPostalCode = useMemo(() => {
    const { postal_code: postalCode } = newRecipient;
    return postalCode ? postalCode.replace(/(\d{5})/, '$1-') : '';
  }, [newRecipient]);

  function handlePostalCodeChange(e) {
    const { value } = e.target;
    const newValue = value.replace(/\D+/g, '');
    setNewRecipient({ ...newRecipient, postal_code: newValue });
  }

  function handleNumberChange(e) {
    const { value } = e.target;
    const newValue = value.replace(/\D+/g, '');
    setNewRecipient({ ...newRecipient, number: Math.floor(newValue) });
  }

  // Generic handler for fields without treatments
  function handleFieldChange(e) {
    const { name, value } = e.target;
    setNewRecipient({ ...newRecipient, [name]: value });
  }

  async function handleSubmit() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      street: Yup.string().required('Street is required'),
      number: Yup.number()
        .typeError('Number must be a valid number')
        .integer('Number must be an integer')
        .strict()
        .required('Number is required'),
      complement: Yup.string(),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      postal_code: Yup.string().required('Postal code is required'),
    });

    try {
      await schema.validate(newRecipient, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      errors.map((e) => toast.error(e));
      return;
    }

    const query = {
      name: newRecipient.name,
      street: newRecipient.street,
      number: newRecipient.number,
      complement: newRecipient.complement,
      city: newRecipient.city,
      state: newRecipient.state,
      postal_code: newRecipient.postal_code,
    };

    try {
      if (operation === 'edit') {
        await api.put(`recipients/${selectedRecipient.id}`, query);
        toast.success('Recipient updated with success!');
      }
      if (operation === 'insert') {
        await api.post(`recipients`, query);
        setNewRecipient({
          id: null,
          name: null,
          street: null,
          number: null,
          complement: null,
          city: null,
          state: null,
          postal_code: null,
        });
        toast.success('Recipient created with success!');
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
        history.push('/recipients');
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
    <S.Container>
      <RegisterHeader
        headerControls={headerControls}
        subtitle={operation === 'edit' ? 'Recipient edit' : 'Recipient insert'}
      />
      <form>
        <S.Row className="row1">
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleFieldChange}
              value={newRecipient.name || ''}
            />
          </label>
        </S.Row>
        <S.Row className="row2">
          <span>
            <label htmlFor="street">
              Street
              <input
                type="text"
                name="street"
                id="street"
                onChange={handleFieldChange}
                value={newRecipient.street || ''}
              />
            </label>
          </span>
          <span>
            <label htmlFor="number">
              Number
              <input
                type="text"
                name="number"
                id="number"
                onChange={handleNumberChange}
                value={newRecipient.number || ''}
              />
            </label>
          </span>
          <span>
            <label htmlFor="complement">
              Complement
              <input
                type="text"
                name="complement"
                id="complement"
                onChange={handleFieldChange}
                value={newRecipient.complement || ''}
              />
            </label>
          </span>
        </S.Row>
        <S.Row className="row3">
          <span>
            <label htmlFor="city">
              City
              <input
                type="text"
                name="city"
                id="city"
                onChange={handleFieldChange}
                value={newRecipient.city || ''}
              />
            </label>
          </span>
          <span>
            <label htmlFor="state">
              State
              <input
                type="text"
                name="state"
                id="state"
                onChange={handleFieldChange}
                value={newRecipient.state || ''}
              />
            </label>
          </span>
          <span>
            <label htmlFor="postal-code">
              Postal code
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                onChange={handlePostalCodeChange}
                value={formattedPostalCode}
              />
            </label>
          </span>
        </S.Row>
      </form>
    </S.Container>
  );
}

RecipientForm.propTypes = {
  location: PropTypes.shape().isRequired,
};
