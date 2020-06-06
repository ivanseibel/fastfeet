export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function changeScreen(activeScreen) {
  return {
    type: '@auth/CHANGE_SCREEN',
    payload: { activeScreen },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOffRequest() {
  return {
    type: '@auth/SIGN_OFF_REQUEST',
    payload: {},
  };
}
