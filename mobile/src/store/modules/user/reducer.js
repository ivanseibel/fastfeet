import produce from 'immer';

const INITIAL_STATE = {
  user: {
    id: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    avatar_id: '',
    avatar: {
      url: '',
      name: '',
      path: '',
    },
  },
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.payload.user;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.user = INITIAL_STATE.user;
        break;
      }

      default:
    }
  });
}
