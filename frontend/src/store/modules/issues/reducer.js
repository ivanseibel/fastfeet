import produce from 'immer';

const INITIAL_STATE = {
  filter: '',
  issueDetails: {
    id: '',
    delivery_id: '',
    description: '',

    showPopup: false,
    showModal: false,
  },
};

export default function issues(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@issues/SET_FILTER': {
        draft.filter = action.payload.filter;

        break;
      }

      case '@issues/SET_ISSUE_DATA': {
        draft.issueDetails.id = action.payload.id;
        draft.issueDetails.delivery_id = action.payload.delivery_id;
        draft.issueDetails.description = action.payload.description;

        break;
      }

      case '@issues/SET_SHOW_POPUP': {
        draft.issueDetails.showPopup = action.payload.showPopup;

        break;
      }

      case '@issues/SET_SHOW_MODAL': {
        draft.issueDetails.showModal = action.payload.showModal;
        break;
      }

      default:
    }
  });
}
