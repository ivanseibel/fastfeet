import produce from 'immer';

const INITIAL_STATE = {
  filter: '',
  deliveryDetails: {
    id: '',
    showPopup: false,
    showModal: false,
  },
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveries/SET_FILTER': {
        draft.filter = action.payload.filter;
        break;
      }

      case '@deliveries/SET_DELIVERY_ID': {
        draft.deliveryDetails.id = action.payload.deliveryId;
        draft.deliveryDetails.showPopup = true;
        break;
      }

      case '@deliveries/SET_SHOW_POPUP': {
        draft.deliveryDetails.showPopup = action.payload.showPopup;
        break;
      }

      case '@deliveries/SET_SHOW_MODAL': {
        draft.deliveryDetails.showModal = action.payload.showModal;
        break;
      }

      default:
    }
  });
}
