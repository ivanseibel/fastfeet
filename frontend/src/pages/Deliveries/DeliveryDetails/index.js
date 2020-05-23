import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdBlock } from 'react-icons/md';
// import Intl from 'intl/locale-data/jsonp/en';

import api from '../../../services/api';

import { Container } from './styles';

export default function DeliveryDetails(props) {
  const { id } = props;

  const [details, setDetails] = useState(null);

  const recipient = useMemo(() => (details ? details.recipient : null), [
    details,
  ]);
  const signature = useMemo(() => (details ? details.signature : null), [
    details,
  ]);

  useEffect(() => {
    async function loadDetails() {
      if (id) {
        const { data } = await api.get(`/deliveries/${id}`);

        let formattedDate = null;
        formattedDate = new Date(data.start_date);
        data.formattedStartDate = formattedDate.toLocaleDateString('en-US');
        formattedDate = new Date(data.end_date);
        data.formattedEndDate = formattedDate.toLocaleDateString('en-US');

        setDetails(data);
      }
    }

    loadDetails();
  }, [id]);

  if (!details) {
    return null;
  }

  return (
    <Container>
      <h4>Address</h4>
      <span>
        <p>
          {recipient.street}, {recipient.number}
        </p>
        <p>
          {recipient.city} - {recipient.state}
        </p>
        <p>{recipient.postal_code}</p>
      </span>

      <hr />

      <h4>Dates</h4>
      <p>
        <strong>Started: </strong>
        {details.start_date ? details.formattedStartDate : null}
      </p>
      <p>
        <strong>Delivered: </strong>
        {details.end_date ? details.formattedEndDate : null}
      </p>

      <hr />

      <h4>Recipient signature</h4>
      <div>
        {signature ? (
          <img src={signature.url} alt="signature" />
        ) : (
          <MdBlock size={50} />
        )}
      </div>
    </Container>
  );
}

DeliveryDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
