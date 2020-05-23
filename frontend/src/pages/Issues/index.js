import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import PopupMenu from '../../components/PopupMenu';
import Modal from '../../components/Modal';
import IssueDetails from './IssueDetails';

import api from '../../services/api';
import { getSafe } from '../../utils/utils';
import { changeScreen } from '../../store/modules/auth/actions';
import {
  setIssueData,
  setShowPopup,
  setShowDetails,
} from '../../store/modules/issues/actions';

import * as S from './styles';
import RegisterHeader from '../../components/RegisterHeader';

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const filter = useSelector((state) => state.issues.filter);
  const issueDetails = useSelector((state) => state.issues.issueDetails);

  const totalPages = useMemo(() => {
    const pages = totalRecords / 10;
    return pages < 1 ? 1 : Math.ceil(pages);
  }, [totalRecords]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeScreen('issues'));
  }, [dispatch]);

  useEffect(() => {
    issues.length === 0 && actualPage > 1 && setActualPage(actualPage - 1);
  }, [issues, actualPage]);

  useEffect(() => {
    async function filterIssues() {
      const query = {
        params: {
          page: actualPage,
        },
      };

      if (filter.length > 0) {
        query.params.q = filter;
      }

      const response = await api.get('delivery/problems', query);

      if (response) {
        let rows = [];
        response.data.rows.forEach((delivery) => {
          delivery.problem.forEach((problem) => {
            rows = [
              ...rows,
              {
                delivery_id: delivery.id,
                id: problem.id,
                description: problem.description,
                partial_desc:
                  problem.description.length > 140
                    ? `${problem.description.substring(0, 140)} ...`
                    : problem.description,
                showPopup: false,
              },
            ];
          });
        });
        setIssues(rows);
        setTotalRecords(response.data.count);
      }
    }

    filterIssues();
  }, [filter, actualPage, totalRecords]);

  const headerControls = [
    {
      type: 'title',
    },
    {
      type: 'search',
      searchBy: 'name',
    },
  ];

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

  function handleSetIssueData(data) {
    dispatch(setIssueData(data));
    dispatch(setShowPopup(true));
  }

  async function handleCancelIssue() {
    try {
      api.delete(`problem/${issueDetails.delivery_id}/cancel-delivery`);

      setIssues(
        issues.filter((issue) => issue.delivery_id !== issueDetails.delivery_id)
      );

      setTotalRecords(totalRecords - 1);
      toast.success('Delivery was canceled with success');
    } catch (error) {
      toast.error(error.message);
    }
  }

  const menuItems = [
    {
      type: 'Details',
      method: () => {
        dispatch(setShowDetails(true));
      },
    },
    {
      type: 'Cancel delivery',
      method: () => {
        window.confirm('Are you sure you wish to cancel this delivery?') &&
          handleCancelIssue();
      },
    },
  ];

  return (
    <>
      {issueDetails.showModal ? (
        <Modal>
          <IssueDetails id={issueDetails.id} />
        </Modal>
      ) : null}

      <S.Container>
        <RegisterHeader
          headerControls={headerControls}
          title="Managing issues"
        />
        <S.Grid>
          <strong>Delivery</strong>
          <strong>Description</strong>
          <strong>Actions</strong>

          {issues.map((issue) => (
            <React.Fragment key={issue.id}>
              <span className="id">{issue.delivery_id}</span>
              <span>{getSafe(() => issue.partial_desc)}</span>
              <span className="actions">
                <button
                  type="button"
                  onClick={() => {
                    handleSetIssueData({
                      id: issue.id,
                      delivery_id: issue.delivery_id,
                      description: getSafe(() => issue.description),
                    });
                  }}
                >
                  <MdMoreHoriz size={20} />
                </button>

                <PopupMenu
                  show={
                    issue.id === issueDetails.id
                      ? issueDetails.showPopup
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
    </>
  );
}
