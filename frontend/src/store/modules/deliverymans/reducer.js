import produce from 'immer';

const INITIAL_STATE = {
  filter: '',
  showPopup: false,

  deliverymanDetails: {
    id: '',
    name: '',
    email: '',
    avatar: {},
  },
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliverymans/SET_FILTER': {
        draft.filter = action.payload.filter;
        break;
      }

      case '@deliverymans/SET_DELIVERYMAN_DATA': {
        draft.deliverymanDetails.id = action.payload.id;
        draft.deliverymanDetails.name = action.payload.name;
        draft.deliverymanDetails.email = action.payload.email;
        draft.deliverymanDetails.avatar = action.payload.avatar;

        break;
      }

      case '@deliverymans/SET_SHOW_POPUP': {
        draft.showPopup = action.payload.showPopup;
        break;
      }

      default:
    }
  });
}
