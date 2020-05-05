import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdMoreHoriz,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { changeScreen } from '../../store/modules/auth/actions';
import {
  setDeliveryId,
  setShowDetails,
} from '../../store/modules/deliveries/actions';

import { Container, Grid, Status, NavBar, NavButton } from './styles';

import HeaderRegister from '../../components/RegisterHeader';
import PopupMenu from '../../components/PopupMenu';
import Modal from '../../components/Modal';
import DeliveryDetails from './DeliveryDetails';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [actualPage, setActualPage] = useState(1);

  const filter = useSelector((state) => state.deliveries.filter);
  const deliveryDetails = useSelector(
    (state) => state.deliveries.deliveryDetails
  );

  const dispatch = useDispatch();

  const headerControls = [
    {
      type: 'title',
    },
    {
      type: 'search',
    },
    {
      type: 'new',
      method: () => {
        dispatch(setDeliveryId(''));
        history.push('delivery', { operation: 'insert' });
      },
    },
  ];
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
        history.push('delivery', { operation: 'edit' });
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
    async function filterDeliveries() {
      const query = {
        params: {
          page: actualPage,
        },
      };

      if (filter.length > 0) {
        query.params = { ...query.params, q: filter };
      }

      const response = await api.get('deliveries', query);

      if (response) {
        const rows = response.data.rows.map((delivery) => ({
          ...delivery,
          showMenu: false,
        }));
        setDeliveries(rows);
        setTotalRecords(response.data.count);
      }
    }

    filterDeliveries();
  }, [filter, actualPage]);

  const totalPages = useMemo(() => {
    const pages = totalRecords / 10;
    return pages < 1 ? 1 : Math.ceil(pages);
  }, [totalRecords]);

  function handleSetDeliveryId(id) {
    dispatch(setDeliveryId(id));
  }

  function handleNextButtonClick() {
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
    }
  }

  function handlePrevButtonClick() {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
  }

  return (
    <>
      {deliveryDetails.showModal ? (
        <Modal>
          <DeliveryDetails id={deliveryDetails.id} />
        </Modal>
      ) : null}

      <Container>
        <HeaderRegister
          headerControls={headerControls}
          title="Managing deliveries"
        />
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
                {delivery.deliveryman ? (
                  <img
                    src={delivery.deliveryman.avatar.url}
                    alt={delivery.deliveryman.name}
                  />
                ) : null}
                {delivery.deliveryman ? delivery.deliveryman.name : null}
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
                />
              </span>
            </React.Fragment>
          ))}
        </Grid>

        <NavBar>
          <NavButton active={actualPage > 1} onClick={handlePrevButtonClick}>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>{'PREV '}</span>
          </NavButton>
          <strong>
            Page: {actualPage} / {totalPages}
          </strong>
          <NavButton
            active={actualPage < totalPages}
            onClick={handleNextButtonClick}
          >
            <span>{' NEXT'}</span>
            <MdKeyboardArrowRight size={20} color="#fff" />
          </NavButton>
        </NavBar>
      </Container>
    </>
  );
}
