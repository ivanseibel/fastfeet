import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdMoreHoriz } from 'react-icons/md';

import api from '../../services/api';

import { changeScreen } from '../../store/modules/auth/actions';
import {
  setDeliveryId,
  setShowDetails,
} from '../../store/modules/deliveries/actions';

import { Container, Grid, Status } from './styles';
import HeaderRegister from '../../components/RegisterHeader';
import PopupMenu from '../../components/PopupMenu';
import Modal from '../../components/Modal';
import DeliveryDetails from './DeliveryDetails';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  const filter = useSelector((state) => state.deliveries.filter);
  const deliveryDetails = useSelector(
    (state) => state.deliveries.deliveryDetails
  );

  const dispatch = useDispatch();

  const menuItems = [
    {
      type: 'Details',
      method: () => {
        dispatch(setShowDetails(true));
      },
    },
    {
      type: 'Edit',
      method: () => {
        console.log('Edit');
      },
    },
    {
      type: 'Delete',
      method: () => {
        console.log('Delete');
      },
    },
  ];

  useEffect(() => {
    dispatch(changeScreen('deliveries'));
  }, [dispatch]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');

      if (response) {
        const data = response.data.map((delivery) => ({
          ...delivery,
          showMenu: false,
        }));
        setDeliveries(data);
      }
    }

    loadDeliveries();
  }, []);

  useEffect(() => {
    async function filterDeliveries() {
      let query = null;

      if (filter.length > 0) {
        query = {
          params: {
            q: filter,
          },
        };
      }

      const response = await api.get('deliveries', query);

      if (response) {
        const data = response.data.map((delivery) => ({
          ...delivery,
          showMenu: false,
        }));
        setDeliveries(data);
      }
    }

    filterDeliveries();
  }, [filter]);

  function handleSetDeliveryId(id) {
    dispatch(setDeliveryId(id));
  }

  return (
    <>
      {deliveryDetails.showModal ? (
        <Modal
        // visible={showDetails}
        // toggleShowModal={() => setShowModal(!showModal)}
        >
          <DeliveryDetails id={deliveryDetails.id} />
        </Modal>
      ) : null}

      <Container>
        <HeaderRegister showControls />
        <Grid status="delivered">
          <strong>ID</strong>
          <strong>Recipient</strong>
          <strong>Product</strong>
          <strong>Deliveryman</strong>
          <strong>City</strong>
          <strong>State</strong>
          <strong>Status</strong>
          <strong>Actions</strong>

          {deliveries.map((delivery) => (
            <React.Fragment key={delivery.id}>
              <span>{delivery.id}</span>
              <span>{delivery.recipient.name}</span>
              <span>{delivery.product}</span>
              <span>
                <img
                  src={delivery.deliveryman.avatar.url}
                  alt={delivery.deliveryman.name}
                />
                {delivery.deliveryman.name}
              </span>
              <span>{delivery.recipient.city}</span>
              <span>{delivery.recipient.state}</span>
              <span>
                <Status status={delivery.status}>
                  {delivery.status.toUpperCase()}
                </Status>
              </span>
              <span className="actions">
                <button
                  type="button"
                  onClick={() => {
                    handleSetDeliveryId(delivery.id);
                  }}
                >
                  <MdMoreHoriz size={20} />
                </button>

                <PopupMenu
                  show={
                    delivery.id === deliveryDetails.id
                      ? deliveryDetails.showPopup
                      : false
                  }
                  menuItems={menuItems}
                  // toggleShowMenu={toggleShowMenu}
                />
              </span>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </>
  );
}
