import React, { useState, useEffect } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
} from 'react-icons/md';
import { useSelector } from 'react-redux';

import api from '../../services/api';
import { getSafe } from '../../utils/utils';

import * as S from './styles';
import HeaderRegister from '../../components/RegisterHeader';
import PopupMenu from '../../components/PopupMenu';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const filter = useSelector((state) => state.deliverymans.filter);
  const deliverymanDetails = useSelector(
    (state) => state.deliverymans.deliverymanDetails
  );

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
        alert('New deliveryman');
      },
    },
  ];

  const menuItems = [
    {
      type: 'Edit',
      method: () => {
        alert('Edit');
      },
    },
    {
      type: 'Delete',
      method: () => {
        alert('Delete');
      },
    },
  ];

  useEffect(() => {
    async function filterDeliverymans() {
      const query = {
        params: {
          page: actualPage,
        },
      };

      if (filter.length > 0) {
        query.params.q = filter;
      }

      const response = await api.get('deliverymans', query);

      if (response) {
        const rows = response.data.rows.map((deliveryman) => ({
          ...deliveryman,
          showMenu: false,
        }));
        setDeliverymans(rows);
        setTotalRecords(response.data.count);
      }
    }

    filterDeliverymans();
  }, [filter, actualPage]);

  function handlePrevButtonClick() {
    alert('Prev button');
  }

  function handleNextButtonClick() {
    alert('Next button');
  }

  function handleSetDeliverymanData(data) {
    alert('HandleSetDeliveryData');
  }

  return (
    <S.Container>
      <HeaderRegister
        headerControls={headerControls}
        title="Managing deliverymans"
      />
      <S.Grid>
        <strong>ID</strong>
        <strong>Avatar</strong>
        <strong>Name</strong>
        <strong>Email</strong>
        <strong>Actions</strong>

        {deliverymans.map((deliveryman) => (
          <React.Fragment key={deliveryman.id}>
            <span>{deliveryman.id}</span>
            <img
              src={getSafe(() => deliveryman.avatar.url)}
              alt={getSafe(() => deliveryman.name)}
            />

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
