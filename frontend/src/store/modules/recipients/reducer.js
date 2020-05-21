import produce from 'immer';

const INITIAL_STATE = {
  filter: '',
  recipientDetails: {
    id: '',
    name: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    postal_code: '',

    showPopup: false,
  },
};

export default function recipients(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@recipients/SET_FILTER': {
        draft.filter = action.payload.filter;
        break;
      }

      case '@recipients/SET_RECIPIENT_DATA': {
        draft.recipientDetails.id = action.payload.id;
        draft.recipientDetails.name = action.payload.name;
        draft.recipientDetails.street = action.payload.street;
        draft.recipientDetails.number = action.payload.number;
        draft.recipientDetails.complement = action.payload.complement;
        draft.recipientDetails.city = action.payload.city;
        draft.recipientDetails.state = action.payload.state;
        draft.recipientDetails.postal_code = action.payload.postal_code;

        break;
      }

      case '@recipients/SET_SHOW_POPUP': {
        draft.recipientDetails.showPopup = action.payload.showPopup;

        break;
      }

      default:
    }
  });
}
