import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdInsertPhoto } from 'react-icons/md';
import * as S from './styles';
import RegisterHeader from '../../../components/RegisterHeader';

import history from '../../../services/history';
import api from '../../../services/api';
import { getSafe } from '../../../utils/utils';

export default function DeliverymanForm({ location }) {
  const [avatarFile, setAvatarFile] = useState(null);
  const [newDeliveryman, setNewDeliveryman] = useState({
    name: null,
    email: null,
    avatar_id: null,
  });

  const selectedDeliveryman = useSelector(
    (state) => state.deliverymans.deliverymanDetails
  );

  const { operation } = location.state;

  const preview = useMemo(() => {
    if (avatarFile) {
      return {
        url: URL.createObjectURL(avatarFile),
        name: avatarFile.name,
      };
    }

    if (selectedDeliveryman.avatar) {
      return {
        url: selectedDeliveryman.avatar.url,
        name: selectedDeliveryman.avatar.name,
      };
    }

    return null;
  }, [avatarFile, selectedDeliveryman]);

  useEffect(() => {
    if (selectedDeliveryman.id !== '') {
      setNewDeliveryman({
        name: selectedDeliveryman.name,
        email: selectedDeliveryman.email,
        avatar_id: getSafe(() => selectedDeliveryman.avatar.avatar_id, null),
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
      if (avatarFile) {
        if (avatarFile.size > 2048000) {
          throw new Error('Avatar must have less than 2MB');
        }

        const formData = new FormData();
        formData.append('file', avatarFile);
        const { data } = await api.post('avatars', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (data) {
          query.avatar_id = data.id;
        }
      }

      if (operation === 'edit') {
        await api.put(`deliverymans/${selectedDeliveryman.id}`, query);
        toast.success('Deliveryman updated with success!');
      }
      if (operation === 'insert') {
        await api.post(`deliverymans`, query);
        setNewDeliveryman({
          name: null,
          email: null,
          avatar_id: null,
        });

        setAvatarFile(null);
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

  function handleAvatarOnChange(e) {
    setAvatarFile(e.target.files[0]);
    console.log(e.target.files[0]);
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
          <label htmlFor="avatar">
            {preview ? (
              <img src={preview.url} alt={preview.name} />
            ) : (
              <>
                <MdInsertPhoto size={39} /> <strong>Add avatar</strong>
              </>
            )}
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleAvatarOnChange}
            />
          </label>
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
