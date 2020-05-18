import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import * as S from './styles';
import RegisterHeader from '../../components/RegisterHeader';
import PopupMenu from '../../components/PopupMenu';

import { changeScreen } from '../../store/modules/auth/actions';
import {
  setRecipientData,
  setShowPopup,
} from '../../store/modules/recipients/actions';
import api from '../../services/api';
import history from '../../services/history';
import { getSafe } from '../../utils/utils';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const filter = useSelector((state) => state.recipients.filter);
  const recipientDetails = useSelector(
    (state) => state.recipients.recipientDetails
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
          setRecipientData({
            id: '',
            name: '',
            street: '',
            number: '',
            complement: '',
            city: '',
            state: '',
            postal_code: '',
          })
        );
        history.push('recipient', { operation: 'insert' });
      },
    },
  ];

  async function handleDeleteRecipient() {
    try {
      await api.delete(`recipients/${recipientDetails.id}`);
      setRecipients(
        recipients.filter((recipient) => recipient.id !== recipientDetails.id)
      );

      setTotalRecords(totalRecords - 1);

      toast.success('Recipient was deleted with success');
    } catch (error) {
      toast.error(error.message);
    }
  }

  const menuItems = [
    {
      type: 'Edit',
      method: () => {
        history.push('recipient', { operation: 'edit' });
      },
    },
    {
      type: 'Delete',
      method: () => {
        window.confirm('Are you sure you wish to delete this recipient?') &&
          handleDeleteRecipient();
      },
    },
  ];

  useEffect(() => {
    dispatch(changeScreen('recipients'));
  }, [dispatch]);

  useEffect(() => {
    recipients.length === 0 && actualPage > 1 && setActualPage(actualPage - 1);
  }, [recipients, actualPage]);

  useEffect(() => {
    async function filterRecipients() {
      const query = {
        params: {
          page: actualPage,
        },
      };

      if (filter.length > 0) {
        query.params.q = filter;
      }

      const response = await api.get('recipients', query);

      if (response) {
        const rows = response.data.rows.map((recipient) => ({
          ...recipient,
          address: `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`,
          showMenu: false,
        }));
        setRecipients(rows);
        setTotalRecords(response.data.count);
      }
    }

    filterRecipients();
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

  function handleSetRecipientData(data) {
    dispatch(setRecipientData(data));
    dispatch(setShowPopup(true));
  }

  return (
    <S.Container>
      <RegisterHeader
        headerControls={headerControls}
        title="Managing recipients"
      />
      <S.Grid>
        <strong>ID</strong>
        <strong>Name</strong>
        <strong>Address</strong>
        <strong>Actions</strong>

        {recipients.map((recipient) => (
          <React.Fragment key={recipient.id}>
            <span>{recipient.id}</span>
            <span>{getSafe(() => recipient.name)}</span>
            <span>{getSafe(() => recipient.address)}</span>
            <span className="actions">
              <button
                type="button"
                onClick={() => {
                  handleSetRecipientData({
                    id: recipient.id,
                    name: getSafe(() => recipient.name),
                    street: getSafe(() => recipient.street),
                    number: getSafe(() => recipient.number),
                    complement: getSafe(() => recipient.complement),
                    state: getSafe(() => recipient.state),
                    city: getSafe(() => recipient.city),
                    postal_code: getSafe(() => recipient.postal_code),
                  });
                }}
              >
                <MdMoreHoriz size={20} />
              </button>

              <PopupMenu
                show={
                  recipient.id === recipientDetails.id
                    ? recipientDetails.showPopup
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
