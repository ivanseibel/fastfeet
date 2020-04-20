import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import api from '../../services/api';
import { changeScreen } from '../../store/modules/auth/actions';
import { Container, Grid, Status, Menu } from './styles';
import HeaderRegister from '../../components/RegisterHeader';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');

      if (response) {
        const data = response.data.map((delivery) => ({
          ...delivery,
          showMenu: false,
        }));
        setDeliveries(data);
        console.tron.log(data);
      }
    }

    loadDeliveries();
  }, []);

  function toggleShowMenu(id) {
    setDeliveries(
      deliveries.map((delivery) => {
        const updated = { ...delivery };

        if (delivery.id === id) updated.showMenu = !delivery.showMenu;

        return updated;
      })
    );
  }

  const dispatch = useDispatch();

  dispatch(changeScreen('deliveries'));

  return (
    <Container>
      <HeaderRegister screenName="deliveries" showControls />
      <Grid status="delivered">
        <strong>ID</strong>
        <strong>Recipient</strong>
        <strong>Deliveryman</strong>
        <strong>City</strong>
        <strong>State</strong>
        <strong>Status</strong>
        <strong>Actions</strong>

        {deliveries.map((delivery) => (
          <>
            <span>{delivery.id}</span>
            <span>{delivery.recipient.name}</span>
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
                  toggleShowMenu(delivery.id);
                }}
              >
                <MdMoreHoriz size={20} />
              </button>
              <Menu showMenu={delivery.showMenu}>
                <li>
                  <MdVisibility size={20} color="#8e5be8" />
                  <b>Details</b>
                </li>
                <li>
                  <MdCreate size={20} color="#4d85ee" />
                  <b>Edit</b>
                </li>
                <li>
                  <MdDeleteForever size={20} color="#de3b3b" />
                  <b>Delete</b>
                </li>
              </Menu>
            </span>
          </>
        ))}
      </Grid>
    </Container>
  );
}
