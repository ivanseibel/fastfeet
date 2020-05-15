import produce from 'immer';

const INITIAL_STATE = {
  filter: '',

  deliverymanDetails: {
    id: '',
    name: '',
    email: '',
    avatar: {},

    showPopup: false,
  },
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliverymen/SET_FILTER': {
        draft.filter = action.payload.filter;
        break;
      }

      case '@deliverymen/SET_DELIVERYMAN_DATA': {
        draft.deliverymanDetails.id = action.payload.id;
        draft.deliverymanDetails.name = action.payload.name;
        draft.deliverymanDetails.email = action.payload.email;
        draft.deliverymanDetails.avatar = action.payload.avatar;

        break;
      }

      case '@deliverymen/SET_SHOW_POPUP': {
        draft.deliverymanDetails.showPopup = action.payload.showPopup;
        break;
      }

      default:
    }
  });
}
