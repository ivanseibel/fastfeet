import produce from 'immer';

const INITIAL_STATE = {
  filter: '',
  deliveryDetails: {
    id: '',
    recipient_id: '',
    recipient_name: '',
    deliveryman_id: '',
    deliveryman_name: '',
    product: '',

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

      case '@deliveries/SET_DELIVERY_DATA': {
        draft.deliveryDetails.id = action.payload.id;
        draft.deliveryDetails.recipient_id = action.payload.recipient_id;
        draft.deliveryDetails.recipient_name = action.payload.recipient_name;
        draft.deliveryDetails.deliveryman_id = action.payload.deliveryman_id;
        draft.deliveryDetails.deliveryman_name =
          action.payload.deliveryman_name;
        draft.deliveryDetails.product = action.payload.product;

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
