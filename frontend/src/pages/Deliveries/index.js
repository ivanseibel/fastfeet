import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdMoreHoriz,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';
import { getSafe } from '../../utils/utils';

import { changeScreen } from '../../store/modules/auth/actions';
import {
  setDeliveryData,
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
  const deliveryId = useSelector(
    (state) => state.deliveries.deliveryDetails.id
  );
  const deliveryDetails = useSelector(
    (state) => state.deliveries.deliveryDetails
  );

  const totalPages = useMemo(() => {
    const pages = totalRecords / 10;
    return pages < 1 ? 1 : Math.ceil(pages);
  }, [totalRecords]);

  const dispatch = useDispatch();

  async function handleDeleteDelivery() {
    try {
      await api.delete(`deliveries/${deliveryId}`);
      setDeliveries(
        deliveries.filter((delivery) => delivery.id !== deliveryId)
      );

      setTotalRecords(totalRecords - 1);

      toast.success('Delivery was deleted with success');
    } catch (error) {
      toast.error(error.message);
    }
  }

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
        dispatch(
          setDeliveryData({
            deliveryId: '',
            recipientId: '',
            recipientName: '',
            deliverymanId: '',
            deliverymanName: '',
          })
        );
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
        window.confirm('Are you sure you wish to delete this delivery?') &&
          handleDeleteDelivery();
      },
    },
  ];

  useEffect(() => {
    deliveries.length === 0 && actualPage > 1 && setActualPage(actualPage - 1);
  }, [deliveries, actualPage]);

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

  function handleSetDeliveryData(data) {
    dispatch(setDeliveryData(data));
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
              <span>{getSafe(() => delivery.recipient.name)}</span>
              <span>{getSafe(() => delivery.product)}</span>
              <span>
                {delivery.deliveryman ? (
                  <img
                    src={getSafe(() => delivery.deliveryman.avatar.url)}
                    alt={getSafe(() => delivery.deliveryman.name)}
                  />
                ) : null}
                {getSafe(() => delivery.deliveryman.name)}
              </span>
              <span>{getSafe(() => delivery.recipient.city)}</span>
              <span>{getSafe(() => delivery.recipient.state)}</span>
              <span>
                <Status status={delivery.status}>
                  {delivery.status.toUpperCase()}
                </Status>
              </span>
              <span className="actions">
                <button
                  type="button"
                  onClick={() => {
                    handleSetDeliveryData({
                      id: delivery.id,
                      recipient_id: getSafe(() => delivery.recipient.id),
                      recipient_name: getSafe(() => delivery.recipient.name),
                      deliveryman_id: getSafe(() => delivery.deliveryman.id),
                      deliveryman_name: getSafe(
                        () => delivery.deliveryman.name
                      ),
                      product: getSafe(() => delivery.product),
                    });
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
