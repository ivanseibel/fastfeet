import React from 'react';
import { useDispatch } from 'react-redux';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import { changeScreen } from '../../store/modules/auth/actions';
import { Container, Grid, Status } from './styles';
import HeaderRegister from '../../components/RegisterHeader';

export default function Deliveries() {
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

        <span>#001</span>
        <span>Ivan Luis Seibel</span>
        <span>
          <img
            src="https://api.adorable.io/avatars/50/abott@adorable.png"
            alt=""
          />
          Gaspar Antunes
        </span>
        <span>Maceió</span>
        <span>Alagoas</span>
        <span>
          <Status status="delivered">DELIVERED</Status>
        </span>
        <span className="actions">
          <button type="button">
            <MdMoreHoriz size={20} />
          </button>
          <ul>
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
          </ul>
        </span>

        <span>#001</span>
        <span>Ivan Luis Seibel</span>
        <span>
          <img
            src="https://api.adorable.io/avatars/50/abott@adorable.png"
            alt=""
          />
          Gaspar Antunes
        </span>
        <span>Maceió</span>
        <span>Alagoas</span>
        <span>
          <Status status="pendent">PENDENT</Status>
        </span>
        <span className="actions">
          <button type="button">
            <MdMoreHoriz size={20} />
          </button>
        </span>
      </Grid>
    </Container>
  );
}
