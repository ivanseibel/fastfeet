import React, { useState, useMemo, useEffect } from 'react';

import * as S from './styles';
import RegisterHeader from '../../../components/RegisterHeader';

import api from '../../../services/api';
import history from '../../../services/history';

export default function RecipientForm({ location }) {
  const [newRecipient, setNewRecipient] = useState({
    id: null,
    name: null,
    street: null,
    number: null,
    complement: null,
    city: null,
    state: null,
    postal_code: null,
  });

  const { operation } = location.state;

  async function handleSubmit() {
    // const schema = Yup.object().shape({
    //   recipient_id: Yup.number()
    //     .typeError('Recipient is required')
    //     .required('Recipient is required'),
    //   product: Yup.string('Product must be a string')
    //     .required('Product is required')
    //     .min(3, 'Product must have 3 characters at least')
    //     .strict(),
    // });
    // try {
    //   await schema.validate(newDelivery, { abortEarly: false });
    // } catch (error) {
    //   const { errors } = error;
    //   errors.map((e) => toast.error(e));
    //   return;
    // }
    // const query = {
    //   recipient_id: newDelivery.recipient_id,
    //   deliveryman_id: newDelivery.deliveryman_id,
    //   product: newDelivery.product,
    // };
    // try {
    //   if (operation === 'edit') {
    //     await api.put(`deliveries/${selectedDelivery.id}`, query);
    //     toast.success('Delivery updated with success!');
    //   }
    //   if (operation === 'insert') {
    //     await api.post(`deliveries`, query);
    //     setNewDelivery({
    //       recipient_id: null,
    //       deliveryman_id: null,
    //       product: null,
    //     });
    //     toast.success('Delivery created with success!');
    //   }
    //   return;
    // } catch (error) {
    //   toast.error(error.message);
    // }
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

  function handlePostalCode(e) {
    const { value } = e.target;
    setNewRecipient({ ...newRecipient, postal_code: value });
  }

  const formattedPostalCode = useMemo(() => {
    return '';
    // TODO: Implement mask to postal code
  }, [newRecipient]);

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
            <input type="text" name="name" id="name" />
          </label>
        </S.Row>
        <S.Row className="row2">
          <span>
            <label htmlFor="street">
              Street
              <input type="text" name="street" id="street" />
            </label>
          </span>
          <span>
            <label htmlFor="number">
              Number
              <input type="number" name="number" id="number" />
            </label>
          </span>
          <span>
            <label htmlFor="complement">
              Complement
              <input type="text" name="complement" id="complement" />
            </label>
          </span>
        </S.Row>
        <S.Row className="row3">
          <span>
            <label htmlFor="city">
              City
              <input type="text" name="city" id="city" />
            </label>
          </span>
          <span>
            <label htmlFor="state">
              State
              <input type="text" name="state" id="state" />
            </label>
          </span>
          <span>
            <label htmlFor="postal-code">
              Postal code
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                onChange={handlePostalCode}
                value={formattedPostalCode}
              />
            </label>
          </span>
        </S.Row>
      </form>
    </S.Container>
  );
}
