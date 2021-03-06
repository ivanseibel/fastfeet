import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
} from 'react-icons/md';
import api from '../../services/api';
import { getSafe } from '../../utils/utils';
import history from '../../services/history';

import { changeScreen } from '../../store/modules/auth/actions';
import {
  setDeliverymanData,
  setShowPopup,
} from '../../store/modules/deliverymen/actions';

import * as S from './styles';
import HeaderRegister from '../../components/RegisterHeader';
import PopupMenu from '../../components/PopupMenu';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const filter = useSelector((state) => state.deliverymen.filter);
  const deliverymanDetails = useSelector(
    (state) => state.deliverymen.deliverymanDetails
  );

  const totalPages = useMemo(() => {
    const pages = totalRecords / 10;
    return pages < 1 ? 1 : Math.ceil(pages);
  }, [totalRecords]);

  const dispatch = useDispatch();

  const headerControls = [
    {
      type: 'title',
    },
    {
      type: 'search',
      searchBy: 'name',
    },
    {
      type: 'new',
      method: () => {
        dispatch(
          setDeliverymanData({
            deliveryId: '',
            recipientId: '',
            recipientName: '',
            deliverymanId: '',
            deliverymanName: '',
          })
        );
        history.push('deliveryman', { operation: 'insert' });
      },
    },
  ];

  async function handleDeleteDeliveryman() {
    try {
      await api.delete(`deliverymen/${deliverymanDetails.id}`);
      setDeliverymen(
        deliverymen.filter(
          (deliveryman) => deliveryman.id !== deliverymanDetails.id
        )
      );

      setTotalRecords(totalRecords - 1);

      toast.success('Deliveryman was deleted with success');
    } catch (error) {
      toast.error(error.message);
    }
  }

  const menuItems = [
    {
      type: 'Edit',
      method: () => {
        history.push('deliveryman', { operation: 'edit' });
      },
    },
    {
      type: 'Delete',
      method: () => {
        window.confirm('Are you sure you wish to delete this deliveryman?') &&
          handleDeleteDeliveryman();
      },
    },
  ];

  useEffect(() => {
    dispatch(changeScreen('deliverymen'));
  }, [dispatch]);

  useEffect(() => {
    deliverymen.length === 0 && actualPage > 1 && setActualPage(actualPage - 1);
  }, [deliverymen, actualPage]);

  useEffect(() => {
    async function filterDeliverymen() {
      const query = {
        params: {
          page: actualPage,
        },
      };

      if (filter.length > 0) {
        query.params.q = filter;
      }

      const response = await api.get('deliverymen', query);

      if (response) {
        const rows = response.data.rows.map((deliveryman) => ({
          ...deliveryman,
          showMenu: false,
        }));
        setDeliverymen(rows);
        setTotalRecords(response.data.count);
      }
    }

    filterDeliverymen();
  }, [filter, actualPage, totalRecords]);

  function handlePrevButtonClick() {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
  }

  function handleNextButtonClick() {
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
    }
  }

  function handleSetDeliverymanData(data) {
    dispatch(setDeliverymanData(data));
    dispatch(setShowPopup(true));
  }

  return (
    <S.Container>
      <HeaderRegister
        headerControls={headerControls}
        title="Managing deliverymen"
      />
      <S.Grid>
        <strong>ID</strong>
        <strong>Avatar</strong>
        <strong>Name</strong>
        <strong>Email</strong>
        <strong>Actions</strong>

        {deliverymen.map((deliveryman) => (
          <React.Fragment key={deliveryman.id}>
            <span>{deliveryman.id}</span>
            <span>
              <span className="avatarSpan">
                <img
                  src={getSafe(() => deliveryman.avatar.url)}
                  // alt={getSafe(() => deliveryman.name)}
                  alt=""
                />
              </span>
            </span>

            <span>{getSafe(() => deliveryman.name)}</span>
            <span>{getSafe(() => deliveryman.email)}</span>
            <span className="actions">
              <button
                type="button"
                onClick={() => {
                  handleSetDeliverymanData({
                    id: deliveryman.id,
                    name: getSafe(() => deliveryman.name),
                    email: getSafe(() => deliveryman.email),
                    avatar: getSafe(() => deliveryman.avatar),
                  });
                }}
              >
                <MdMoreHoriz size={20} />
              </button>

              <PopupMenu
                show={
                  deliveryman.id === deliverymanDetails.id
                    ? deliverymanDetails.showPopup
                    : false
                }
                menuItems={menuItems}
                toggle={(value) => {
                  dispatch(setShowPopup(value));
                }}
              />
            </span>
          </React.Fragment>
        ))}
      </S.Grid>

      <S.NavBar>
        <S.NavButton active={actualPage > 1} onClick={handlePrevButtonClick}>
          <MdKeyboardArrowLeft size={20} color="#fff" />
          <span>{'PREV '}</span>
        </S.NavButton>
        <strong>
          Page: {actualPage} / {totalPages}
        </strong>
        <S.NavButton
          active={actualPage < totalPages}
          onClick={handleNextButtonClick}
        >
          <span>{' NEXT'}</span>
          <MdKeyboardArrowRight size={20} color="#fff" />
        </S.NavButton>
      </S.NavBar>
    </S.Container>
  );
}
