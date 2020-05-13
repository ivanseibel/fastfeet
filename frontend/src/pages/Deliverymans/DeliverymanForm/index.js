import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdInsertPhoto } from 'react-icons/md';
import * as S from './styles';
import RegisterHeader from '../../../components/RegisterHeader';

import history from '../../../services/history';
import api from '../../../services/api';

export default function DeliverymanForm({ location }) {
  const [newDeliveryman, setNewDeliveryman] = useState({
    name: null,
    email: null,
    avatar_id: null,
  });

  const selectedDeliveryman = useSelector(
    (state) => state.deliverymans.deliverymanDetails
  );

  const { operation } = location.state;

  useEffect(() => {
    if (selectedDeliveryman.id !== '') {
      setNewDeliveryman({
        name: selectedDeliveryman.name,
        email: selectedDeliveryman.email,
        avatar_id: selectedDeliveryman.avatar_id,
      });
    }
  }, [selectedDeliveryman]);

  async function handleSubmit() {
    const schema = Yup.object().shape({
      name: Yup.string('Name must be a string').required('Name is required'),
      email: Yup.string('Email must be a string')
        .required('Email is required')
        .email('Email must be a valid email'),
    });

    try {
      await schema.validate(newDeliveryman, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      errors.map((e) => toast.error(e));
      return;
    }

    const query = {
      name: newDeliveryman.name,
      email: newDeliveryman.email,
    };

    try {
      if (operation === 'edit') {
        await api.put(`deliverymans/${selectedDeliveryman.id}`, query);
        toast.success('Deliveryman updated with success!');
      }
      if (operation === 'insert') {
        await api.post(`deliverymans`, query);
        setNewDeliveryman({
          name: null,
          email: null,
        });
        toast.success('Deliveryman created with success!');
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
        history.push('/deliverymans');
      },
    },
    {
      type: 'save',
      method: () => {
        handleSubmit();
      },
    },
  ];

  function handleName(e) {
    setNewDeliveryman({ ...newDeliveryman, name: e.target.value });
  }

  function handleEmail(e) {
    setNewDeliveryman({ ...newDeliveryman, email: e.target.value });
  }

  return (
    <S.Container>
      <RegisterHeader
        headerControls={headerControls}
        subtitle={
          operation === 'edit' ? 'Deliveryman edit' : 'Deliveryman insert'
        }
      />

      <form>
        <S.AvatarRow>
          <span>
            <MdInsertPhoto size={39} />
            <strong>Add avatar</strong>
          </span>
        </S.AvatarRow>

        <S.InputRow>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={newDeliveryman.name || ''}
              onChange={handleName}
            />
          </label>
        </S.InputRow>

        <S.InputRow>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              id="email"
              value={newDeliveryman.email || ''}
              onChange={handleEmail}
            />
          </label>
        </S.InputRow>
      </form>
    </S.Container>
  );
}

DeliverymanForm.propTypes = {
  location: PropTypes.shape().isRequired,
};
